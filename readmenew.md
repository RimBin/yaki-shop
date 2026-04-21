
# Darbo apimties detalizavimas

## 1. E. pardavimo sandorio sprendimas: 490 val.

### 1.1. Vertintojo teiginys

> *„e. Pardavimo sandorio sprendimo darbai: Nepagrįsta Dizaino adaptacija -> Puslapių struktūros kūrimas -> Elektroninės komercijos modulio integracija -> Svetainės mobilumo užtikrinimas bendra darbų apimtis (490 val.), kurių rezultatas sukurti svetainės puslapiai, pritaikyti ir mobiliems įrenginiams, nes puslapių nėra daug, dalis jų – tekstiniai, dizainas ar jo elementai iš dalies yra paveldėti iš kitų susijusių svetainių bei bendro korporatyvinio dizaino, o pardavimo procesas yra įprastas. Pažymėtina, kad filtrai, vertimai – įvertinti atskirai. Todėl priimtina šių darbų apimtis – 320 val."*
>
> *„Kiti e. Pardavimo sandorio sprendimo darbai – apimtis priimtina, nors vietomis didoka (pvz. integracijos su išorinėmis sistemomis, daugiakalbišumas ar saugumo priemonių integravimas ir kt.) - 490 val."*

### 1.2. Atsakymas su pagrindimu

Vertintojo argumentas remiasi prielaida, kad mažas puslapių skaičius reikalauja mažai darbo. Bet šio bloko apimtis priklauso nuo to ką tie puslapiai daro, ne nuo jų skaičiaus.

Dizainas sukurtas nuo nulio. Iš senos svetainės paimtas tik logotipas ir pora spalvų, visa kita vizualinė sistema, tipografija, mygtukų ir kortelių taisyklės, modalai, skeleton ir toast pranešimų elgsena, buvo sukurta ir suprogramuota iš naujo. Figma failas `ttxSg4wMtXPqfcQEh6B405` tai patvirtina.

Pardavimo procesas nėra „įprastas". Šiame bloke buvo suprogramuota visa pardavimo eiga nuo katalogo iki patvirtinimo ekrano: krepšelio schema keitėsi keturis kartus (v0->v4), kad tilptų kainos momentinis vaizdas, konfigūracijos duomenys ir pristatymo parametrai; įgyvendintas kainos užrakinimas prieš checkout, serverinė užsakymo validacija, atsargų nurašymo grandinė ir SKU formavimas. Pačios mokėjimų tiekėjų integracijos priklauso atskirai priimtam sutarties 6 punktui ir čia nėra įskaičiuotos. Krepšelio schema keitėsi ne dėl planavimo spragų, o dėl to, kad konfigūratoriaus iteracijos su kiekvienu ciklu atnešdavo naujų duomenų reikalavimų, kurių ankstesnė struktūra negalėjo išlaikyti: v0 neturėjo laiko žymės, v1 neturėjo `lineId` nei konfigūracijos lauko, v2 turėjo neteisingą `lineId` formulę, kuri nepaisė matmenų, v3->v4 įvedė `pricingSnapshot` - momentinę kainos užfiksavimo struktūrą eilutės lygyje. Kiekviena versija reikalavo migracijos funkcijos, kuri senas localStorage eilutes automatiškai konvertuotų - tai užtikrina, kad vartotojas, grįžęs po kelių dienų, neranda tuščio krepšelio. Be to, krepšelis turi atsiminti viską ką vartotojas pasirinko - spalvą, profilį, matmenis, momentinę kainą - išsaugoti šiuos duomenis tarp puslapių ir galiausiai visa tai perduoti Paysera mokėjimo sesijai. Konfigūracijos kontekstas turi išlikti nepakitęs per visą pirkimo eigą: nuo konfigūratoriaus ekrano iki patvirtinimo puslapio.

Filtrai ir vertimai į 490 val. neeina. Sutarties 5 ir 8 punktai priimti atskirai; 490 val. apima tik dizainą, mobilumą, puslapių struktūrą ir e-komercijos logiką.

### 1.3. Detalizuotas valandų išskaidymas

#### Punktas 1.1: Dizaino adaptacija (120 val.)

*Sutartyje šis punktas apėmė analizę ir adaptaciją pagal kliento pasirinktus svetainių pavyzdžius, spalvų paletės, šriftų ir grafinių elementų derinimą, vizualinio stiliaus suderinimą su bendra prekės ženklo identiteto strategija.*

Nors antraštėje paliktas pirminis pavadinimas „Dizaino adaptacija“ (taip jis buvo įvardytas pradinėje sutartyje), šiame punkte faktiškai buvo sukurta visa nauja vizualinė sistema ir ji suprogramuota kode. Spalvos, šriftai, mygtukai, kortelės, formos, modalo langai, visi šie elementai sukurti nuo nulio. Tada pagal juos suprogramuoti visi ekranai: katalogas, produkto puslapis, krepšelis, checkout, paskyra ir admin panelė.

| Darbas | Val. | Repo |
|---|---|---|
| Kliento pageidavimų surinkimas, pavyzdžių analizė, naujos vizualinės krypties paruošimas | 20 | Figma: `ttxSg4wMtXPqfcQEh6B405` |
| Spalvų paletė, šriftų parinkimas (DM Sans, Outfit, Tiro Tamil), mygtukų ir kortelių stiliaus taisyklės | 22 | `app/globals.css`, `app/layout.tsx` |
| Visų pakartotinai naudojamų komponentų programavimas, mygtukai, kortelės, formos laukai, dropdown meniu, tabs, badge ženkliukai, skeleton (krovimo) animacijos, toast pranešimai, modalai | 30 | `components/ui/` |
| Katalogo, produkto detalės ir checkout ekranų vizualinis programavimas | 18 | `components/Products.tsx`, `components/ProductDetail.tsx` |
| Viešos dalies ir admin panelės stiliaus suvienodinimas, kad atrodytų kaip vienas produktas | 12 | `components/admin/`, `components/layout/` |
| Visų būsenų taisymas, hover, active, disabled, loading, error, empty, nes per peržiūras vis kas nors neveikė | 18 | `components/ui/` |

#### Punktas 1.2: Svetainės mobilumo užtikrinimas (110 val.)

*Sutartyje šis punktas apėmė svetainės dizaino adaptaciją mobiliems telefonams ir planšetėms bei testavimą įvairiose platformose ir naršyklėse.*

Nors pavadinime vartojamas žodis „užtikrinimas“, šiame punkte buvo atliekami pilnaverčiai programavimo darbai, o ne vien baigiamasis patikrinimas. Kiekvienas pardavimo kelio ekranas turi veikti telefone, katalogas, filtrai, produkto puslapis, krepšelis, checkout, paskyra. Tai ne vien CSS media queries, daug elementų buvo perprogramuota ir sukurta iš naujo, nes desktopo versija tiesiog netilpo.

| Darbas | Val. | Repo |
|---|---|---|
| Breakpoint sistemos sukūrimas ir suprogramavimas, kada kas persidėlioja telefonui ir planšetei | 18 | `app/globals.css`, `tailwind.config.cjs` |
| Mobilaus meniu programavimas, atidarymas, uždarymas, aktyvaus puslapio paryškinimas, sklandūs perėjimai | 16 | `components/shared/Header.tsx` |
| Produktų kortelių pertvarkymas ir suprogramavimas į vieną stulpelį su pakankamai dideliais mygtukais pirštui paspausti | 24 | `components/products/ProductCard.tsx` |
| Sudėtingų valdiklių (šoninių skydelių, dropdown-ų, modalų) perorganizavimas mobiliam išdėstymui, desktopo layout'as tiesiog netelpa telefone | 20 | `components/products/ProductsPageClient.tsx` |
| Testavimas skirtinguose telefonuose ir naršyklėse (Chrome, Firefox, Safari, Edge) | 16 | `e2e/` |
| Klaidų taisymas po bandymų, scroll problemos, elementai išlindę iš ekrano, sticky header neatitikimai | 16 | `components/layout/` |

