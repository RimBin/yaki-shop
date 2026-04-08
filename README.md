# Atsakymai į prašymą „Tolimesniam įdiegto sprendimo vertinimui”

Šiame faile pateikiami visi atsakymai į vertintojo klausimus vienoje vietoje. Dokumente sujungti:

1. Atsakymai į 1–5 vertintojo klausimus;
1. E. pardavimo sprendimo darbų apimčių pagrindimas pagal paslaugų teikimo sutartį Nr.202406/01;
1. Vaizdinės konfigūracijos sprendimo darbų apimčių pagrindimas;
1. Nuorodos į konkrečius failus ir techninius įrodymus.

---

## 1) Prieiga prie Figma dizainų

**Vertintojas klausia:** Prašome pateikti prieigą prie Figma dizainų, kurie nurodyti ataskaitoje.

**Atsakymas su pagrindimu.** Projekto dizaino šaltinis pateikiamas šiame Figma faile:

1. https://www.figma.com/design/NqdWig7kYNP91Jzhcs9Uvz/Yakiwood-e-shop-UX-UI-design?node-id=157-2&t=oGBH88LZafNlzy5k-1

Dizaino darbai šiame projekte neapsiribojo vien Figma failų peržiūra. Reikėjo perkelti dizaino sprendinius į veikiančią sistemą, suderinti juos su komponentų architektūra, skirtingomis būsenomis, kalbinėmis versijomis ir skirtingais įrenginiais.

<table width="100%" bgcolor="#ffffff">
  <thead>
    <tr bgcolor="#ffffff">
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Įrodymas</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Nuoroda</th>
    </tr>
  </thead>
  <tbody>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Dizaino tokenų taikymas projekte</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/lib/design-system.ts">code/lib/design-system.ts</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Figma resursų sąrašai ir priskyrimai</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/lib/assets/figma-assets.ts">code/lib/assets/figma-assets.ts</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Automatizuotas resursų atsisiuntimo procesas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/scripts/download-assets.py">code/scripts/download-assets.py</a></td>
    </tr>
  </tbody>
</table>

---

## 2) Kuri svetainė yra projekto rezultatas ir koks domenų ryšys

**Vertintojas klausia:** Prašome patikslinti, kuri svetainė yra šio projekto rezultatas: `https://shop.yakiwood.co.uk/lt`, `https://yakiwood.lt/` ar kuri kita? Kaip `https://yakiwood.lt/`, `.pl`, `.se`, `.uk` ir kitos svetainės yra susijusios su šiuo projektu?

**Atsakymas su pagrindimu.** Šio projekto rezultatas yra `https://shop.yakiwood.co.uk` ir `https://shop.yakiwood.co.uk/lt`. Kitos svetainės `https://yakiwood.lt/`, `.pl`, `.se`, `.uk` yra informaciniai puslapiai skirtingoms rinkoms.

<table width="100%" bgcolor="#ffffff">
  <thead>
    <tr bgcolor="#ffffff">
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Įrodymas</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Nuoroda</th>
    </tr>
  </thead>
  <tbody>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Projekto bazinio domeno ir alternatyvių URL logika</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/lib/seo/site.ts">code/lib/seo/site.ts</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Atsiskaitymo API naudojamas tas pats projekto domenas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/app/api/checkout/route.ts">code/app/api/checkout/route.ts</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Lokalizuotų maršrutų konfigūracija</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/i18n/routing.ts">code/i18n/routing.ts</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Lokalizuotų kelių atitikmenys</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/i18n/paths.ts">code/i18n/paths.ts</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">PDF generavimo sluoksnyje naudojamas tas pats projekto kontekstas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/lib/configurator/pdf-generator.ts">code/lib/configurator/pdf-generator.ts</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Bendra aplikacijos struktūra viename projekte</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/app/layout.tsx">code/app/layout.tsx</a></td>
    </tr>
  </tbody>
</table>

---

## 3) Koks karkasas, TVS ir kokie „iš dėžės” funkcionalumai naudojami

**Vertintojas klausia:** Prašome patikslinti, koks karkasas ir TVS yra naudojamas sukurtai e. parduotuvei? Detalizuokite šio TVS technologijas. Patikslinkite, kokius pradinius funkcionalumus jis suteikė „iš dėžutės“?

**Atsakymas su pagrindimu.** Technologinis pagrindas: Next.js, React, TypeScript, Tailwind CSS, `next-intl`, Supabase/PostgreSQL, Stripe, Paysera, PayPal, `react-three-fiber` / Three.js.

Turinio valdymas įgyvendintas kaip individuali administravimo aplinka, sujungta su Supabase duomenų baze. Tai nėra WordPress ar WooCommerce pagrindu veikianti „iš dėžės” TVS.

### Kas naudota „iš dėžės”

Naudoti baziniai karkaso ir bibliotekų mechanizmai:

1. Maršrutizavimas;
1. Serverinis atvaizdavimas;
1. Meta duomenų valdymo pagrindas;
1. Serverinių maršrutų infrastruktūra;
1. `next/image` ir autentikacijos bibliotekų bazinis sluoksnis.

### Kas sukurta individualiai

Individualiai kurta:

1. Lokalizuotų adresų schema;
1. Administravimo moduliai;
1. Katalogo filtravimo logika;
1. Krepšelis;
1. Užsakymų ir atsargų valdymo grandinė;
1. Stripe / Paysera / PayPal integracijos;
1. SEO valdymas;
1. 3D konfigūratorius.

