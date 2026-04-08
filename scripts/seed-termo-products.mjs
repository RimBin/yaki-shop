import { createClient } from '@supabase/supabase-js'
import fs from 'node:fs'
import path from 'node:path'

function loadDotEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return
  const content = fs.readFileSync(filePath, 'utf8')

  content.split(/\r?\n/).forEach((rawLine) => {
    const line = String(rawLine).trim()
    if (!line || line.startsWith('#')) return
    const eqIndex = line.indexOf('=')
    if (eqIndex <= 0) return

    const key = line.slice(0, eqIndex).trim()
    let value = line.slice(eqIndex + 1).trim()

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    if (process.env[key] === undefined) {
      process.env[key] = value
    }
  })
}

function loadEnv() {
  const root = process.cwd()
  loadDotEnvFile(path.join(root, '.env.local'))
  loadDotEnvFile(path.join(root, '.env'))
}

function requiredEnv(name, value) {
  if (!value || String(value).trim() === '') {
    throw new Error(`Missing env var: ${name}`)
  }
  return String(value).trim()
}

function parseArgs(argv) {
  const args = new Set(argv.slice(2))
  return {
    apply: args.has('--apply'),
    verbose: args.has('--verbose'),
  }
}

function safeNumber(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null
  if (typeof value === 'string' && value.trim() !== '') {
    const n = Number(value)
    return Number.isFinite(n) ? n : null
  }
  return null
}

async function findReferenceProduct(supabase, usageType) {
  const tries = [
    () =>
      supabase
        .from('products')
        .select('base_price, image_url')
        .eq('usage_type', usageType)
        .eq('is_active', true)
        .in('wood_type', ['larch', 'spruce'])
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle(),
    () =>
      supabase
        .from('products')
        .select('base_price, image_url')
        .eq('category', usageType)
        .eq('is_active', true)
        .in('wood_type', ['larch', 'spruce'])
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle(),
  ]

  for (const attempt of tries) {
    try {
      const { data, error } = await attempt()
      if (error) {
        const msg = String(error.message || error)
        if (msg.includes('does not exist') || msg.includes('schema cache') || msg.includes("could not find the '")) {
          continue
        }
        continue
      }
      if (!data) continue
      const basePrice = safeNumber(data.base_price)
      const imageUrl = typeof data.image_url === 'string' && data.image_url.trim() ? data.image_url.trim() : null
      return { basePrice, imageUrl }
    } catch {
      continue
    }
  }

  return { basePrice: null, imageUrl: null }
}

async function upsertProductBySlug(supabase, row) {
  const slug = row.slug

  const safeUpsert = async (payload) => {
    const { data: existing, error: findError } = await supabase.from('products').select('id').eq('slug', slug).maybeSingle()
    if (findError) throw new Error(`Failed to lookup product (${slug}): ${findError.message}`)

    if (existing?.id) {
      const { error: updateError } = await supabase.from('products').update(payload).eq('id', existing.id)
      if (updateError) throw new Error(`Failed to update product (${slug}): ${updateError.message}`)
      return existing.id
    }

    const { data: inserted, error: insertError } = await supabase.from('products').insert(payload).select('id').single()
    if (insertError) throw new Error(`Failed to insert product (${slug}): ${insertError.message}`)
    return inserted.id
  }

  try {
    return await safeUpsert(row)
  } catch (error) {
    const msg = String(error?.message || error || '')
    const maybeMissing =
      msg.includes('schema cache') ||
      msg.includes('does not exist') ||
      msg.includes("could not find the '") ||
      msg.includes('column ') ||
      msg.includes('unknown column')

    if (!maybeMissing) throw error

    const payload = { ...row }
    delete payload.slug_en
    delete payload.name_en
    delete payload.description_en
    delete payload.sale_price
    delete payload.usage_type

    try {
      return await safeUpsert(payload)
    } catch {
      const minimal = {
        name: payload.name,
        slug: payload.slug,
        description: payload.description ?? null,
        base_price: payload.base_price,
        wood_type: payload.wood_type,
        category: payload.category,
        image_url: payload.image_url ?? null,
        is_active: payload.is_active ?? true,
      }
      return await safeUpsert(minimal)
    }
  }
}