#### Punktas 1.3: Puslapių struktūros kūrimas (120 val.)

*Sutartyje šis punktas apėmė meniu, antraščių ir kitų puslapio elementų organizavimą, svetainės navigacijos kūrimą ir optimizavimą, interaktyvių elementų kūrimą bei puslapio programavimo darbus.*

Šiame punkte kalbama ne tik apie struktūros sugalvojimą, bet ir apie jos techninį realizavimą kode: puslapių medžio, navigacijos logikos ir interaktyvių UI elementų suprogramavimą. Visas svetainės puslapių medis, meniu logika, navigacija tarp sekcijų ir interaktyvūs elementai (dropdown, tabs, mygtukai su loading būsena).

| Darbas | Val. | Repo |
|---|---|---|
| Puslapių žemėlapio sudarymas, pardavimo kelias, turinio kelias, savitarnos kelias, ir ryšiai tarp jų | 20 | `app/sitemap.ts`, `app/` |
| Meniu, antraštės, poraštės ir navigacijos blokų programavimas | 22 | `components/shared/Header.tsx`, `components/shared/Footer.tsx` |
| Vartotojo kelio realizavimas: katalogas -> produktas -> konfigūratorius -> krepšelis -> checkout -> patvirtinimas | 18 | `app/produktai/`, `app/konfiguratorius3d/`, `app/checkout/` |
| Interaktyvūs elementai, dropdown su animacija, tabs su aktyvios būsenos logika, mygtukai su loading state | 24 | `components/ui/`, `components/Accordion.tsx` |
| Būsenų logika, breadcrumb, aktyvus meniu punktas, pasirinktas filtras, atidaryta kategorija | 22 | `components/layout/`, `components/shared/` |
| Patikrinimas ir klaidų taisymas, kai perėjimai tarp puslapių neveikė sklandžiai | 14 | `app/layout.tsx` |

#### Punktas 1.4: Elektroninės komercijos modulio integracija (140 val.)

*Sutartyje šis punktas apėmė pardavimų procesų įdiegimą, automatizavimą ir optimizavimą, automatinį prekių atsargų valdymo diegimą, prekių krepšelio ir užsakymo puslapių kūrimą.*

Šiame punkte apimtas pilnas e. komercijos funkcionalumo sukūrimas ir suprogramavimas, o ne vien atskirų formų ar mygtukų integracija. Čia visa pirkimo logika, krepšelis, checkout formos, užsakymo sukūrimas, mokėjimas, validacijos, pilnas kelias nuo prekės pasirinkimo iki užsakymo patvirtinimo.

| Darbas | Val. | Repo |
|---|---|---|
| Visos pirkimo eigos programavimas, nuo prekės pasirinkimo iki užsakymo patvirtinimo ekrano | 24 | `app/checkout/`, `app/order-confirmation/` |
| Krepšelio logika, pridėjimas, kiekio keitimas, šalinimas, dublikatų sujungimas pagal variantą+spalvą+apdailą+matmenis | 18 | `lib/cart/store.ts` |
| Checkout formų programavimas, pirkėjo duomenys, pristatymo adresas, mokėjimo būdo pasirinkimas, sutikimai | 20 | `app/checkout/` |
| Pirkėjo duomenų išsaugojimas, kad kitą kartą perkant nereikėtų visko vėl pildyti | 14 | `lib/cart/store.ts` |
| Serverinė validacija, ar kainos teisingos, ar prekės yra sandėlyje, ar duomenys atitinka schemą | 18 | `app/api/checkout/route.ts` |
| GDPR sutikimų komponentai ir pirkimo taisyklių patvirtinimas | 8 | `components/CookieConsentBanner.tsx`, `app/policies/` |
| Krepšelio duomenų paruošimas perdavimui į mokėjimo sesiją (be pačios mokėjimų tiekėjų integracijos, kuri priskirta 6 punktui) | 14 | `app/api/checkout/route.ts` |
| Visos eigos testavimas nuo pradžios iki galo ir klaidų taisymas | 24 | `e2e/cart.spec.ts` |

### 1.4. Papildomi šio bloko darbai, kurie nebuvo akcentuoti pradinėje sutartyje

Žemiau išvardyti darbai priklauso tam pačiam e. pardavimo sandorio blokui ir jų apimtis jau yra įskaičiuota 1.1–1.4 valandose. Jie pateikiami tam, kad būtų matoma, kas realiai sudaro 490 val. sumą, ir kad nebūtų interpretuojama, jog šis blokas apėmė tik „puslapių kūrimą".

| Darbas | Apimtis | Repo |
|---|---|---|
| Krepšelio schemos migracijos (v0->v4), per kūrimą krepšelio struktūra keitėsi keturis kartus, reikėjo kad seni krepšeliai automatiškai konvertuotųsi | Keturi migracijos žingsniai | `lib/cart/store.ts` |
| Kainos momentinis vaizdas, kiekviena krepšelio eilutė išsaugo tikslią kainą tą momentą kai prekė pridėta, su 7 dienų galiojimu | Pilna kainų konteksto schema | `lib/cart/store.ts` |
| Užsakymo užbaigimo grandinė po apmokėjimo, atsargų nurašymas, užsakymo būsenų atnaujinimas, duomenų vientisumo palaikymas tarp modulių (pats el. laiškų siuntimas ir PDF generavimas priskirti 7 punktui) | Universalus serverinis modulis | `app/api/checkout/`, `lib/inventory/finalize-paid-order.ts` |
| Atsargų admin valdymas, per admin panelę matomos visos atsargos, galima filtruoti, papildyti, eksportuoti CSV | Inventoriaus ciklas | `app/admin/`, `docs/INVENTORY_SYSTEM.md` |
| Paskyros savitarna, vartotojas mato savo užsakymus, atsisiunčia sąskaitas, prisijungia per Google | Paskyrų funkcionalumas | `app/account/`, `components/account/` |
| AI pokalbių robotas, pardavimo pagalbos įrankis, galintis paaiškinti apie produktus ir įdėti prekę į krepšelį tiesiogiai iš pokalbio | Pardavimo pagalbos įrankis | `components/ChatbotWidget.tsx`, `docs/CHATBOT_OPENAI.md` |
| Tinklaraščio variklis, straipsnių sistema su begaline slinktimi ir susijusių straipsnių logika (turinys kaip pardavimų kanalas) | Turinio rinkodaros kanalas | `app/blog/`, `app/straipsniai/`, `components/blog/` |
| Teisiniai / GDPR puslapiai, taisyklės ir sąlygos, pristatymo ir grąžinimo politikos, slapukų sutikimo banneris | Privaloma teisinė atitiktis | `app/policies/`, `components/CookieConsentBanner.tsx` |

### 1.5. Punkto 1.1–1.4 suvestinė

