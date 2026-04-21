# Diegimo vadovas — yakiwood-website

Pilnas vadovas, kaip diegti yakiwood-website Next.js e. parduotuvės platformą į produkcinę aplinką.

---

## Apžvalga

Šis vadovas apima platformos diegimą naudojant:
- **Talpinimas:** Vercel (rekomenduojamas Next.js)
- **Duomenų bazė:** Supabase (PostgreSQL)
- **Mokėjimai:** Stripe
- **El. paštas:** Resend
- **Stebėjimas:** Google Analytics, Vercel Analytics

---

## Būtinos sąlygos

Prieš pradedant diegimą, įsitikinkite:

1. **Sukurtos paskyros:**
   - [Vercel](https://vercel.com) paskyra
   - [Supabase](https://supabase.com) projektas
   - [Stripe](https://stripe.com) paskyra (patvirtinta)
   - El. pašto paslaugos paskyra (Resend)
   - Google Analytics nuosavybė sukurta

2. **Prieigos reikalavimai:**
   - Administratoriaus prieiga prie GitHub saugyklos
   - Užregistruotas domeno vardas (neprivaloma, galima naudoti Vercel subdomeną)
   - Prieiga prie DNS valdymo (jei naudojamas pasirinktinis domenas)

3. **Vietinis paruošimas:**
   - Visi aplinkos kintamieji veikia lokaliai
   - Produkcinis kompiliavimas ištestuotas (`npm run build`)
   - Visi testai praeina (`npm run test`, `npx playwright test`)

4. **Užbaigta:**
   - Paleidimo kontrolinis sąrašas peržiūrėtas (`docs/PRE_LAUNCH_CHECKLIST.md`)
   - Kodas sulietas į `main` šaką
   - Visi laukiantys PR peržiūrėti ir sulieti

---

## Aplinkos kintamieji

### Reikalingi produkciniai aplinkos kintamieji

Sukurkite šiuos Vercel valdymo skydelyje (Settings → Environment Variables):

#### Next.js ir programa
```bash
# Kanoninis viešas bazinis URL, naudojamas sitemap, OG žymėms, peradresavimams ir nuorodoms
NEXT_PUBLIC_SITE_URL=https://shop.yakiwood.co.uk

# Node aplinka
NODE_ENV=production
```

#### Supabase
```bash
# Supabase projekto URL (iš Supabase valdymo skydelio → Settings → API)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co

# Supabase anon raktas (viešas, saugus kliento pusei)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Supabase service role raktas (tik serverio pusei, saugoti slaptai!)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Stripe
```bash
# Stripe produkciniai raktai (iš Stripe valdymo skydelio → Developers → API keys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx

# Stripe Webhook slaptažodis (sukuriamas nustatymo metu)
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

#### El. pašto paslauga
```bash
# Resend
RESEND_API_KEY=re_xxxxx
```

#### Analitika ir stebėjimas
```bash
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

#### Funkcijų vėliavėlės (neprivaloma)
```bash
# Įjungti/išjungti funkcijas
NEXT_PUBLIC_ENABLE_3D_CONFIGURATOR=true
NEXT_PUBLIC_ENABLE_NEWSLETTER=true
# Neprivaloma: realaus laiko apdailos tekstūrų keitimas 3D (numatytasis: false)
NEXT_PUBLIC_ENABLE_3D_FINISH_TEXTURE_SWAP=false
```

### Aplinkos kintamųjų saugumas

**Svarbu:**
- ✅ **NEXT_PUBLIC_*** kintamieji matomi naršyklėje (naudokite tik nejautriems duomenims)
- ⚠️ Tik serveriui skirti raktai (STRIPE_SECRET_KEY, SUPABASE_SERVICE_ROLE_KEY) NIEKADA neturi turėti NEXT_PUBLIC_ priešdėlio
- 🔒 Niekada nekomitinkite `.env` failų į Git (jau `.gitignore` sąraše)
- 📋 Saugokite produkcinius slaptažodžius saugioje slaptažodžių tvarkyklėje
- 🔄 Reguliariai keiskite raktus (rekomenduojama kas ketvirtį)

---

## Duomenų bazės nustatymas

### 1. Supabase projekto sukūrimas

1. Eikite į [Supabase valdymo skydelį](https://app.supabase.com)
2. Spauskite **New Project**
3. Konfigūruokite:
   - **Pavadinimas:** yakiwood-production
   - **Duomenų bazės slaptažodis:** sugeneruokite stiprų slaptažodį (išsaugokite!)
   - **Regionas:** Frankfurtas (artimiausias Lietuvai)
   - **Kainų planas:** Pro (rekomenduojamas produkcijai)

### 2. Duomenų bazės migracijų paleidimas

Duomenų bazės schema sukuriama per migracijos failus (`supabase/migrations/`). Pradiniai demo duomenys yra `supabase/seed.sql` faile.

```bash
# 1. Paleiskite migracijos failus iš supabase/migrations/ katalogo
#    (arba naudokite Supabase CLI: supabase db push)
# 2. Papildomai paleiskite supabase/seed.sql demo duomenims
```

Schema apima:
- `products` lentelę
- `product_variants` lentelę
- `custom_configurations` lentelę
- `orders` lentelę
- `order_items` lentelę
- `cart_items` lentelę
- `newsletter_subscribers` lentelę
- Eilutės lygio saugumo (RLS) politikas
- Indeksus našumui

### 3. Lentelių patikra

Supabase valdymo skydelyje → Table Editor patvirtinkite šias lenteles:
- ✅ products
- ✅ product_variants
- ✅ custom_configurations
- ✅ orders
- ✅ order_items
- ✅ cart_items
- ✅ newsletter_subscribers

### 4. Eilutės lygio saugumo įjungimas

Supabase valdymo skydelyje → Authentication → Policies:

1. Patvirtinkite, kad RLS įjungtas visoms lentelėms
2. Testuokite politikas bandydami užklausti duomenis
3. Patvirtinkite, kad anoniminiai naudotojai gali skaityti produktus, bet ne rašyti

### 5. Duomenų bazės atsarginių kopijų konfigūracija

Supabase valdymo skydelyje → Database → Backups:
- ✅ Įjunkite automatines kasdienines atsargines kopijas (įtraukta į Pro planą)
- ✅ Nustatykite kopijų saugojimą mažiausiai 7 dienas
- ✅ Testuokite kopijų atkūrimą testavimo aplinkoje

---

## Vercel diegimas

### 1 žingsnis: GitHub saugyklos prijungimas

1. Eikite į [Vercel valdymo skydelį](https://vercel.com/dashboard)
2. Spauskite **Add New** → **Project**
3. Pasirinkite **Import Git Repository**
4. Raskite ir pasirinkite `yakiwood-website` saugyklą
5. Spauskite **Import**

### 2 žingsnis: Kompiliavimo nustatymai

Konfigūruokite šiuos parametrus:

**Framework šablonas:** Next.js
**Šakninis katalogas:** `./` (šaknis)
**Kompiliavimo komanda:** `npm run build`
**Išvesties katalogas:** `.next` (automatinis)
**Diegimo komanda:** `npm ci --legacy-peer-deps`

**Aplinkos kintamieji:**
Pridėkite visus produkcinius aplinkos kintamuosius iš ankstesnės skilties.

**Node.js versija:** 18.x arba naujesnė

### 3 žingsnis: Diegimas

1. Spauskite **Deploy**
2. Palaukite, kol kompiliavimas baigsis (3–5 minutės)
3. Vercel suteiks diegimo URL: `https://yakiwood-website-xxxxx.vercel.app`

### 4 žingsnis: Diegimo patikra

Kai platforma įdiegta, patikrinkite:
- ✅ Pagrindinis puslapis kraunasi: `https://your-deployment.vercel.app`
- ✅ Nėra kompiliavimo klaidų Vercel žurnaluose
- ✅ Visi maršrutai pasiekiami (`/produktai`, `/sprendimai` ir kt.)
- ✅ Peržiūrėkite Vercel žurnalus dėl vykdymo klaidų

### 5 žingsnis: Produkcinės parengties įrodymų rinkimas

Paleiskite šias patikras prieš diegtą aplinką ir saugokite rezultatus:

```bash
# Aplinkos ir parengties patikra
npm run env:readiness

# Lighthouse įrodymų generavimas prieš veikiančią svetainę
npm run audit:performance -- --baseUrl https://shop.yakiwood.co.uk

# Atsakymo antraščių tikrinimas
curl -I https://shop.yakiwood.co.uk
```

Laukiami įrodymai:
- `env:readiness` baigiasi kodu `0` arba tik su aiškiai priimtais įspėjimais.
- Naujausios našumo ataskaitos yra `reports/` kataloge JSON ir Markdown formatais.
- Atsakymo antraštėse yra CSP, HSTS ir nėra `X-Powered-By`.
- Supabase atsarginių kopijų būsena ir paskutinė atkūrimo testo data užfiksuotos.

Pastaba:
- `NEXT_PUBLIC_APP_URL` yra pasenęs pavadinimas senesniuose dokumentuose. Programa naudoja `NEXT_PUBLIC_SITE_URL`; nekonfigūruokite abiejų su skirtingomis reikšmėmis.

---

## Domeno ir SSL nustatymas

### Variantas A: Vercel subdomenas (paprasčiausias)

Jūsų svetainė iškart prieinama adresu:
```
https://yakiwood-website.vercel.app
```

Papildomos konfigūracijos nereikia. HTTPS veikia automatiškai.

### Variantas B: Pasirinktinis domenas (rekomenduojama)

#### 1. Domeno pridėjimas Vercel

1. Eikite į Vercel valdymo skydelį → Project Settings → Domains
2. Spauskite **Add Domain**
3. Įveskite savo domeną: `shop.yakiwood.co.uk`
4. Vercel pateiks DNS įrašus

#### 2. DNS konfigūracija

Savo domeno registratoriuje (pvz., Namecheap, GoDaddy):

**Šakniniam domenui (shop.yakiwood.co.uk):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**www subdomenui:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**DNS propagacija:** gali užtrukti 24–48 valandas

#### 3. Domeno patvirtinimas

1. Palaukite DNS propagacijos (patikrinkite su `nslookup shop.yakiwood.co.uk`)
2. Vercel spauskite **Verify** šalia savo domeno
3. Patvirtinus, SSL sertifikatas išduodamas automatiškai
4. Jūsų svetainė veikia adresu `https://shop.yakiwood.co.uk`

### www peradresavimas

Vercel automatiškai tvarko peradresavimus. Pasirinkite Project Settings → Domains:
- ✅ Peradresuoti `www.shop.yakiwood.co.uk` → `shop.yakiwood.co.uk` (rekomenduojama)

---

## Diegimo po patikra

### Patikros kontrolinis sąrašas

Atlikite šiuos testus iškart po diegimo:

#### 1. Pagrindinės funkcijos
```bash
# Pagrindinio puslapio testas
curl -I https://shop.yakiwood.co.uk
# Laukiama: HTTP 200

# API sveikatos galutinio taško testas (jei yra)
curl https://shop.yakiwood.co.uk/api/health
# Laukiama: {"status": "ok"}
```

- [ ] Pagrindinis puslapis kraunasi be klaidų
- [ ] Produktų puslapis rodo produktus iš duomenų bazės
- [ ] Produktų detalių puslapiai kraunasi
- [ ] 3D konfigūratorius atvaizduojamas
- [ ] Navigacija veikia (visi meniu punktai)

#### 2. Autentifikacijos srautas
- [ ] Naudotojo registracija veikia
- [ ] Prisijungimas veikia
- [ ] Slaptažodžio atkūrimo el. laiškas siunčiamas
- [ ] Administratoriaus skydelis prieinamas (su administratoriaus kredencialais)

#### 3. E. parduotuvės srautas
- [ ] Produkto pridėjimas į krepšelį
- [ ] Krepšelio kiekių atnaujinimas
- [ ] Pašalinimas iš krepšelio
- [ ] Perėjimas prie atsiskaitymo
- [ ] Bandomasis pirkimas su Stripe test kortele
  - Kortelė: `4242 4242 4242 4242`
  - Galiojimas: bet kuri ateities data
  - CVC: bet kokie 3 skaitmenys
- [ ] Užsakymo patvirtinimo puslapis rodomas
- [ ] Užsakymo patvirtinimo el. laiškas gautas

#### 4. Naujienlaiškis ir kontaktai
- [ ] Naujienlaiškio prenumerata veikia
- [ ] Kontaktų forma pateikiama sėkmingai
- [ ] Kontaktų formos el. laiškas gautas

#### 5. Duomenų bazės ryšys
- [ ] Produktai kraunami iš Supabase
- [ ] Naudotojo registracija rašo į duomenų bazę
- [ ] Užsakymai saugomi teisingai
- [ ] Nėra duomenų bazės ryšio klaidų žurnaluose

#### 6. Našumas ir stebėjimas
- [ ] Lighthouse auditas paleistas (tikslas: 90+ visose kategorijose)
- [ ] Vercel Analytics tikrinamas dėl srautų
- [ ] Google Analytics sekimas patvirtintas (patikrinkite Realiu laiku ataskaitą)
### Žurnalų tikrinimas

Stebėkite klaidas:

1. **Vercel žurnalai:** Dashboard → Logs → Real-time
2. **Supabase žurnalai:** Dashboard → Logs → Database
3. **Stripe valdymo skydelis:** Developers → Events

---

## Stebėjimo nustatymas

### 1. Google Analytics

Jau sukonfigūruota, jei `NEXT_PUBLIC_GA_MEASUREMENT_ID` nustatytas.

**Sekimo patikra:**
1. Eikite į [Google Analytics](https://analytics.google.com)
2. Pasirinkite savo nuosavybę
3. Eikite į **Real-time** → **Overview**
4. Aplankykite savo svetainę
5. Patvirtinkite, kad matote save realiu laiku

### 2. Veikimo laiko stebėjimas

**Rekomenduojamos paslaugos:**
- [UptimeRobot](https://uptimerobot.com) (nemokamas planas)
- [Pingdom](https://www.pingdom.com)
- [StatusCake](https://www.statuscake.com)

**Nustatymas:**
1. Sukurkite paskyrą
2. Pridėkite HTTP(S) monitorių
3. URL: `https://shop.yakiwood.co.uk`
4. Tikrinimo intervalas: 5 minutės
5. Konfigūruokite pranešimus (el. paštas/SMS)

### 3. Vercel Analytics

Įjungiamas automatiškai. Peržiūrėkite Vercel valdymo skydelyje → Analytics.

Pateikia:
- Puslapių peržiūras
- Populiariausius puslapius
- Tikro naudotojo stebėjimą (RUM)
- Web Vitals

---

## Stripe Webhook konfigūracija

### 1. Webhook sukūrimas Stripe

1. Eikite į [Stripe valdymo skydelį](https://dashboard.stripe.com) → Developers → Webhooks
2. Spauskite **Add endpoint**
3. Konfigūruokite:
   - **Galutinio taško URL:** `https://shop.yakiwood.co.uk/api/webhooks/stripe`
   - **Klausyti:** įvykių jūsų paskyroje
   - **Pasirinkite įvykius:**
     - `checkout.session.completed`

4. Spauskite **Add endpoint**

### 2. Webhook slaptažodžio gavimas

1. Spauskite ant naujai sukurto webhook
2. Nukopijuokite **Signing secret** (prasideda `whsec_`)
3. Pridėkite prie Vercel aplinkos kintamųjų:
   - Raktas: `STRIPE_WEBHOOK_SECRET`
   - Reikšmė: `whsec_xxxxx`

### 3. Webhook testavimas

1. Stripe valdymo skydelyje → Webhooks, spauskite savo webhook
2. Spauskite **Send test webhook**
3. Pasirinkite `checkout.session.completed`
4. Spauskite **Send test webhook**
5. Patikrinkite Vercel žurnalus dėl webhook apdorojimo

### 4. Webhook implementacijos patikra

Webhook apdorotojo failas yra `app/api/webhooks/stripe/route.ts`. Įsitikinkite, kad:
- ✅ Tikrinama webhook parašo validacija
- ✅ Apdorojamas `checkout.session.completed` įvykis
- ✅ Sukuriamas užsakymas duomenų bazėje
- ✅ Siunčiamas užsakymo patvirtinimo el. laiškas
- ✅ Grąžinamas 200 statusas sėkmės atveju

---

## Trikčių šalinimas

### Dažnos problemos ir sprendimai

#### Problema: kompiliavimas nepavyksta su „Module not found"
**Sprendimas:**
```bash
# Įsitikinkite, kad visos priklausomybės yra package.json
npm install --legacy-peer-deps
# Komitinkite package-lock.json
git add package-lock.json
git commit -m "Update dependencies"
git push
```

#### Problema: aplinkos kintamieji neveikia
**Sprendimas:**
- Patikrinkite rašybą (turi tiksliai sutapti)
- Patvirtinkite, kad aplinka nustatyta kaip „Production"
- Iš naujo diekite po kintamųjų pridėjimo (privaloma)
- `NEXT_PUBLIC_*` kintamieji „įkepami" kompiliavimo metu

#### Problema: duomenų bazės ryšio klaidos
**Sprendimas:**
- Patikrinkite, ar Supabase projektas nėra pristabdytas (nemokamas planas pristabdo po neaktyvumo)
- Patvirtinkite, kad Supabase kredencialai teisingi