<table width="100%" bgcolor="#ffffff">
  <thead>
    <tr bgcolor="#ffffff">
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Įrodymas</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Nuoroda</th>
    </tr>
  </thead>
  <tbody>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Naudojamų technologijų ir bibliotekų sudėtis</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/package.json">code/package.json</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Lokalizuoto maršrutizavimo įdiegimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/i18n/routing.ts">code/i18n/routing.ts</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Individualus administravimo modulis (straipsniai)</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/app/admin/posts/page.tsx">code/app/admin/posts/page.tsx</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Individualus administravimo kliento sprendimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/components/admin/PostsAdminClient.tsx">code/components/admin/PostsAdminClient.tsx</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Individualus administravimo modulis (projektai)</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/app/admin/projects/page.tsx">code/app/admin/projects/page.tsx</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Individualus administravimo kliento sprendimas (projektai)</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/components/admin/ProjectsAdminClient.tsx">code/components/admin/ProjectsAdminClient.tsx</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">TVS duomenų struktūros migracijos</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/supabase/migrations/20260303_cms_posts_projects.sql">code/supabase/migrations/20260303_cms_posts_projects.sql</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Individuali krepšelio logika</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/lib/cart/store.ts">code/lib/cart/store.ts</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Individualus 3D konfigūratoriaus sluoksnis</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/components/Konfiguratorius3D.tsx">code/components/Konfiguratorius3D.tsx</a></td>
    </tr>
  </tbody>
</table>

---

## 4) E. pardavimo sprendimo darbų apimties detalus pagrindimas

**Vertintojas klausia:** Prašome detalizuoti, paaiškinti ir pagrįsti žemiau išvardintų darbų apimtis:

1. Dizaino adaptacija;
1. Svetainės mobilumo užtikrinimas, nes darbų apimtys perteklinės, TVS ar puslapių kūrimo priemonės dažnai tai pateikia „iš dėžutės“;
1. Puslapių struktūros kūrimas, nes struktūrai darbų apimtys yra perteklinės;
1. Elektroninės komercijos modulio integracija – koks tai modulis bei kokie automatinio prekių atsargų valdymo funkcionalumai įdiegti?;
1. Parduotuvės filtrų integracija;
1. Mokėjimo būdų integracija, nes mokėjimų integracija jau buvo numatyta su e. komercijos modulio diegimu;
1. Integracijos su išorinėmis sistemomis, nes nurodytiems darbams apimtis perteklinė;
1. Daugiakalbiškumas, nes nurodytiems darbams apimtis perteklinė;
1. TVS paruošimas, nes nurodytiems darbams apimtis perteklinė;
1. Vidinis SEO – rodomi nuliai;
1. Svetainės saugumo priemonės, nes nurodytiems darbams apimtis perteklinė, darbai dubliuojami su kitais punktais.

Pateikite originaliai sukurto kodo statistiką ir prieigą prie projekto programinio kodo (GIT ar pan. / FTP).

**Atsakymas su pagrindimu.** Pateiktoje kodo kopijoje matoma pilnai sukurta e. pardavimo sistema. Žemiau punktai 4.1–4.11 išskaidyti iki papunkčių. Prie kiekvieno darbo nurodyta ne tik kas buvo atlikta, bet ir kaip tai buvo padaryta praktikoje.

### 4.1 Dizaino adaptacija

<table width="100%" bgcolor="#ffffff">
  <thead>
    <tr bgcolor="#ffffff">
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Pagrindinis darbas</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kas buvo atlikta</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kaip buvo padaryta</th>
    </tr>
  </thead>
  <tbody>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kliento pateiktų pavyzdžių analizė</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Išanalizuoti kliento pateikti pavyzdžiai ir suformuota dizaino kryptis.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Pirmiausia buvo palyginti pageidaujami pavyzdžiai, išgrynintos bendros stilistikos taisyklės ir pritaikytos projekto struktūrai.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Spalvų, šriftų ir grafinių elementų suderinimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Suderinta spalvų paletė, tipografija ir bendri vizualiniai elementai.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Vizualinės taisyklės aprašytos dizaino tokenais ir nuosekliai pritaikytos skirtinguose komponentuose.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Dizaino perkėlimas į komponentinę struktūrą</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Dizainas perkeltas į pakartotinai naudojamus komponentus.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Vietoje atskirų pavienių puslapių buvo kuriami bendri komponentai, kad ta pati stilistika veiktų visoje sistemoje.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Produktų ir pagrindinių pardavimo puslapių dizaino pritaikymas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Dizainas pritaikytas katalogui, produktų puslapiams ir pardavimo etapams.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Tas pats dizaino sluoksnis buvo pritaikytas skirtingoms puslapio būsenoms: katalogui, detalei, krepšeliui ir atsiskaitymui.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Viešos ir administravimo dalių vizualinis suderinimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Užtikrintas vientisas vaizdas tarp viešos dalies ir administravimo aplinkos.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Bendra komponentų logika pritaikyta taip, kad administravimo dalis vizualiai nesiskirtų nuo likusios sistemos.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Peržiūros, korekcijos ir papildomi taisymai</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Atlikti pataisymai po peržiūrų ir testavimo.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Po pirminio perkėlimo buvo taisomi neatitikimai tarp dizaino, realių būsenų ir skirtingų ekranų.</td>
    </tr>
  </tbody>
</table>
<p><strong>&#302;rodymai:</strong> <a href="code/lib/design-system.ts">code/lib/design-system.ts</a>, <a href="code/components/shared/PageLayout.tsx">code/components/shared/PageLayout.tsx</a></p>

### 4.2 Svetainės mobilumo užtikrinimas