| Punktas | Valandos | Kas padaryta |
|---|---|---|
| 1.1 Dizaino adaptacija | 120 val. | Brando sistemos sukūrimas, UI komponentų bibliotekos sukūrimas, visų ekranų vizualinis suprogramavimas |
| 1.2 Mobilumo užtikrinimas | 110 val. | Visų pardavimo kelio ekranų suprogramavimas telefonams ir planšetėms |
| 1.3 Puslapių struktūra | 120 val. | Puslapių medis, meniu, user flow, interaktyvūs elementai |
| 1.4 E. komercijos modulis | 140 val. | Krepšelis, checkout, užsakymas, mokėjimas, atsargos |
| **Iš viso** | **490 val.** | |

---

## 2. Vaizdinės konfigūracijos sprendimas: 995 val.

### 2.1. Vertintojo teiginiai

> *„Vaizdinės konfigūracijos sprendimo bendra darbų apimtis – 995 val. taip pat laikytina nepagrįsta, nes nors sukurti 139 produktų modeliai, tačiau visi jie yra kartotiniai ir besiskiriantys išorine faktūra, o jų atvaizdavimas ir valdymas – vienodas. Taip pat ir beveik 9000 kodo eilučių apimtis nepagrindžia beveik 1000 val. darbų apimties. Todėl vertintina šių darbų apimtis – 480 val. bendrai."*

> *„Prašome detalizuoti, paaiškinti ir pagrįsti vaizdinės konfigūracijos sukūrimo ir diegimo darbų apimtis, nes vertintina, kad kelių 3D modelių parengimui ir three.js bibliotekos pritaikymui numatytos darbų apimtys yra perteklinės. Pateikite originaliai sukurto kodo statistiką ir prieigą prie projekto programinio kodo."*

### 2.2. Atsakymas su pagrindimu

Vertintojas vertina konfigūratorių kaip „kelis 3D modelius + three.js biblioteką". Realybė kur kas platesnė:

1. **Modeliavimas ir programavimas, visiškai skirtingi dalykai.** Modelių ruošimas Blenderyje (kategorijos A–D, 262 val.), tai fizinis darbas: fotografavimas, spalvų derinimas, eksportavimas. O programinis 3D variklis naršyklėje (kategorijos E–M, 733 val.), tai WebGL kodas, būsenos valdymas, UI logika, kainodara, testavimas. Tai ne „kartotinis darbas".

2. **139 modeliai nereiškia 139 kartus to paties darbo.** Taip, modeliai turi bendrą geometriją. Bet buvo 4 unikalūs profiliai, 3 medienos tipai ir 22 spalviniai variantai, todėl susidarė plati variantų matrica. Kiekvienam variantui reikėjo nufotografuoti tekstūrą, sukurti PBR medžiagą (4 žemėlapius), sukalibruoti spalvas tarp Blender ir naršyklės, eksportuoti GLB su Draco kompresija ir validuoti rezultatą.

3. **Konfigūratorius nėra izoliuotas.** Jis sujungtas su visu pardavimo keliu: pasirinkimai -> krepšelis -> kainos skaičiavimas serveryje -> kainos užrakinimas tokenu -> atsargų tikrinimas -> Stripe checkout -> PDF generavimas. Tai pilna sistema.

4. **Kodo eilutės neatspindi viso darbo.** Be programavimo buvo Blender modeliavimas (262 val.), medienos tekstūrų fotografavimas, PBR medžiagų kūrimas, rankinis vizualinis testavimas. Vien bazinė matrica sudarė 4 profilius × 22 spalvinius variantus = 88 kombinacijas, o kiekviena jų buvo tikrinama bent dviem vaizdais - darbalaukio ir mobiliajame, todėl susidaro apie 176, t. y. apie 180 patikrinimų. Prie to dar prisidėjo iteracijos su klientu ir architektūriniai tyrimai.

### 2.3. Sutarties struktūros ryšys su detalizuotomis kategorijomis

Sutartyje vaizdinės konfigūracijos sprendimas buvo suskaidytas į tris dalis. Žemiau parodoma, kurios detalizuotos kategorijos (A–M) atitinka kiekvieną pirminį sutarties punktą.

**1. Produkto modeliavimas.** *Sutartyje apėmė produkto vizualizaciją trimačiame formate, detalų modeliavimą pagal kliento specifikacijas ir modelio eksportavimo į skirtingus formatus modulio integraciją.* Atitinka kategorijas **A, B, C, D** (iš viso 262 val.).

**2. Produktų vizualizacija.** *Sutartyje apėmė savybių keitimo modulio kūrimą, kur vartotojai gali keisti produkto spalvas, tekstūras ar kitus parametrus ir matyti rezultatus realiu laiku.* Atitinka kategorijas **E, F, I** (iš viso 290 val.).

**3. Duomenų sujungimas su sistemomis.** *Sutartyje apėmė produkto savybių ir specifikacijų keitimo programavimą, tekstinio ir vaizdinio turinio paruošimą bei pritaikymą kiekvienai prekei ir užsakymų valdymo sistemos diegimą.* Atitinka kategorijas **G, H, J, K, L, M** (iš viso 443 val.).

### 2.4. Detalizuotas valandų išskaidymas pagal kategorijas

#### A. 3D geometrijų modeliavimas (35 val.)

| Darbas | Val. | Repo |
|---|---|---|
| Stačiakampio profilio modeliavimas Blenderyje pagal gamintojo brėžinius | 4 | `docs/BLENDER_EXPORT_VARIANTS.md` |
| Rombo profilio modeliavimas, kampuota geometrija, reikėjo koreguoti z-ašies skalę | 5 | `docs/BLENDER_EXPORT_VARIANTS.md` |
| Pusė špunto profilio modeliavimas, sudėtingesnė geometrija su griovelių sistema | 6 | `docs/BLENDER_EXPORT_VARIANTS.md` |
| Pusė špunto 45° variantas, modifikuota geometrija su 45° kampo grioveliu | 4 | `docs/BLENDER_EXPORT_VARIANTS.md` |
| UV mapping visiems 4 profiliams, kiekvieno profilio paviršiai (viršus, šonai, galas, apačia) turi turėti tinkamą tekstūrų išklotinimą | 12 | `docs/BLENDER_EXPORT_VARIANTS.md` |
| Geometrijų patikrinimas, normalių krypčių taisymas, problemų šalinimas prieš eksportą | 4 | `docs/BLENDER_EXPORT_VARIANTS.md` |

#### B. Tekstūrų fotografavimas ir paruošimas (132 val.)

Čia daug laiko, bet reikėjo realias degintų lentų tekstūras nufotografuoti, apdoroti ir paruošti visus žemėlapius 3D rodymui. Tai fizinis darbas su fotoaparatu + vėliau kompiuteryje apdorojimas.

**Proceso sudėtingumas vienai spalvai:** kiekviena iš 22 spalvų buvo fotografuojama kontroliuotu apšvietimu (du difuzoriai, spalvų kalibravimo kortelė), po 3–5 kadrus iš skirtingų kampų; toliau, RAW formato apdorojimas, seamless tile'ų generavimas, spalvų korekcija lyginant su fiziniu medienos pavyzdžiu, keturių žemėlapių (baseColor, roughness, normal, displacement) paruošimas. Tai reiškia ~6 val./spalvai fizinio ir kompiuterinio darbo, be jo 3D modeliai negalėtų realistiškai atkartoti degintos medienos paviršiaus.