async function replaceProductVariants(supabase, productId, variantType, rows) {
  const { error: delErr } = await supabase
    .from('product_variants')
    .delete()
    .eq('product_id', productId)
    .eq('variant_type', variantType)

  if (delErr) throw new Error(`Failed to delete existing ${variantType} variants: ${delErr.message}`)
  if (!rows.length) return

  const { error: insErr } = await supabase.from('product_variants').insert(rows)
  if (!insErr) return

  const msg = String(insErr.message || insErr)
  if (
    msg.includes('label_lt') ||
    msg.includes('label_en') ||
    msg.includes('value_mm') ||
    msg.includes('image_url') ||
    msg.includes('schema cache')
  ) {
    const fallback = rows.map((row) => {
      const { label_lt, label_en, value_mm, image_url, ...rest } = row
      return rest
    })
    const { error: retryErr } = await supabase.from('product_variants').insert(fallback)
    if (retryErr) throw new Error(`Failed to insert fallback variants: ${retryErr.message}`)
    return
  }

  throw new Error(`Failed to insert variants: ${msg}`)
}

async function upsertProduct3dModel(supabase, row) {
  try {
    const { data: existing, error: findError } = await supabase
      .from('product_3d_models')
      .select('id')
      .eq('product_id', row.product_id)
      .eq('usage_type', row.usage_type)
      .is('profile_variant_id', row.profile_variant_id ?? null)
      .eq('is_active', true)
      .maybeSingle()

    if (findError) {
      const msg = String(findError.message || findError)
      if (msg.includes('does not exist') || msg.includes('schema cache') || msg.includes("could not find the '")) {
        return { skipped: true, reason: msg }
      }
      return { skipped: true, reason: msg }
    }

    if (existing?.id) {
      const { error: updateError } = await supabase.from('product_3d_models').update(row).eq('id', existing.id)
      if (updateError) return { skipped: true, reason: updateError.message }
      return { skipped: false, id: existing.id }
    }

    const { data: inserted, error: insertError } = await supabase.from('product_3d_models').insert(row).select('id').single()
    if (insertError) {
      const msg = String(insertError.message || insertError)
      if (msg.includes('does not exist') || msg.includes('schema cache')) {
        return { skipped: true, reason: msg }
      }
      return { skipped: true, reason: msg }
    }

    return { skipped: false, id: inserted.id }
  } catch (error) {
    return { skipped: true, reason: String(error?.message || error || 'unknown') }
  }
}

function thermoColorVariants(productId) {
  const colors = [
    { code: 'black', lt: 'Juoda', en: 'Black', hex: '#1f1f1f' },
    { code: 'carbon', lt: 'Anglis', en: 'Carbon', hex: '#333333' },
    { code: 'carbon-light', lt: 'Šviesi anglis', en: 'Carbon Light', hex: '#5b5b5b' },
    { code: 'graphite', lt: 'Grafitas', en: 'Graphite', hex: '#535353' },
    { code: 'dark-brown', lt: 'Tamsiai ruda', en: 'Dark Brown', hex: '#5b3b2b' },
    { code: 'silver', lt: 'Sidabrinė', en: 'Silver', hex: '#b7b7b7' },
  ]

  return colors.map((c) => ({
    product_id: productId,
    variant_type: 'color',
    name: c.code,
    label_lt: c.lt,
    label_en: c.en,
    hex_color: c.hex,
    price_adjustment: 0,
    stock_quantity: 999,
    is_available: true,
  }))
}

function thermoTerraceProfiles(productId) {
  return [
    {
      product_id: productId,
      variant_type: 'profile',
      name: 'rectangle',
      label_lt: 'Stačiakampis',
      label_en: 'Rectangle',
      price_adjustment: 0,
      stock_quantity: 999,
      is_available: true,
    },
  ]
}

function thermoFacadeProfiles(productId) {
  return [
    {
      product_id: productId,
      variant_type: 'profile',
      name: 'half_taper',
      label_lt: 'Pusė špunto',
      label_en: 'Half Taper',
      price_adjustment: 0,
      stock_quantity: 999,
      is_available: true,
    },
    {
      product_id: productId,
      variant_type: 'profile',
      name: 'half_taper_45_deg',
      label_lt: 'Pusė špunto 45°',
      label_en: 'Half Taper 45°',
      price_adjustment: 0,
      stock_quantity: 999,
      is_available: true,
    },
    {
      product_id: productId,
      variant_type: 'profile',
      name: 'rhombus',
      label_lt: 'Rombas',
      label_en: 'Rhombus',
      price_adjustment: 0,
      stock_quantity: 999,
      is_available: true,
    },
  ]
}