<table width="100%" bgcolor="#ffffff">
  <thead>
    <tr bgcolor="#ffffff">
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Pagrindinis darbas</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kas buvo atlikta</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kaip buvo padaryta</th>
    </tr>
  </thead>
  <tbody>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Prisitaikymo prie mažų ekranų planavimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Suprojektuotas puslapių elgesys telefonuose ir planšetėse.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Buvo atskirai numatyta, kurie blokai turi susispausti, keisti eiliškumą ar slėptis skirtinguose ekranuose.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Mobilios navigacijos sukūrimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Įdiegta mobili meniu struktūra ir jos būsenų valdymas.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Mobilus meniu realizuotas kaip atskiras valdomas komponentas su savo atidarymo ir uždarymo būsena.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Produktų sąrašo ir kortelių pritaikymas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Pritaikytas katalogo išdėstymas ir kortelių atvaizdavimas mobiliuose ekranuose.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kortelių tinklas, mygtukai ir tekstų ilgiai buvo perprogramuoti taip, kad veiktų be lūžių mažame ekrane.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Responsive breakpointų matricos ir UI regresijų tvarkymas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Parengta įrenginių ir breakpointų testavimo matrica bei suvienodintas blokų elgesys.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Telefonų, planšečių ir desktop režimuose nuosekliai tikrintas lūžių taškai, išdėstymo stabilumas ir pataisyti regresiniai neatitikimai.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Testavimas planšetėse ir skirtingose naršyklėse</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Patikrintas veikimas skirtinguose įrenginiuose ir naršyklėse.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Tikrinta, kaip tas pats puslapis elgiasi įvairiuose ekranuose ir naršyklėse, o skirtumai taisyti atskirai.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Taisymas po bandymų</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Pašalinti testavimo metu rasti neatitikimai.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Po testavimo buvo taisomi pasislinkimai, tarpai, mygtukų dydžiai ir filtrų elgesys.</td>
    </tr>
  </tbody>
</table>
<p><strong>&#302;rodymai:</strong> <a href="code/components/products/ProductsPageClient.tsx">code/components/products/ProductsPageClient.tsx</a>, <a href="code/e2e/smoke.spec.ts">code/e2e/smoke.spec.ts</a></p>

### 4.3 Puslapių struktūros kūrimas

<table width="100%" bgcolor="#ffffff">
  <thead>
    <tr bgcolor="#ffffff">
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Pagrindinis darbas</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kas buvo atlikta</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kaip buvo padaryta</th>
    </tr>
  </thead>
  <tbody>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Puslapių architektūros parengimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Sudaryta bendra puslapių struktūra ir jų ryšiai.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Puslapiai buvo suskirstyti į aiškias sritis: katalogą, turinį, administravimą, paskyrą ir atsiskaitymo eigą.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Meniu, antraščių ir pagrindinių elementų struktūra</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Sukurtas bazinis informacijos pateikimo karkasas.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Informacija buvo išdėstyta per bendrą navigacijos ir puslapio išdėstymo sluoksnį.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Navigacijos logikos kūrimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Įgyvendintas nuoseklus judėjimas tarp svetainės dalių.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kelių ir jų atitikmenų logika sutvarkyta taip, kad perėjimai būtų aiškūs ir lokalizuoti.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Interaktyvių elementų kūrimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Sukurti dinaminiai ir interaktyvūs sąsajos elementai.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Išskleidimai, filtrai, perjungimai ir kiti elementai programuoti kaip atskiri valdomi komponentai.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Puslapių programavimo darbai</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Realizuota puslapių elgsena ir būsenų valdymas.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Puslapių turinys susietas su duomenimis, maršrutais ir komponentų būsenomis.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Testavimas ir korekcijos</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Atliktas struktūrinis testavimas ir pataisymai.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Po integracijos buvo tikrinama, ar vartotojo kelias per visą svetainę veikia be nutrūkimų.</td>
    </tr>
  </tbody>
</table>
<p><strong>&#302;rodymai:</strong> <a href="code/i18n/paths.ts">code/i18n/paths.ts</a>, <a href="code/i18n/routing.ts">code/i18n/routing.ts</a></p>

### 4.4 Elektroninės komercijos modulio įdiegimas

<table width="100%" bgcolor="#ffffff">
  <thead>
    <tr bgcolor="#ffffff">
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Pagrindinis darbas</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kas buvo atlikta</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kaip buvo padaryta</th>
    </tr>
  </thead>
  <tbody>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Pardavimo eigos suprojektavimas ir įdiegimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Įgyvendinta eiga nuo prekės pasirinkimo iki užsakymo pateikimo.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Visa eiga buvo suprojektuota kaip viena nuosekli grandinė tarp katalogo, krepšelio, atsiskaitymo ir užsakymo kūrimo.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Krepšelio funkcijų sukūrimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Sukurtas krepšelio funkcionalumas ir sumų perskaičiavimas.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Krepšelio būsena saugoma atskirame sluoksnyje, kad perskaičiavimai veiktų iš karto keičiant kiekius ir parametrus.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Atsiskaitymo formos sukūrimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Įdiegtos pirkėjo, pristatymo ir susijusios formos.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Duomenų laukai ir jų tikrinimas buvo sujungti su serveriniu užsakymo kūrimu.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Automatinis duomenų užpildymas ir išsaugojimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Pridėtas duomenų užpildymas ir laikinas saugojimas.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Prisijungus paimami naudotojo duomenys ir panaudojami kitam pirkimo žingsniui.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Užsakymo sukūrimo serverio logika</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Sukurtas serverinis užsakymo kūrimo ir tikrinimo sluoksnis.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Užsakymas pirmiausia validuojamas serverio pusėje ir tik po to perduodamas į mokėjimo eigą.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Taisyklių ir privatumo logikos įdiegimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Įtraukti privalomi sutikimai ir teisiniai elementai.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Užsakymo eiga neleidžiama be būtinų sutikimų, todėl šie žingsniai valdomi logikoje.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Mokėjimo inicijavimo paruošimas iš užsakymo</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Užsakymas susietas su mokėjimo paleidimo eiga iki tiekėjo nukreipimo.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Po sėkmingo užsakymo sukūrimo sistema inicijuoja mokėjimo tiekėjo scenarijų, o patvirtinimų apdorojimas vykdomas atskirai 4.6 dalyje.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Bendras testavimas ir klaidų taisymas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Atlikti pilni eigos testai ir pataisymai.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Tikrinti skirtingi pirkimo scenarijai ir taisyti nesklandumai tarp etapų.</td>
    </tr>
  </tbody>