| Darbas | Val. | Repo |
|---|---|---|
| Maumedžio 8 spalvų tekstūrų fotografavimas, kiekvieną spalvą reikėjo fotografuoti kontroliuojamomis sąlygomis, koreguoti spalvas, sujungti kadrus | 24 | `public/assets/finishes/larch/`, `public/assets/evaluator/14.2/` |
| Eglės 8 spalvų tekstūrų fotografavimas ir apdorojimas, analogiškas procesas kitai medienai | 24 | `public/assets/finishes/spruce/`, `public/assets/evaluator/14.2/` |
| Thermo medienos 6 spalvų tekstūrų fotografavimas, aukšta rezoliucija, nes thermo tekstūra smulkesnė | 18 | `public/assets/finishes/thermo/`, `public/assets/evaluator/14.2/` |
| Šiurkštumo (roughness) žemėlapių generavimas, 22 spalvoms, dalis reikėjo koreguoti rankiniu būdu | 16 | `public/assets/evaluator/14.2/`, `docs/BLENDER_EXPORT_VARIANTS.md` |
| Normal map žemėlapių generavimas, 22 spalvoms, dalis reikėjo taisyti rankiniu būdu nes automatinis rezultatas netenkino | 20 | `public/assets/evaluator/14.2/`, `docs/BLENDER_EXPORT_VARIANTS.md` |
| Displacement žemėlapių generavimas, 22 spalvoms, geometriniam medienos raštų reljefui | 14 | `public/assets/evaluator/14.2/`, `docs/BLENDER_EXPORT_VARIANTS.md` |
| Tekstūrų optimizavimas, konvertavimas į WebP, dydžio mažinimas, kad greičiau krautųsi naršyklėje | 8 | `public/assets/finishes/`, `docs/BLENDER_EXPORT_VARIANTS.md` |
| AI padidinimas, daliai tekstūrų reikėjo didesnės rezoliucijos, buvo naudotas AI upscaler, o po to kokybė tikrinta rankiniu būdu | 8 | `public/assets/finishes/`, `public/assets/evaluator/14.2/` |

#### C. PBR medžiagų kūrimas Blenderyje (51 val.)

PBR medžiagos, tai kai kiekvienai spalvai Blenderyje sukuri visą „receptą" iš kelių tekstūrų (spalva, šiurkštumas, normalė, reljefas), kad 3D modelyje mediena atrodytų realistiškai.

| Darbas | Val. | Repo |
|---|---|---|
| Pirmojo medžiagos šablono sukūrimas, 14 mazgų grafas Blenderyje, iš kurio vėliau kopijuojamos visos kitos medžiagos | 8 | `docs/BLENDER_EXPORT_VARIANTS.md` |
| Maumedžio 8 spalvų medžiagų konfigūravimas, kiekvienai spalvai priskiriamos 4 tekstūros | 8 | `docs/BLENDER_EXPORT_VARIANTS.md` |
| Eglės 8 spalvų medžiagų konfigūravimas | 6 | `docs/BLENDER_EXPORT_VARIANTS.md` |
| Thermo 6 spalvų medžiagų konfigūravimas, didesnė rezoliucija, atskiras katalogas | 5 | `docs/BLENDER_EXPORT_VARIANTS.md` |
| Specialios medžiagos galo ir apačios paviršiams | 2 | `docs/BLENDER_EXPORT_VARIANTS.md` |
| Medžiagų priskyrimas konkretiems paviršiams, kiekvienam profiliui 18–24 medžiagos | 10 | `docs/BLENDER_EXPORT_VARIANTS.md` |
| Vizualinė kokybės kontrolė, kiekvienos spalvos patikrinimas Blenderyje, lyginimas su fiziniais lentų pavyzdžiais | 12 | `docs/BLENDER_EXPORT_VARIANTS.md` |

#### D. GLB eksporto automatizacija (44 val.)

Buvo 3 medienos tipų × 4 profilių × ~8 spalvų = 139 modelių variantai. Kiekvienas rankinis eksportas reikalauja: atidaryti failą, priskirti tekstūras konkretiems paviršiams, sukonfigūruoti Draco kompresijos parametrus, paleisti eksportą, patikrinti rezultatą ir pervadinti failą pagal konvenciją - tai apie 10–15 min. per variantą, t. y. ~35 val. vien mechaninio darbo. Be to, keičiantis tekstūroms ar parametrams visą procesą reiktų kartoti iš naujo. Todėl buvo parašytas Python skriptas Blenderiui, kuris tai automatizavo ir padarė pakartojamą.

| Darbas | Val. | Repo |
|---|---|---|
| Blender Python skripto kūrimas, automatizuotas GLB eksportas su spalvų keitimu, tekstūrų konversija, Draco kompresija | 16 | `scripts/`, `docs/BLENDER_EXPORT_VARIANTS.md` |
| 139 variantų eksportas, viso 139 GLB failai su teisingomis medžiagomis | 8 | `public/models/` |
| Validacijos įrankis, kad patikrinti ar eksportuoti failai turi visas reikiamas tekstūras | 10 | `scripts/` |
| Index failas, JSON registras kuris susieja produkto slug su GLB failo keliu, kad svetainė žinotų kokį modelį krauti | 4 | `lib/models.ts` |
| Fallback modeliai, 2 generiniai GLB failai rodomi kol konkretus variantas dar kraunasi | 4 | `lib/models.ts` |
| Dokumentacija, eksporto proceso aprašymas, kad galėtum pakartoti | 2 | `docs/BLENDER_EXPORT_VARIANTS.md` |

#### E. Three.js 3D viewer komponentas (125 val.)

Tai komponentas, kuris rodo 3D modelį naršyklėje. Buvo naudota React Three Fiber biblioteka (Three.js React apvalkalas). Daug laiko skirta modelių krovimui, spalvų keitimui, procedūrinių tekstūrų generavimui, WebGL klaidų apdorojimui ir atminties valdymui.