async function ensureThermoProducts({ supabase, apply, verbose }) {
  const existingThermo = await supabase
    .from('products')
    .select('id, slug, wood_type, usage_type, category')
    .eq('wood_type', 'thermo')
    .limit(10)

  if (!existingThermo.error && Array.isArray(existingThermo.data) && existingThermo.data.length > 0) {
    console.log(`Thermo products already exist in DB (sample=${existingThermo.data.length}).`)
    if (verbose) {
      for (const row of existingThermo.data) {
        console.log(`- ${row.slug} (usage_type=${row.usage_type ?? 'n/a'} category=${row.category ?? 'n/a'})`) 
      }
    }
    return { created: false }
  }

  const refTerrace = await findReferenceProduct(supabase, 'terrace')
  const refFacade = await findReferenceProduct(supabase, 'facade')

  const terraceBasePrice = refTerrace.basePrice ?? 0
  const facadeBasePrice = refFacade.basePrice ?? 0

  const productsToSeed = [
    {
      name: 'Termomediena terasai',
      name_en: 'Thermowood terrace board',
      slug: 'terasine-lenta-termomediena',
      slug_en: 'thermowood-terrace-board',
      description: 'Bazinis termomedienos produktas konfiguratoriui (terasai).',
      description_en: 'Base thermowood product for configurator (terrace).',
      base_price: terraceBasePrice,
      wood_type: 'thermo',
      category: 'terrace',
      usage_type: 'terrace',
      image_url: refTerrace.imageUrl,
      is_active: true,
    },
    {
      name: 'Termomediena fasadui',
      name_en: 'Thermowood facade cladding',
      slug: 'dailylente-fasadui-termomediena',
      slug_en: 'thermowood-facade-cladding',
      description: 'Bazinis termomedienos produktas konfiguratoriui (fasadui).',
      description_en: 'Base thermowood product for configurator (facade).',
      base_price: facadeBasePrice,
      wood_type: 'thermo',
      category: 'facade',
      usage_type: 'facade',
      image_url: refFacade.imageUrl,
      is_active: true,
    },
  ]

  console.log('Thermo seed plan:')
  for (const p of productsToSeed) {
    console.log(`- ${p.slug} (usage=${p.usage_type}, base_price=${p.base_price})`)
  }

  if (!apply) {
    console.log('Dry-run only. Re-run with: node scripts/seed-termo-products.mjs --apply')
    return { created: false, dryRun: true }
  }

  for (const payload of productsToSeed) {
    const id = await upsertProductBySlug(supabase, payload)
    console.log(`Upserted product: ${payload.slug} -> ${id}`)

    const colors = thermoColorVariants(id)
    const profiles = payload.usage_type === 'terrace' ? thermoTerraceProfiles(id) : thermoFacadeProfiles(id)

    await replaceProductVariants(supabase, id, 'color', colors)
    await replaceProductVariants(supabase, id, 'profile', profiles)
    console.log(`  variants: colors=${colors.length}, profiles=${profiles.length}`)

    const modelUrl = '/models/products/thermo-terrace-carbon.glb'
    const modelResult = await upsertProduct3dModel(supabase, {
      product_id: id,
      usage_type: payload.usage_type,
      profile_variant_id: null,
      model_url: modelUrl,
      is_active: true,
    })

    if (modelResult.skipped) {
      if (verbose) {
        console.log(`  product_3d_models: skipped (${modelResult.reason})`)
      }
    } else {
      console.log(`  product_3d_models: upserted (${modelResult.id})`)
    }
  }

  return { created: true }
}

async function main() {
  const args = parseArgs(process.argv)
  loadEnv()

  const url = requiredEnv('NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL)
  const serviceKey = requiredEnv('SUPABASE_SERVICE_ROLE_KEY', process.env.SUPABASE_SERVICE_ROLE_KEY)

  const supabase = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  await ensureThermoProducts({ supabase, apply: args.apply, verbose: args.verbose })
}

main().catch((error) => {
  console.error(error?.message || error)
  process.exit(1)
})