</table>
<p><strong>&#302;rodymai:</strong> <a href="code/app/api/orders/create/route.ts">code/app/api/orders/create/route.ts</a>, <a href="code/app/api/checkout/route.ts">code/app/api/checkout/route.ts</a></p>

### 4.5 Parduotuvės filtrų konfigūracija

<table width="100%" bgcolor="#ffffff">
  <thead>
    <tr bgcolor="#ffffff">
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Pagrindinis darbas</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kas buvo atlikta</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kaip buvo padaryta</th>
    </tr>
  </thead>
  <tbody>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Paieškos rezultatų kūrimas ir programavimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Įgyvendinta paieška pagal produkto tekstinius kriterijus.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Paieškos užklausa susieta su katalogo būkle, todėl rezultatai atsinaujina keičiantis įvedimui.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Filtravimo logikos kūrimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Sukurta daugiakriterinė filtravimo sistema.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Vienu metu derinami keli filtrai, o galutinis sąrašas perskaičiuojamas pagal visų jų kombinaciją.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Mobilių filtrų ir lipnios juostos logika</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Pritaikyta filtrų sąsaja mobiliai aplinkai.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kompiuterinė filtrų sąsaja pertvarkyta į kompaktišką mobilią versiją su atidarymo valdymu.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Testavimas ir taisymai</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Patikrintas filtrų veikimas ir atlikti pataisymai.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Po integracijos tikrintos skirtingos kombinacijos ir pataisytos neteisingos būsenos.</td>
    </tr>
  </tbody>
</table>
<p><strong>&#302;rodymai:</strong> <a href="code/components/shared/SearchBar.tsx">code/components/shared/SearchBar.tsx</a>, <a href="code/components/products/ProductsPageClient.tsx">code/components/products/ProductsPageClient.tsx</a></p>

### 4.6 Mokėjimų būdų įdiegimas

<table width="100%" bgcolor="#ffffff">
  <thead>
    <tr bgcolor="#ffffff">
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Pagrindinis darbas</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kas buvo atlikta</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kaip buvo padaryta</th>
    </tr>
  </thead>
  <tbody>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Paysera įdiegimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Įdiegta Paysera inicijavimo ir atsakų apdorojimo logika.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Užsakymo duomenys paruošiami, pasirašomi ir perduodami tiekėjui per atskirą serverinį maršrutą.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">PayPal įdiegimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Įgyvendintas PayPal atsiskaitymo scenarijus.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">PayPal eiga realizuota kaip atskira atsiskaitymo šaka su savo patvirtinimo veiksmais.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Stripe įdiegimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Įdiegta Stripe mokėjimų ir patvirtinimų eiga.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Stripe būsenos sugrąžinamos per webhook maršrutą ir susiejamos su užsakymu.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Automatiniai mokėjimo patvirtinimai</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Pridėtas automatinis mokėjimų būsenų atnaujinimas.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Gavus grįžtamąjį atsakymą, užsakymo būsena atnaujinama automatiškai be rankinio įsikišimo.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Testavimas ir korekcijos</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Patikrinti mokėjimų scenarijai ir ištaisytos klaidos.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Tikrinta, ar veikia inicijavimas, grįžimas po apmokėjimo ir klaidų scenarijai.</td>
    </tr>
  </tbody>
</table>
<p><strong>&#302;rodymai:</strong> <a href="code/app/api/paysera/init/route.ts">code/app/api/paysera/init/route.ts</a>, <a href="code/app/api/webhooks/stripe/route.ts">code/app/api/webhooks/stripe/route.ts</a>, <a href="code/app/api/webhooks/paysera/route.ts">code/app/api/webhooks/paysera/route.ts</a></p>

### 4.7 Integracijos su išorinėmis sistemomis

<table width="100%" bgcolor="#ffffff">
  <thead>
    <tr bgcolor="#ffffff">
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Pagrindinis darbas</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kas buvo atlikta</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kaip buvo padaryta</th>
    </tr>
  </thead>
  <tbody>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">El. pašto rinkodaros įrankių įdiegimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Integruotos naujienlaiškių priemonės: Mailchimp, Resend ir Supabase duomenų bazės tiekėjas.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Tiekėjų parinkimas sujungtas per bendrą naujienlaiškių tiekėjo sluoksnį, kad prenumeratos būtų valdomos centralizuotai.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Analitikos ir stebėsenos integracijų įdiegimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Įdiegtos GTM/GA4 integracijos ir Web Vitals rinkimas.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Analitika prijungiama per Google Tag Manager su sutikimų valdymu, o našumo metrikos siunčiamos per atskirą API maršrutą.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Pokalbių sistemos įdiegimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Sukurtas pokalbių roboto administravimas (sesijos, žinių bazė/FAQ, valdymas).</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Pokalbių roboto funkcionalumas susietas su administravimo nustatymais ir API maršrutais.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Pokalbių roboto OpenAI nustatymų logika</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Įdiegta OpenAI nustatymų ir valdymo logika pokalbių robotui.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Modelio, režimų, promptų ir kitų nustatymų valdymas iškeltas į administravimo ir serverio konfigūracijos sluoksnį.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Testavimas, klaidų paieška ir taisymas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Patikrintos integracijos ir pašalinti neatitikimai.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Tikrintas duomenų perdavimas tarp svetainės ir išorinių paslaugų.</td>
    </tr>
  </tbody>