| Darbas | Val. | Repo |
|---|---|---|
| 3D scenos sukūrimas: WebGL kontekstas, perspektyvinė kamera su automatiniu kadravimu, 4 šviesos šaltiniai (ambient, hemisphere, 3× directional), OrbitControls modelio sukiojimui, apsauga nuo serverinio renderinimo | 8 | `components/Konfiguratorius3D.tsx` |
| GLB modelių krovimas su Draco dekompresija ir išankstinio krovimo logika | 12 | `components/Konfiguratorius3D.tsx` |
| Spalvų keitimas, kai vartotojas pasirenka kitą spalvą, kraunamas kitas GLB failas. Jei failo nėra, naudojamas atsarginis režimas: procedūriškai generuojamas geometrijos tinklelis su hex spalva, perduodama į `MeshStandardMaterial` | 10 | `components/Konfiguratorius3D.tsx` |
| Procedūrinė medienos tekstūra: du atskiri Canvas 2D generatoriai - `createLongGrainTexture` (bangoti grūdeliai per `Math.sin`, 90 atsitiktinių mazgų) ir `createEndGrainTexture` (koncentriški augimo žiedai per `ctx.arc`, 120 porų taškų). Unikalumas per `hashStringToSeed(variantKey)` - kiekvienas variantas gauna savo seed'ą | 14 | `components/Konfiguratorius3D.tsx` |
| Medžiagų nustatymai pagal apdailą: `getFinishSurfacePreset()` grąžina skirtingus PBR parametrus - matinė (`roughness: 0.86`), pusiau satininė (`roughness: 0.62`), blizgi (`roughness: 0.42`). Nustatoma automatiškai pagal apdailos pavadinimo tokeną | 8 | `components/Konfiguratorius3D.tsx` |
| Automatinis kameros pozicionavimas, kad modelis visada tilptų ekrane, nesvarbu kokio dydžio | 6 | `components/Konfiguratorius3D.tsx` |
| 3D ekrano fotografavimas, screenshot iš 3D scenos, reikalingas PDF generatoriui | 6 | `components/Konfiguratorius3D.tsx` |
| Suprogramavimas skirtingiems ekranams, mobilus ir desktopas, canvas dydžio keitimas, pikselių tankio valdymas | 6 | `components/Konfiguratorius3D.tsx` |
| Apšvietimo nustatymai, keli šviesos šaltiniai, šešėliai, kad mediena atrodytų natūraliai | 4 | `components/Konfiguratorius3D.tsx` |
| Modelių registras, sistema kuri pagal produkto pavadinimą suranda teisingą GLB failą, su lietuviško->angliško slug vertimo žemėlapiais ir atsarginėmis grandinėmis | 12 | `lib/models.ts` |
| Dinaminis krovimas, 3D komponentas kraunamas tik kai reikia, ne iš karto su visu puslapiu | 4 | `components/Konfiguratorius3D.tsx` |
| WebGL konteksto atkūrimas, kai naršyklė prarado WebGL kontekstą (dažna problema mobiliuose), sistema automatiškai bando atkurti sceną be puslapio perkrovimo | 6 | `components/Konfiguratorius3D.tsx` |
| Atminties valdymas, Three.js objektų (geometrijų, tekstūrų, medžiagų) švarinimas kai vartotojas keičia produktą ar palieka puslapį, kad naršyklė neužsikirstu | 5 | `components/Konfiguratorius3D.tsx` |
| Realaus laiko geometrijos keitimas, kai vartotojas keičia matmenis (plotis, ilgis, storis), modelio geometrija perskaičiuojama programiškai, ne iš naujo kraunama | 8 | `components/Konfiguratorius3D.tsx` |
| Galo tekstūros generavimas, medienos galo (end-grain) tekstūra generuojama procedūriškai, nes ji skiriasi nuo šoninės tekstūros | 6 | `components/Konfiguratorius3D.tsx` |
| Spalvų erdvės konversija, sRGB↔linear konversija tarp Blender ir naršyklės, kad spalvos atitiktų realias lentas | 6 | `components/Konfiguratorius3D.tsx` |
| Lėto tinklo aptikimas, kai aptinkamas 2G/3G ryšys, automatiškai kraunami mažesnės rezoliucijos modeliai ir tekstūros | 4 | `components/Konfiguratorius3D.tsx` |

#### F. Konfigūratoriaus UI / puslapio komponentas (120 val.)

Konfigūratorius, pagrindinis puslapis kur vartotojas renkasi produktą, profilį, spalvą, apdailą ir mato 3D modelį. Daug darbo buvo su UX logika, URL parametrų sinchronizacija, atsargų matrica ir mobilia versija.

