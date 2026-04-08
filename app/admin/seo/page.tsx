import { headers } from 'next/headers'
import SEOAdminClient from '@/components/admin/SEOAdminClient'
import { AdminBody, AdminCard, AdminSectionTitle, AdminStack } from '@/components/admin/ui/AdminUI'
import getSitemap from '@/app/sitemap'
import { requireAdminPage } from '@/lib/admin/require-admin-page'

export default async function SEOAdminPage() {
  await requireAdminPage('/admin/seo', 'seo')
  await headers()
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL
  const origin = configuredSiteUrl && configuredSiteUrl.trim()
    ? configuredSiteUrl.trim().replace(/\/$/, '')
    : 'https://shop.yakiwood.co.uk'
  const items = await getSitemap()
  const sitemapLinks = items
    .map((item) => {
      try {
        const url = new URL(item.url)
        return `${origin}${url.pathname}`
      } catch {
        return item.url
      }
    })
    .sort((a, b) => a.localeCompare(b))
  return (
    <AdminBody className="pt-[clamp(16px,2vw,24px)]">
      <AdminStack>
        <AdminCard>
          <SEOAdminClient />
        </AdminCard>
        <AdminCard>
            <AdminSectionTitle className="mb-[16px]">Svetainės žemėlapis</AdminSectionTitle>
          <ul className="space-y-[8px] max-h-[420px] overflow-auto pr-[8px]">
            {sitemapLinks.map((href) => (
              <li key={href} className="font-['Outfit'] text-[14px] text-[#161616]">
                {href}
              </li>
            ))}
          </ul>
        </AdminCard>
      </AdminStack>
    </AdminBody>
  )
}