</table>
<p><strong>&#302;rodymai:</strong> <a href="code/lib/newsletter/providers.ts">code/lib/newsletter/providers.ts</a>, <a href="code/app/api/newsletter/route.ts">code/app/api/newsletter/route.ts</a>, <a href="code/components/GoogleAnalytics.tsx">code/components/GoogleAnalytics.tsx</a>, <a href="code/components/layout/DeferredGlobals.tsx">code/components/layout/DeferredGlobals.tsx</a>, <a href="code/app/api/analytics/vitals/route.ts">code/app/api/analytics/vitals/route.ts</a>, <a href="code/app/admin/chatbot/page.tsx">code/app/admin/chatbot/page.tsx</a>, <a href="code/app/api/admin/chatbot-openai/route.ts">code/app/api/admin/chatbot-openai/route.ts</a></p>

### 4.8 Daugiakalbiškumo įdiegimas

<table width="100%" bgcolor="#ffffff">
  <thead>
    <tr bgcolor="#ffffff">
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Pagrindinis darbas</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kas buvo atlikta</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kaip buvo padaryta</th>
    </tr>
  </thead>
  <tbody>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Daugiakalbės sistemos logikos sukūrimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Įgyvendinta LT/EN kelių ir kalbų logika.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kiekvienam keliui sukurtas aiškus atitikmuo, kad puslapiai turėtų nuoseklius adresus abiem kalbomis.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kalbos perjungimo valdymas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Sukurtas kalbos perjungimo mechanizmas.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Perjungimo veiksmas naudoja lokalizuotų kelių logiką, todėl naudotojas nukreipiamas į atitinkamą puslapį kita kalba.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Puslapių ir nuorodų suderinimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Suderinti nuorodų atitikmenys tarp kalbų.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Vidinės nuorodos ir navigacija adaptuotos taip, kad teisingai veiktų abiejose kalbinėse versijose.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Tekstų ir vertimų struktūros prijungimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Integruoti vertimų failai ir naudojimo schema.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Tekstai paimami iš atskirų vertimų failų pagal aktyvią lokalę.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Testavimas ir taisymas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Patikrintas daugiakalbiškumo veikimas ir atlikti pataisymai.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Buvo tikrinama, ar nėra lūžių tarp kalbinių adresų, turinio ir mygtukų.</td>
    </tr>
  </tbody>
</table>
<p><strong>&#302;rodymai:</strong> <a href="code/i18n/paths.ts">code/i18n/paths.ts</a>, <a href="code/i18n/routing.ts">code/i18n/routing.ts</a>, <a href="code/messages/lt.json">code/messages/lt.json</a>, <a href="code/messages/en.json">code/messages/en.json</a></p>

### 4.9 Turinio valdymo sistemos įdiegimas

<table width="100%" bgcolor="#ffffff">
  <thead>
    <tr bgcolor="#ffffff">
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Pagrindinis darbas</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kas buvo atlikta</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kaip buvo padaryta</th>
    </tr>
  </thead>
  <tbody>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Administravimo sistemos struktūros sukūrimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Sukurta administravimo aplinkos pagrindinė struktūra.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Moduliai suskirstyti pagal sritis, kad skirtingi turinio tipai būtų valdomi atskirai.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Turinio redagavimo logikos sukūrimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Įgyvendinta turinio valdymo ir redagavimo logika.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Turinio įrašai, jų peržiūra ir išsaugojimas sujungti su duomenų baze per administravimo komponentus.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Naudotojų teisių ir prieigos valdymas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Įdiegta teisių ir prieigų sistema pagal roles.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kiekvienam naudotojo tipui priskirtos atskiros matymo ir redagavimo teisės.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Naudotojų kūrimo ir valdymo logika</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Sukurtas naudotojų kūrimo ir valdymo procesas.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Administravimo dalyje galima kurti naudotojus, priskirti roles ir keisti jų prieigos teises.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Nuolaidų ir rolėmis pagrįsto valdymo logika</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Įdiegta rolėmis pagrįsta verslo taisyklių logika.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Papildomos verslo taisyklės susietos su konkrečiomis rolėmis administravimo lygyje.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Tikrinimas ir taisymas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Patikrintas administravimo veikimas ir atlikti pataisymai.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Tikrinta, ar kiekvienas naudotojas mato tik tas sritis, kurios jam skirtos.</td>
    </tr>
  </tbody>
</table>
<p><strong>&#302;rodymai:</strong> <a href="code/app/admin/posts/page.tsx">code/app/admin/posts/page.tsx</a>, <a href="code/components/admin/PostsAdminClient.tsx">code/components/admin/PostsAdminClient.tsx</a>, <a href="code/app/admin/projects/page.tsx">code/app/admin/projects/page.tsx</a></p>

### 4.10 Vidinis SEO

Svarbus paaiškinimas: SEO administravimo lange pradžioje gali būti rodomi nuliai. Tai nereiškia, kad SEO neįdiegtas. Rodikliai užsipildo po to, kai administravimo dalyje paleidžiamas skenavimas ir sistema per API surenka rezultatą.