| Darbas | Val. | Repo |
|---|---|---|
| Pagrindinis konfigūratoriaus komponentas, visų pasirinkimų valdymas: lentos tipas (terasinė/fasadinė), mediena (maumedis/eglė/termo), profilis (4 variantai), 8 spalvos, pločiai (95/120/145 mm), ilgiai (3000/3300/3600 mm), storiai. Kaina perskaičiuojama kiekvieną kartą kai kas nors pasikeičia | 40 | `components/configurator/useConfiguratorState.ts` |
| Pasirinkimų išsaugojimas, kad vartotojas grįžęs rastų savo pasirinkimus, buvo naudotas Zustand + localStorage. Reikėjo hydration guard kad SSR nestrigtų | 12 | `components/configurator/useConfiguratorState.ts` |
| Preset nuorodos, indeksuojami produkto variantų URL (pvz. /shou-sugi-ban/maumedis-carbon), kad Google galėtų surasti | 4 | `components/configurator/seo.ts` |
| Kliento pusės wrapper, lazy 3D krovimas, hydration apsauga, pasirinkimų grupių rodymas | 6 | `app/konfiguratorius3d/` |
| Serverio pusės komponentas, kalbos aptikimas, breadcrumb navigacija | 2 | `app/konfiguratorius3d/page.tsx` |
| Pasirinkimų grupės komponentas, universalus toggle UI kurį naudoju visiem pasirinkimam | 2 | `components/configurator/` |
| 2D režimas, spalvų peržiūra kai 3D neveikia (seni telefonai) | 3 | `components/configurator/` |
| SEO paveikslėlis, optimizuotas paveikslėlis su meta duomenimis pasidalinimui | 1 | `components/configurator/seo.ts` |
| TypeScript tipai, medienos, spalvos, profilio, apdailos tipų apibrėžimai | 3 | `types/` |
| Mobilios panelės, 9 skirtingos panelės (lentos tipas, profilis, storis, mediena, spalva, plotis, ilgis, produktas, kaina) su animuotais perėjimais. Tai ne automatinis responsive, buvo programuota rankiniu būdu | 8 | `components/configurator/` |
| Atsarginių produktų generavimas, kai realūs produktai neatitinka pasirinktos konfigūracijos, sukuriamas virtualus produktas | 4 | `components/configurator/useConfiguratorState.ts` |
| URL parametrų sinchronizacija su 7 parametrais, kiekvienas konfigūratoriaus pasirinkimas (tipas, mediena, profilis, spalva, plotis, ilgis, storis) sinchronizuojamas su URL, kad nuoroda visada atspindėtų tikslią konfigūraciją. Deep-link palaikymas ir history.replaceState be puslapio perkrovimo | 10 | `components/configurator/useConfiguratorState.ts` |
| Parametrų priklausomybės, kai keičiasi vienas parametras, kiti automatiškai prisitaiko (pvz. pasirinkus „thermo" medieną, spalvų sąrašas susiaurėja iki 6, nes thermo neturi visų spalvų). Neleistinų kombinacijų blokavimas su pranešimais | 8 | `components/configurator/useConfiguratorState.ts` |
| Atsargų matrica konfigūratoriuje, tikrinama ar konkreti spalvos/profilio/matmenų kombinacija yra sandėlyje, ir jei ne, rodomas pranešimas su artimiausia turima alternatyva | 6 | `components/configurator/useConfiguratorState.ts` |
| m²/vienetų perjungiklis, vartotojas gali nurodyti kiekį arba kvadratiniais metrais (pvz. „15 m²"), arba vienetais (pvz. „20 lentų"). Sistema automatiškai konvertuoja tarp jų ir rodo abiejų variantų kainas | 8 | `lib/products/coverage.ts` |
| Konfigūracijos išsaugojimas per checkout, visa konfigūracija (produktas, spalva, profilis, matmenys, kaina) perduodama krepšeliui ir toliau Stripe checkout sesijai, kad po apmokėjimo būtų galima atkurti užsakymo detales | 3 | `lib/cart/store.ts`, `app/api/checkout/route.ts` |

#### G. Kainodaros sistema: API + logika (68 val.)

Kainodara nėra paprasta, kaina priklauso nuo medienos, spalvos, profilio, matmenų, kiekio, ir dar vartotojo tipo (didmenininkas gauna nuolaidą). Visą logiką reikėjo suprogramuoti serveryje, su m²↔lentų konversija ir pakopinėmis nuolaidomis.

| Darbas | Val. | Repo |
|---|---|---|
| Kainų skaičiavimo variklis, apskaičiuoja kainą pagal variantą, matmenis, kiekį (m² arba vnt.), taiko nuolaidas pagal užsakymo dydį. Jei tikslios kainos nėra, naudoja bazinę kainą + koregavimą, dar toliau, seed duomenis | 16 | `lib/pricing/configuration.ts` |
| Kainos API, serverio endpointas kuris grąžina kainą su visomis detalėmis: kaina per m², plotas, kaina per lentą, kiekis, bendra suma. Su validacija ir kešavimu | 6 | `app/api/pricing/quote/route.ts` |
| Kainos užrakinimo API, laikinai fiksuoja kainą kai vartotojas pradeda checkout, kad kaina nepasikeistų perkant. Naudoja tokeną su galiojimo laiku | 14 | `app/api/pricing/lock/route.ts` |
| Kainos tokeno modulis, tokeno generavimas ir tikrinimas | 3 | `lib/pricing/quote-token.ts` |
| Nuolaidos pagal vartotojo tipą, didmenininkams ir montuotojams pritaikomos specialios nuolaidos | 2 | `lib/pricing/roleDiscounts.ts` |
| Ploto skaičiuoklė, konvertuoja m² į pilnas lentas, apskaičiuoja kiek lentų reikia norimam plotui padengti | 10 | `lib/products/coverage.ts` |
| m²->lentų konversija su apvalinimu, kai vartotojas nurodo plotą m², sistema apskaičiuoja kiek pilnų lentų reikia (su atliekų koeficientu 5-10%), rodo kiek m² realiai padengs nupirktos lentos | 8 | `lib/products/coverage.ts` |
| Dvigubas kainos rodymas, konfigūratoriuje ir produkto puslapyje vienu metu rodoma kaina per vieną lentą ir kaina per m², kad vartotojas galėtų palyginti su konkurentais kurie kainuoja skirtingais vienetais | 5 | `components/configurator/useConfiguratorState.ts` |
| Pakopinės nuolaidos, kuo didesnis užsakymas, tuo mažesnė vieneto kaina. Nuolaidų lentelė su slenkstiniais kiekiais ir procentinėmis nuolaidomis, rodoma vartotojui kaip „sutaupysite X% užsakydami daugiau" | 4 | `lib/pricing/configuration.ts` |

#### H. Krepšelio ir checkout integracija (42 val.)

Krepšelis turi atsiminti viską ką vartotojas pasirinko (spalvą, profilį, matmenis, kainą), išsaugoti tarp puslapių, ir galiausiai perduoti viską Stripe mokėjimui. Konfigūracijos kontekstas turi būti išsaugotas per visą pirkimo eigą.

| Darbas | Val. | Repo |
|---|---|---|
| Krepšelio sistema, Zustand store su localStorage, kad krepšelis išliktų tarp puslapių ir po uždarymo. Konfigūracijos kopija su 7 dienų galiojimu. Elementų deduplikacija pagal daug parametrų (spalva, apdaila, matmenys, profilis ir t.t.), jei tas pats produktas su tais pačiais parametrais, didinamas kiekis. Schemos migracijos nuo v0 iki v4. Serverinio krepšelio sinchronizacija | 16 | `lib/cart/store.ts` |
| Stripe checkout, Checkout Session sukūrimas iš krepšelio, prekių eilučių formavimas, nukreipimas po sėkmingo/atšaukto mokėjimo | 12 | `app/api/checkout/route.ts` |
| Krepšelio ir konfigūratoriaus susiejimas, kai spaudžia „pridėti į krepšelį", visos pasirinktos detalės (spalva, apdaila, matmenys, profilis, kainos momentinis vaizdas) perduodamos krepšeliui | 6 | `lib/cart/store.ts`, `components/configurator/` |
| Konfigūracijos išsaugojimas krepšelyje, visa 3D konfigūracija (modelio parametrai, spalva, tekstūra, matmenys) serializuojama ir saugoma kartu su krepšelio elementu, kad vartotojas grįžęs galėtų atkurti tikslų 3D vaizdą | 4 | `lib/cart/store.ts` |
| Krepšelio validacija prieš checkout, tikrinama ar visos prekės vis dar prieinamos, ar kainos nepasikeitė, ar atsargos pakankamos. Jei kažkas pasikeitė, rodomas pranešimas su pakeitimais ir prašoma patvirtinti | 4 | `app/api/checkout/route.ts` |

#### I. PDF / image eksportas (45 val.)

Vartotojas gali atsisiųsti savo konfigūracijos PDF su 3D nuotrauka, kainomis ir visomis detalėmis, pvz. nusiųsti rangovui ar sau pasilaikyti. Taip pat galima sugeneruoti komercinį pasiūlymą ir dalintis konfigūracija per nuorodą.

| Darbas | Val. | Repo |
|---|---|---|
| PDF generatorius, buvo naudota jsPDF biblioteka. PDF turi: 3D ekrano nuotrauką, konfigūracijos lentelę (produktas, spalva su spalviniu kvadratėliu, profilis, matmenys, mediena), kainų suvestinę (per m², per lentą, kiekis, plotas, bendra suma, nuolaida), logotipą, 14 dienų galiojimo pastabą, nuorodą į konfigūraciją ir automatinį failo pavadinimą pagal konfigūraciją (pvz. „yakiwood-maumedis-carbon-120x26-3000mm.pdf") | 23 | `lib/configurator/pdf-generator.ts` |
| Dvikalbis PDF, visas PDF veikia lietuvių ir anglų kalbomis. Reikėjo integruoti NotoSans šriftą kad lietuviškos raidės (ą, č, ę...) veiktų | 6 | `lib/configurator/pdf-generator.ts` |
| PNG/JPG eksportas, galimybė atsisiųsti 3D viewer ekrano nuotrauką kaip paveikslėlį | 4 | `components/Konfiguratorius3D.tsx` |
| Spausdinimo dialogas, spausdinimo funkcija su tinkamu formatavimu | 3 | `lib/configurator/pdf-generator.ts` |
| Komercinis pasiūlymas, PDF su išplėstine informacija (pristatymo sąlygos, mokėjimo terminai, galiojimo laikas), skirtas B2B klientams kurie nori gauti oficialų pasiūlymą su visa reikalinga informacija | 6 | `lib/configurator/pdf-generator.ts` |
| Dalijimosi nuoroda, galimybė sugeneruoti trumpą URL su visa konfigūracija užkoduota parametruose, kad vartotojas galėtų pasidalinti savo konfigūracija su kitu žmogumi | 3 | `components/configurator/useConfiguratorState.ts` |

#### J. Produktų puslapiai su 3D integracija (140 val.)

Produktų puslapiai, tai kur vartotojas mato konkretų produktą, gali perjungti tarp nuotraukų ir 3D modelio, rinktis spalvą, matyti kainas ir dėti į krepšelį. Tai sudėtingiausias UI komponentas projekte, su atsargų matrica, dvigubu kainos rodymu, dvikalbiu akordeonų turiniu ir 3D integracija.

**Kuo produkto puslapis skiriasi nuo konfigūratoriaus (F kategorijos):** tai du skirtingi puslapiai su skirtingais URL ir skirtingais naudojimo scenarijais. Produkto puslapis (`app/produktai/[slug]/page.tsx`) yra katalogo rezultatas, vartotojas ten patenka iš paieškos ar filtrų, mato nuotraukas, aprašymą, specifikacijas, susijusius produktus, informacinius akordeonus (priežiūra, pristatymas, mokėjimas) ir gali greitai pridėti į krepšelį su numatytąja konfigūracija. Konfigūratorius (`app/konfiguratorius3d/page.tsx`) yra atskiras puslapis, į kurį vartotojas patenka paspaudęs „Konfigūruoti", čia jis keičia profilį, matmenis, apdailą realiu laiku 3D scenoje. Abiejuose puslapiuose naudojami kai kurie bendri elementai (atsargų matrica, kainų rodymas), bet logika, layoutas ir komponentų medis yra atskiri.

| Darbas | Val. | Repo |
|---|---|---|
| Produkto detalės puslapis, pilnas puslapis su nuotraukų/3D perjungimu, galerija, tabs, susijusiais produktais. Spalvos pasirinkimas per URL parametrus. Atsargų matrica, tikrinama ar konkreti spalvos/profilio/matmenų kombinacija yra sandėlyje. Dvigubas kainos rodymas (per lentą ir per m²). Dvikalbis informacijos akordeonas (priežiūra, spalvos info, pristatymas, mokėjimas). „Reikia pagalbos?" modalas su kontakto forma | 40 | `components/products/ProductDetailClient.tsx` |
| Produktų sąrašo puslapis, visi produktai su filtrais, rūšiavimu, paieška, grid ir list vaizdais | 32 | `components/products/ProductsPageClient.tsx` |
| Nuotraukų galerija, su miniatiūromis, priartinimu, swipe gestais mobiliame | 10 | `components/products/ProductDetailClient.tsx` |
| Produkto kortelė, kortelė sąraše su kainomis, ženkleliais, hover efektais | 4 | `components/products/` |
| Produkto tabs, skirtukų navigacija: specifikacijos, aprašymas, montavimo instrukcijos | 6 | `components/products/ProductDetailClient.tsx` |
| Montavimo animacija: SVG schema su CSS keyframe animacijomis - lenta įskrenda į vietą (`mount-board-in`), dvi vinys nukrenta (`mount-nail-drop`, 240 ms delay tarp jų), tvirtinimo taškai mirga (`mount-hit-ring`), matmenų žymos atsiranda paskiausiai (`mount-distance-fade`). Ciklas 5,8 s, be JavaScript | 6 | `components/products/InstallationAnimation.tsx`, `app/globals.css` |
| Atsargų rodiklis, rodo ar produktas sandėlyje, baigiasi, ar nėra | 3 | `components/products/ProductDetailClient.tsx` |
| Susiję produktai, sekcija su panašiais produktais pagal kategoriją | 3 | `components/products/ProductDetailClient.tsx` |
| Pradinė produkto puslapio versija, pirmoji iteracija, naudota ankstyvuose kliento peržiūrose ir A/B palyginimuose prieš pereinant prie galutinio `ProductDetailClient` komponento | 8 | `components/ProductDetail.tsx` |
| Produktų duomenų modulis, katalogo duomenys ir jų transformacija | 4 | `data/seed-products.ts` |
| 2D spalvų peržiūra produkto puslapyje, kai vartotojas neturi WebGL palaikymo, produkto spalvos rodomos 2D režimu su fotografijomis vietoj 3D modelio. Perėjimas tarp 2D ir 3D režimų | 6 | `components/products/ProductDetailClient.tsx` |
| Atsargų matricos valdymas, kiekvienai spalvos/profilio/matmenų kombinacijai tikrinama ar prekė sandėlyje. Matrica generuojama iš produktų duomenų ir rodo kurios kombinacijos galimos, kurios baigiasi, kurios negalimos | 8 | `components/products/ProductDetailClient.tsx` |
| Dvigubas kainos rodymas produkto puslapyje, vartotojas mato kainą ir per vieną lentą, ir per m² vienu metu. Kaina atnaujinama kai keičiasi spalva, profilis ar matmenys | 4 | `components/products/ProductDetailClient.tsx` |
| Varianto duomenų struktūra, kiekvienas produkto variantas (spalva × profilis × matmenys) turi savo SKU, kainą, atsargų kiekį, paveikslėlius. Visa ši hierarchija suprogramuota kaip TypeScript tipai su validacija | 6 | `types/`, `data/seed-products.ts` |

#### K. Maršrutizavimas ir puslapiai (30 val.)

| Darbas | Val. | Repo |
|---|---|---|
| Konfigūratoriaus LT puslapis, lietuviškas URL su meta duomenimis | 2 | `app/konfiguratorius3d/page.tsx` |
| Konfigūratoriaus EN puslapis, angliškas URL | 2 | `app/configurator3d/page.tsx` |
| Shou Sugi Ban varianto puslapis, dinaminis puslapis kiekvienam produkto variantui (pvz. /shou-sugi-ban/maumedis-carbon), sugeneruoti statiškai | 4 | `app/shou-sugi-ban/` |
| Produktų puslapiai, lietuviški ir angliški produktų puslapiai su krovimo animacijomis | 3 | `app/produktai/`, `app/products/` |
| Preset SEO puslapiai, kiekvienam populiariam produkto variantui sugeneruotas statinis puslapis su unikalia meta informacija, Open Graph paveikslėliu ir struktūriniais duomenimis (JSON-LD), kad Google indeksuotų kiekvieną variantą atskirai | 5 | `components/configurator/seo.ts`, `app/shou-sugi-ban/` |
| LT↔EN slug žemėlapis, dvikalbė maršrutizacijos sistema, kuri automatiškai konvertuoja tarp lietuviškų ir angliškų URL (pvz. „maumedis-carbon" ↔ „larch-carbon"), kad abu variantai veiktų ir nukreiptų į teisingą puslapį | 4 | `lib/models.ts` |
| Dinaminis varianto maršrutizavimas, kai URL parametrai nurodo konkretų variantą (spalvą, profilį, matmenis), puslapis automatiškai nustato visus konfigūratoriaus parametrus. Jei variantas neegzistuoja, nukreipia į artimiausią galimą variantą su pranešimu | 5 | `app/shou-sugi-ban/`, `components/configurator/` |
| 404 / „artimiausio varianto" logika, kai vartotojas ateina iš Google į nebeegzistuojantį variantą (pvz. pasikeitė slug po refaktoringo), sistema suranda artimiausią galimą variantą ir pasiūlo perėjimą, o ne rodo tuščią klaidos puslapį | 3 | `app/not-found.tsx`, `components/NotFoundTracker.tsx` |
| Dinaminio sitemap generavimas visiems variantams, visos 139 produkto variantų kombinacijos automatiškai įtraukiamos į generuojamą `sitemap.xml`, kad Google indeksuotų kiekvieną atskirai | 2 | `app/sitemap.ts` |

#### L. Testavimas (55 val.)

| Darbas | Val. | Repo |
|---|---|---|
| Konfigūratoriaus unit testai, Jest testai tikrinantys ar pasirinkimų logika veikia teisingai | 8 | `components/configurator/*.test.ts` |
| Preset testai, ar teisingai atpažįstami produkto variantai iš URL | 1 | `components/configurator/*.test.ts` |
| SEO testai, ar teisingai generuojami canonical URL | 1 | `components/configurator/*.test.ts` |
| E2E testai, Playwright automatizuoti testai: 2D/3D perjungimas, pasirinkimų logika, preset nukreipimai | 6 | `e2e/configurator.spec.ts` |
| Rankinis tikrinimas, 4 profilių × 22 spalvinių variantų bazinė matrica sudarė 88 kombinacijas; kiekviena jų buvo vizualiai tikrinama bent dviem vaizdais - mobiliuoju ir darbalaukio, todėl susidarė apie 176, t. y. apie 180 patikrinimų | 16 | Rankinis darbas |
| 3D naršyklių testavimas, kiekviena pagrindinė naršyklė (Chrome, Firefox, Safari, Edge) ir jų mobilios versijos skirtingai implementuoja WebGL. Reikėjo testuoti ar 3D modeliai teisingai rodomi, ar tekstūros kraunasi, ar spalvos atitinka visose naršyklėse | 6 | Rankinis darbas |
| Mobiliųjų įrenginių testavimas, 3D konfigūratorius testuotas realiuose įrenginiuose (iPhone SE, iPhone 14, Samsung Galaxy, iPad). Tikrinta gestų valdymas (sukimas, priartinimas), veikimo sparta, atminties naudojimas, WebGL konteksto stabilumas | 6 | Rankinis darbas |
| Regresijos testavimas, po kiekvieno didesnio pakeitimo (naujo profilio pridėjimas, kainodaros logikos keitimas, UI atnaujinimas) reikėjo pertikrinti ar nesugriovė egzistuojančio funkcionalumo. Apima visą pardavimo kelią nuo konfigūratoriaus iki checkout | 6 | `e2e/` |
| Kainodaros automatiniai testai, testai tikrinantys ar kainos skaičiuojamos teisingai visoms kombinacijoms: skirtingi matmenys, kiekiai, nuolaidos, m²↔lentų konversija, kainos užrakinimas ir atnaujinimas | 5 | `e2e/products.spec.ts` |

#### M. Iteracijos, debug, optimizavimas (108 val.)

Tai valandos kurios nesusideda į konkretų feature, bet be kurių viskas neveiktų, bugų taisymas, greičio optimizavimas, naršyklių suderinamumo tikrinimas, architektūriniai tyrimai ir iteracijos su klientu.

**Kodėl šios valandos nesidubliuoja su A–L kategorijomis:** kategorijose A–L įskaičiuotas tik tiesioginis funkcionalumo kūrimas (pvz. 3D viewer komponento programavimas E kategorijoje, be bendrojo optimizavimo). Čia suskaičiuoti tik cross-cutting darbai, kurie palietė kelias kategorijas iš karto.

Pavyzdžiui, vienas greičio auditas aprėpė 3D viewer, produkto puslapį ir konfigūratoriaus UI vienu metu - tokio darbo negalima priskirti vienai kategorijai. Panašiai vienas kliento peržiūros ciklas dažniausiai generuodavo pakeitimus E (3D viewer elgsena), F (konfigūratoriaus UI panelės) ir J (produkto puslapio integracija) kategorijose tuo pačiu metu: klientas pamatydavo visą srautą iš karto ir komentuodavo kaip visumą, o ne atskirus komponentus. Kiekvienas toks ciklas reikalaudavo koordinuotų pakeitimų keliose vietose, testuojant kad jos veiktų kartu - tai yra atskiras darbas, neįskaičiuotas į atskirų komponentų kategorijas.

Todėl tai atskira apskaitos eilutė, ne dubliavimas.

| Darbas | Val. | Repo |
|---|---|---|
| GLB failų optimizavimas, kompresija, tekstūrų mažinimas, bandymai supaprastinti geometriją kad greičiau krautųsi | 12 | `public/models/`, `scripts/` |
| Greičio profiliavimas, Chrome DevTools matavimas, FPS tikrinimas, atminties nutekėjimų paieška ir taisymas | 8 | `components/Konfiguratorius3D.tsx` |
| WebGL klaidų apdorojimas, atsarginis režimas kai naršyklė nepalaiko WebGL, valdymas kai kontekstas prarandamas | 6 | `components/Konfiguratorius3D.tsx` |
| Spalvų tikslumas, spalvų kalibravimas tarp Blender ir naršyklės (skiriasi spalvų erdvės), lyginimas su realiomis lentomis | 10 | `components/Konfiguratorius3D.tsx` |
| Lazy loading, komponentai kraunami tik kai reikia, bundle dydžio mažinimas, išankstinis 3D modelių krovimas | 6 | `components/Konfiguratorius3D.tsx` |
| Naršyklių testavimas, tikrinimas Chrome, Firefox, Safari, Edge ir mobiliose naršyklėse | 8 | Rankinis darbas |
| Dizaino iteracijos, UI pakeitimai pagal Figma maketą, pixel-perfect koregavimai | 16 | `components/configurator/`, Figma: `ttxSg4wMtXPqfcQEh6B405` |
| Bugų taisymas, medžiagų krovimo klaidos, SSR/kliento nesuderinamumai, localStorage edge cases, hydration problemos, URL sinchronizacijos ciklų prevencija | 16 | `components/`, `lib/` |
| Architektūriniai tyrimai, kokią 3D biblioteką naudoti (Three.js vs Babylon.js vs PlayCanvas), kaip veikia WebGL skirtingose naršyklėse, PBR medžiagų formatų palyginimas, Draco vs Meshopt kompresijos palyginimas, tekstūrų formatų tyrimas (KTX2, Basis). Šie tyrimai vyko prieš pradedant programuoti ir jų rezultatai lėmė architektūrinius sprendimus | 8 | `docs/` |
| Kliento peržiūros ir iteracijos, konfigūratoriaus demonstravimas klientui, grįžtamojo ryšio surinkimas, pakeitimų įgyvendinimas. Per kūrimo laikotarpį buvo ~12 peržiūrų iteracijų, kiekviena su pakeitimų sąrašu (spalvų koregavimai, UI elementų perkėlimas, naujų laukų pridėjimas, mobilios versijos koregavimai) | 10 | `components/configurator/` |
| Prieinamumo (accessibility) užtikrinimas, klaviatūros navigacija konfigūratoriuje, ARIA atributai 3D viewer komponentui, spalvų kontrasto tikrinimas, screen reader palaikymas pasirinkimų skydeliuose | 4 | `components/Konfiguratorius3D.tsx`, `components/configurator/` |
| Produkcijos diegimo testavimas, Vercel diegimo konfigūracija, CDN kešavimo taisyklės 3D modeliams ir tekstūroms, gzip/brotli kompresijos tikrinimas, Core Web Vitals optimizavimas su 3D turinio krovimu | 4 | `next.config.ts`, `docs/DEPLOYMENT.md` |

Modeliavimas ir programavimas čia yra dvi skirtingo pobūdžio, bet tarpusavyje priklausomos darbų dalys. Kategorijos A–D (262 val.) apima fizinį Blender darbą: fotografavimą, PBR medžiagų parengimą ir eksportą. Kategorijos E–M (733 val.) apima WebGL programavimą, būsenos valdymą, kainodarą ir testavimą. Be pirmosios dalies nebūtų ką atvaizduoti, o be antrosios modeliai neveiktų kaip konfigūratorius.

Antra, teiginys apie „vienodą valdymą" yra netikslus. Konfigūratoriuje programiškai generuojamos unikalios medienos tekstūros kiekvienam modeliui, realiu laiku perskaičiuojama geometrija pagal matmenis, sinchronizuojami septyni URL parametrai, valdoma atsargų matrica ir skaičiuojama dviguba kaina (per lentą ir per m²). Mobiliame variante yra 9 atskiros rankiniu būdu suprogramuotos panelės su animacijomis. Tai nėra paprastas 3D modelio rodymas.