<table width="100%" bgcolor="#ffffff">
  <thead>
    <tr bgcolor="#ffffff">
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Pagrindinis darbas</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kas buvo atlikta</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kaip buvo padaryta</th>
    </tr>
  </thead>
  <tbody>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Raktinių žodžių ir puslapių logikos pritaikymas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Sutvarkyta puslapių semantika ir pavadinimų logika.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">SEO taisyklės buvo integruotos į puslapių pavadinimų, aprašų ir URL generavimo sluoksnį.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Meta duomenų ir techninio SEO logika</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Įgyvendintas meta duomenų ir techninio SEO sluoksnis.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Meta laukai, canonical ir susiję duomenys formuojami per bendrą puslapių logiką.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Paveikslėlių optimizavimas SEO tikslams</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Pritaikytas vaizdų naudojimas SEO reikalavimams.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Vaizdai ir jų susiję duomenys tvarkomi taip, kad būtų tinkami paieškos sistemų interpretacijai.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Greičio ir techninio veikimo gerinimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Optimizuotas veikimas greičiui ir stabilumui.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Techninis optimizavimas atliktas kartu su SEO skenavimo ir peržiūros logika.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Struktūrinių duomenų ir išplėstų rezultatų logika</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Įdiegti struktūriniai duomenys išplėstiems rezultatams.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">SEO valdymas papildytas struktūrinių duomenų sluoksniu, kad turinys būtų aiškiau suprantamas paieškai.</td>
    </tr>
  </tbody>
</table>
<p><strong>&#302;rodymai:</strong> <a href="code/app/admin/seo/page.tsx">code/app/admin/seo/page.tsx</a>, <a href="code/app/api/admin/seo/scan/route.ts">code/app/api/admin/seo/scan/route.ts</a></p>

### 4.11 Saugumo priemonių įdiegimas

<table width="100%" bgcolor="#ffffff">
  <thead>
    <tr bgcolor="#ffffff">
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Pagrindinis darbas</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kas buvo atlikta</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kaip buvo padaryta</th>
    </tr>
  </thead>
  <tbody>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">SSL ir saugaus ryšio sutvarkymas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Sutvarkytas saugaus ryšio veikimas.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Saugaus ryšio sluoksnis sujungtas su bendra projekto infrastruktūra.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Saugumo taisyklių ir apsaugų įdiegimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Įdiegtos saugumo antraštės ir apsaugos taisyklės.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Naršyklės ir serverio lygmens apsaugos taisyklės sukonfigūruotos per projekto nustatymus.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Techninių prieigos apsaugų ir užklausų filtravimo griežtinimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Sustiprintos serverinės užklausų apsaugos ir prieigos kontrolės taisyklės jautriems maršrutams.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Per konfigūracijos ir užklausų apdorojimo sluoksnį pritaikytos saugumo antraštės, maršrutų ribojimai ir papildomi validavimo patikrinimai.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Atsarginių kopijų ir atkūrimo logika</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Įgyvendinti atsarginių kopijų ir atkūrimo scenarijai.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kopijų ir jų atkūrimo valdymas iškeltas į atskirą administravimo sritį.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Tikrinimas ir papildomi taisymai</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Atliktas saugumo patikrinimas ir pataisymai.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Buvo tikrinama, ar apsaugos taisyklės netrukdo sistemos veikimui ir tuo pačiu saugo jautrias vietas.</td>
    </tr>
  </tbody>
</table>
<p><strong>&#302;rodymai:</strong> <a href="code/next.config.ts">code/next.config.ts</a>, <a href="code/proxy.ts">code/proxy.ts</a>, <a href="code/app/admin/backups/page.tsx">code/app/admin/backups/page.tsx</a></p>

### 4 skyriaus papildomi įrodymai

<table width="100%" bgcolor="#ffffff">
  <thead>
    <tr bgcolor="#ffffff">
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Įrodymas</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Nuoroda</th>
    </tr>
  </thead>
  <tbody>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Bendras puslapių karkasas ir išdėstymo logika</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/components/shared/PageLayout.tsx">code/components/shared/PageLayout.tsx</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Katalogo ir filtravimo logika</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/components/products/ProductsPageClient.tsx">code/components/products/ProductsPageClient.tsx</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Krepšelio logika</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/lib/cart/store.ts">code/lib/cart/store.ts</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Užsakymo kūrimo serverio logika</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/app/api/orders/create/route.ts">code/app/api/orders/create/route.ts</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Atsiskaitymo eigos serverio logika</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/app/api/checkout/route.ts">code/app/api/checkout/route.ts</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Stripe mokėjimo patvirtinimų apdorojimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/app/api/webhooks/stripe/route.ts">code/app/api/webhooks/stripe/route.ts</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Paysera mokėjimo patvirtinimų apdorojimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/app/api/webhooks/paysera/route.ts">code/app/api/webhooks/paysera/route.ts</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Lokalizuotų kelių žemėlapis</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/i18n/paths.ts">code/i18n/paths.ts</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Lokalizuotų maršrutų konfigūracija</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/i18n/routing.ts">code/i18n/routing.ts</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Administravimo modulis (straipsniai)</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/app/admin/posts/page.tsx">code/app/admin/posts/page.tsx</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Administravimo modulis (projektai)</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/app/admin/projects/page.tsx">code/app/admin/projects/page.tsx</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">SEO administravimo modulis</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/app/admin/seo/page.tsx">code/app/admin/seo/page.tsx</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">SEO skenavimo API maršrutas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/app/api/admin/seo/scan/route.ts">code/app/api/admin/seo/scan/route.ts</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Saugumo antraštės ir taisyklės</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/next.config.ts">code/next.config.ts</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Prieigų kontrolė per užklausų apdorojimą</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/proxy.ts">code/proxy.ts</a></td>
    </tr>
  </tbody>
</table>

---

## 5) Vaizdinės konfigūracijos darbų apimties detalus pagrindimas

**Vertintojas klausia:** Prašome detalizuoti, paaiškinti ir pagrįsti vaizdinės konfigūracijos sukūrimo ir diegimo darbų apimtis, nes vertintina, kad kelių 3D modelių parengimui ir `three.js` bibliotekos pritaikymui numatytos darbų apimtys yra perteklinės. Pateikite originaliai sukurto kodo statistiką ir prieigą prie projekto programinio kodo.

**Atsakymas su pagrindimu.** Kodo kopijoje aiškiai matoma visa grandinė: modelių registras, GLB bibliotekos valdymas, realaus laiko 3D vaizdas, konfigūravimo sąsaja ir sujungimas su užsakymo bei apmokėjimo eiga. 3D modeliai buvo kuriami Blender aplinkoje, o į projektą integruoti kaip GLB variantai.

### 5.1 Produkto modeliavimas

<table width="100%" bgcolor="#ffffff">
  <thead>
    <tr bgcolor="#ffffff">
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Pagrindinis darbas</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kas buvo atlikta</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kaip buvo padaryta</th>
    </tr>
  </thead>
  <tbody>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Reikalavimų ir produkto vaizdavimo analizė</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Išgryninta, kaip modeliai turi atrodyti ir veikti sistemoje.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Prieš kuriant modelius buvo nustatyta, kokie parametrai turės keistis ir kaip modeliai bus susieti su prekių duomenimis.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">3D modelių paruošimas pagal produkto specifikacijas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Parengti modeliai pagal realias produkto savybes.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Modeliai sukurti taip, kad atitiktų produkto formas, profilius ir naudojimo scenarijus.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Modelių optimizavimas naudojimui internete</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Optimizuoti modeliai greitesniam veikimui neprarandant kokybės.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Modelių svoris ir struktūra koreguoti taip, kad jie tiktų internetinei peržiūrai.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Skirtingų variantų struktūros parengimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Sukurta modelių variantų struktūra pagal pasirinkimus.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Modelių biblioteka suskirstyta taip, kad konkretų variantą būtų galima paimti automatiškai.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Eksportavimo į skirtingus formatus logika ir tikrinimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Patikrintas modelių naudojimas reikiamuose formatuose.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Modeliai suderinti su projekto naudojamais formatais ir jų įkėlimo logika.</td>
    </tr>
  </tbody>
</table>
<p><strong>&#302;rodymai:</strong> <a href="code/lib/models.ts">code/lib/models.ts</a>, <a href="code/public/models/products/index.json">code/public/models/products/index.json</a></p>

### 5.2 Produktų vizualizacija

<table width="100%" bgcolor="#ffffff">
  <thead>
    <tr bgcolor="#ffffff">
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Pagrindinis darbas</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kas buvo atlikta</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kaip buvo padaryta</th>
    </tr>
  </thead>
  <tbody>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Konfigūravimo logikos suprojektavimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Suprojektuota konfigūracijos veikimo logika ir priklausomybės.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Aprašyta, kaip tarpusavyje susiję spalvos, profiliai, matmenys, modeliai ir kainodara.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Produkto savybių keitimo modulio sukūrimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Sukurtas parametrų keitimo modulis su tarpusavio priklausomybėmis.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Naudotojo pasirinkimai sujungti su valdomomis būsenomis, kad kiekvienas pakeitimas atnaujintų bendrą konfigūraciją.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Modelio parinkimo logikos sukūrimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Įdiegta automatinė modelio parinktis pagal parametrus.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Sistema pagal pasirinktus produkto duomenis parenka konkretų GLB modelį iš registro.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Realaus laiko vaizdo atnaujinimo mechanizmas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Sukurtas realaus laiko vaizdo atnaujinimas keičiant parametrus.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kiekvienas parametro pakeitimas tiesiogiai atnaujina 3D peržiūrą be papildomo perkrovimo.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kainos ir komplektacijos perskaičiavimo logika</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Įgyvendintas dinaminis kainos ir komplektacijos perskaičiavimas.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Konfigūracijos parametrai perduodami į skaičiavimo logiką ir kaina atsinaujina pagal pasirinktą variantą.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Eksporto funkcijos</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Sukurtos PDF / PNG / JPG ir spausdinimo funkcijos.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Konfigūracija paverčiama eksportuojamu rezultatu per atskirą generavimo sluoksnį.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">3D scenos našumo ir stabilumo optimizavimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Optimizuotas modelių įkėlimas, atvaizdavimo stabilumas ir peržiūros reakcija keičiant konfigūraciją.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Patobulintas modelių parinkimo ir atvaizdavimo sluoksnis, sumažintas trikdžių skaičius keičiant parametrus ir suvaldyti kraštiniai atvaizdavimo scenarijai.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Mobili ir kompiuterinė sąsaja</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Pritaikytas valdymas tiek mobiliems, tiek staliniams įrenginiams.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Konfigūravimo valdymas perorganizuotas taip, kad tiktų ir dideliems, ir mažiems ekranams.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Testavimas ir taisymai</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Atliktas konfigūratoriaus testavimas ir pataisymai.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Tikrintos realios pasirinkimų kombinacijos, modelių įkėlimas, eksportai ir stabilumas.</td>
    </tr>
  </tbody>
</table>
<p><strong>&#302;rodymai:</strong> <a href="code/components/Konfiguratorius3D.tsx">code/components/Konfiguratorius3D.tsx</a>, <a href="code/components/configurator/ConfiguratorPage.tsx">code/components/configurator/ConfiguratorPage.tsx</a>, <a href="code/lib/configurator/pdf-generator.ts">code/lib/configurator/pdf-generator.ts</a></p>

### 5.3 Duomenų sujungimas su sistemomis

<table width="100%" bgcolor="#ffffff">
  <thead>
    <tr bgcolor="#ffffff">
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Pagrindinis darbas</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kas buvo atlikta</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kaip buvo padaryta</th>
    </tr>
  </thead>
  <tbody>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Produkto savybių ir specifikacijų programavimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Sukurtas savybių ir specifikacijų duomenų sluoksnis.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Produkto duomenys sustruktūruoti taip, kad jais vienu metu galėtų naudotis katalogas, konfigūratorius ir užsakymų dalis.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Tekstinio ir vaizdinio turinio paruošimas kiekvienai prekei</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Paruoštas turinys kiekvienam produkto variantui.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kiekvienam variantui susieti tekstiniai ir vaizdiniai elementai, kad pasirinkimai būtų nuoseklūs.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Užsakymų valdymo sistemos sujungimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Konfigūratorius sujungtas su užsakymų valdymo grandine.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Konfigūracijos rezultatas perduodamas į užsakymo kūrimo logiką kaip realūs užsakymo duomenys.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Kainodaros užrakinimo ir pasiūlymo vientisumo integracija</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Įdiegta konfigūracijos kainos užrakinimo bei pasiūlymo vientisumo kontrolė prieš užsakymo patvirtinimą.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Konfigūracijos duomenys validuojami serverio pusėje, suformuojamas patikimas kainos snapshot ir užtikrinamas nuoseklus perdavimas į tolesnę užsakymo eigą.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Poapmokėjiminio užsakymo užbaigimo ir atsargų atnaujinimo grandinė</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Įdiegta apmokėtų užsakymų užbaigimo logika su atsargų ir būsenų sinchronizacija.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Gavus mokėjimo patvirtinimą per webhook, automatiškai atnaujinama užsakymo būsena, nurašomos atsargos ir išlaikomas duomenų nuoseklumas tarp modulių.</td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Tikrinimas, kraštinių situacijų valdymas ir taisymai</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Įdiegtas klaidų valdymas ir atlikti stabilumo pataisymai.</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Buvo tikrinama, ar sistema teisingai elgiasi net ir nestandartinėse pasirinkimų kombinacijose.</td>
    </tr>
  </tbody>
</table>
<p><strong>&#302;rodymai:</strong> <a href="code/app/api/orders/create/route.ts">code/app/api/orders/create/route.ts</a>, <a href="code/app/api/checkout/route.ts">code/app/api/checkout/route.ts</a>, <a href="code/lib/inventory/finalize-paid-order.ts">code/lib/inventory/finalize-paid-order.ts</a></p>

### 5 skyriaus papildomi įrodymai

<table width="100%" bgcolor="#ffffff">
  <thead>
    <tr bgcolor="#ffffff">
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Įrodymas</th>
      <th bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Nuoroda</th>
    </tr>
  </thead>
  <tbody>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Modelių parinkimo logika</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/lib/models.ts">code/lib/models.ts</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">GLB modelių indeksas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/public/models/products/index.json">code/public/models/products/index.json</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">3D konfigūratoriaus komponentas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/components/Konfiguratorius3D.tsx">code/components/Konfiguratorius3D.tsx</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Konfigūravimo puslapio logika</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/components/configurator/ConfiguratorPage.tsx">code/components/configurator/ConfiguratorPage.tsx</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Konfigūratoriaus būsenų valdymas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/components/configurator/useConfiguratorState.ts">code/components/configurator/useConfiguratorState.ts</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">PDF / vaizdo eksporto logika</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/lib/configurator/pdf-generator.ts">code/lib/configurator/pdf-generator.ts</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Konfigūracijos perdavimas į užsakymą</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/app/api/orders/create/route.ts">code/app/api/orders/create/route.ts</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Konfigūracijos perdavimas į atsiskaitymą</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/app/api/checkout/route.ts">code/app/api/checkout/route.ts</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Mokėjimo patvirtinimo apdorojimas</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/app/api/webhooks/stripe/route.ts">code/app/api/webhooks/stripe/route.ts</a></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;">Atsargų užbaigimo logika po apmokėjimo</td>
      <td bgcolor="#ffffff" style="border:1px solid #d0d7de; padding:8px;"><a href="code/lib/inventory/finalize-paid-order.ts">code/lib/inventory/finalize-paid-order.ts</a></td>
    </tr>
  </tbody>
</table>

---

## 6) Kodo prieiga ir statistika

Visa peržiūrai pateikta originalaus kodo kopija yra kataloge [code](code).

Šioje kopijoje yra:

1. 616 failų;
1. 456 šaltinio failai;
1. Bendras suskaičiuotas šaltinio kodo dydis – 84 995 eilutės.

Didžiausios sritys:

1. `components` – 33 568 eil.
1. `app` – 18 541 eil.
1. `lib` – 15 003 eil.
1. `messages` – 5 384 eil.
1. `scripts` – 4 308 eil.
1. `data` – 3 038 eil.
1. `supabase` – 2 116 eil.

Vaizdinės konfigūracijos daliai šioje pateiktoje kopijoje priskirti 27 šaltinio failai, kurių bendra apimtis yra 8 999 eilutės, taip pat 139 GLB modelių failai kataloge [code/public/models/products](code/public/models/products).

Dėl saugumo ir komercinės informacijos apsaugos nuolatinė Git ar FTP prieiga neteikiama. Techniniam vertinimui pateikta pilna archyvinė kodo kopija, leidžianti patikrinti apimtį, struktūrą ir vientisumą.

---


Pateiktame sprendime buvo kuriama ne standartinė „iš dėžės” parduotuvė, o individualus e. komercijos ir vaizdinės konfigūracijos sprendimas sukurtas ir pritaikytas konkrečiam projektui.
Darbų apimtys apima ne tik dizainą ar pavienių funkcijų įjungimą, bet ir visą veikiančio sprendimo sukūrimą: architektūrą, lokalizaciją, administravimą, katalogo logiką, filtrus, krepšelį, atsiskaitymą, mokėjimus, atsargas, SEO, saugumą, 3D konfigūratorių ir jo integraciją į užsakymo procesą.
