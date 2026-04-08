import type { IAEvidenceSection } from '@/types/ia'

const screenshotRoot = '/assets/evaluator'
const liveSiteUrl = 'https://shop.yakiwood.co.uk'

function liveUrl(path: string) {
  return `${liveSiteUrl}${path}`
}

export const evaluatorEvidenceSections: IAEvidenceSection[] = [
  {
    id: 'punktas-1-1',
    pointLabel: '1.1',
    title: `Analizė ir adaptacija pagal kliento pasirinktus svetainių pavyzdžius`,
    status: `Įdiegta`,
    summary: `Šiame etape atlikta konkurentų ir referencinių svetainių analizė siekiant nustatyti geriausias praktikas degintos medienos produktų ir architektūrinių sprendimų pristatymui internete. Analizuoti šie aspektai: svetainių struktūra ir navigacija, projektų ir produktų katalogų pateikimas, vartotojo kelias (User journey), informacijos blokų išdėstymas ir vizualinė komunikacija. Analizei naudoti šių svetainių pavyzdžiai: sugibanwood.com ir degmeda.eu. Remiantis atlikta analize suformuota optimalios svetainės struktūros koncepcija ir parengti pirminiai informacijos architektūros bei wireframe modeliai.`,
    screenshots: [
      {
        src: `${screenshotRoot}/1.1/konkurento_svetaine_degmeda_eu.jpg`,
        fileName: 'konkurento_svetaine_degmeda_eu.jpg',
        alt: `Analizė ir adaptacija pagal kliento pasirinktus svetainių pavyzdžius - konkurento svetaine degmeda eu`,
        caption: `konkurento svetaine degmeda eu`,
      },
      {
        src: `${screenshotRoot}/1.1/konkurento_svetaine_sugibanwood_com.jpg`,
        fileName: 'konkurento_svetaine_sugibanwood_com.jpg',
        alt: `Analizė ir adaptacija pagal kliento pasirinktus svetainių pavyzdžius - konkurento svetaine sugibanwood com`,
        caption: `konkurento svetaine sugibanwood com`,
      },
      {
        src: `${screenshotRoot}/1.1/konkurentu_analize.jpg`,
        fileName: 'konkurentu_analize.jpg',
        alt: `Analizė ir adaptacija pagal kliento pasirinktus svetainių pavyzdžius - konkurentu analize`,
        caption: `konkurentu analize`,
      },
      {
        src: `${screenshotRoot}/1.1/konkurentu_analizes_suvestine.jpg`,
        fileName: 'konkurentu_analizes_suvestine.jpg',
        alt: `Analizė ir adaptacija pagal kliento pasirinktus svetainių pavyzdžius - konkurentu analizes suvestine`,
        caption: `konkurentu analizes suvestine`,
      },
    ],
  },
  {
    id: 'punktas-1-2',
    pointLabel: '1.2',
    title: `Spalvų paletės, tipografijos ir grafinių sąsajos elementų sistemos kūrimas`,
    status: `Įdiegta`,
    summary: `Parengta svetainės dizaino sistema, apimanti spalvų paletę, tipografiją ir pagrindinius grafinius sąsajos elementus. Nustatytos pagrindinė ir papildomos spalvų schemos, antraščių bei teksto tipografijos hierarchija, mygtukų, navigacijos, įvedimo laukų ir kitų turinio komponentų stilistika. Dizaino elementai sukurti siekiant išlaikyti nuoseklų vartotojo sąsajos stilių visoje svetainėje ir aiškiai pristatyti produktų spalvinius variantus. Nuoroda: Figma UI kit.`,
    screenshots: [
      {
        src: `${screenshotRoot}/1.2/Colors (1).png`,
        fileName: 'Colors (1).png',
        alt: `Spalvų paletės, tipografijos ir grafinių sąsajos elementų sistemos kūrimas - spalvų paletė`,
        caption: `Spalvų paletė`,
      },
      {
        src: `${screenshotRoot}/1.2/Buttons & links (1).png?v=20260319-2`,
        fileName: 'Buttons & links (1).png',
        alt: `Spalvų paletės, tipografijos ir grafinių sąsajos elementų sistemos kūrimas - mygtukų ir nuorodų komponentai`,
        caption: `Mygtukų ir nuorodų komponentai`,
      },
      {
        src: `${screenshotRoot}/1.2/Headers & footer (1).png?v=20260319-2`,
        fileName: 'Headers & footer (1).png',
        alt: `Spalvų paletės, tipografijos ir grafinių sąsajos elementų sistemos kūrimas - antraštės ir poraštės dizainas`,
        caption: `Antraštės ir poraštės dizainas`,
      },
      {
        src: `${screenshotRoot}/1.2/Icons (1).png?v=20260319-2`,
        fileName: 'Icons (1).png',
        alt: `Spalvų paletės, tipografijos ir grafinių sąsajos elementų sistemos kūrimas - ikonų rinkinys`,
        caption: `Ikonų rinkinys`,
      },
      {
        src: `${screenshotRoot}/1.2/Inputs, menu, lists (1).png?v=20260319-2`,
        fileName: 'Inputs, menu, lists (1).png',
        alt: `Spalvų paletės, tipografijos ir grafinių sąsajos elementų sistemos kūrimas - įvedimo laukai, meniu ir sąrašai`,
        caption: `Įvedimo laukai, meniu ir sąrašai`,
      },
      {
        src: `${screenshotRoot}/1.2/Typography (1).png?v=20260319-2`,
        fileName: 'Typography (1).png',
        alt: `Spalvų paletės, tipografijos ir grafinių sąsajos elementų sistemos kūrimas - tipografijos hierarchija`,
        caption: `Tipografijos hierarchija`,
      },
    ],
  },
  {
    id: 'punktas-1-3',
    pointLabel: '1.3',
    title: `Vizualinio stiliaus suderinimas su bendra prekės ženklo identiteto strategija`,
    status: `Įdiegta`,
    summary: `Vizualinis svetainės dizainas suderintas su prekės ženklo identitetu, naudojant logotipo stilistiką, natūralių medžiagų tekstūras ir minimalistinę dizaino kryptį. Parinkti didelio formato vizualai, tamsesnė spalvų paletė ir aiški tipografijos struktūra, atspindinti degintos medienos produktų estetiką ir architektūrinį projekto pobūdį. Nuoroda: Figma dizaino maketai.`,
    screenshots: [
      {
        src: `${screenshotRoot}/1.3/vizualinio_stiliaus_pavyzdys_01.png`,
        fileName: 'vizualinio_stiliaus_pavyzdys_01.png',
        alt: `Vizualinio stiliaus suderinimas su bendra prekės ženklo identiteto strategija - vizualinio stiliaus pavyzdys 01`,
        caption: `vizualinio stiliaus pavyzdys 01`,
      },
      {
        src: `${screenshotRoot}/1.3/vizualinio_stiliaus_pavyzdys_02.png`,
        fileName: 'vizualinio_stiliaus_pavyzdys_02.png',
        alt: `Vizualinio stiliaus suderinimas su bendra prekės ženklo identiteto strategija - vizualinio stiliaus pavyzdys 02`,
        caption: `vizualinio stiliaus pavyzdys 02`,
      },
      {
        src: `${screenshotRoot}/1.3/vizualinio_stiliaus_pavyzdys_03.png`,
        fileName: 'vizualinio_stiliaus_pavyzdys_03.png',
        alt: `Vizualinio stiliaus suderinimas su bendra prekės ženklo identiteto strategija - vizualinio stiliaus pavyzdys 03`,
        caption: `vizualinio stiliaus pavyzdys 03`,
      },
      {
        src: `${screenshotRoot}/1.3/vizualinio_stiliaus_pavyzdys_04.png`,
        fileName: 'vizualinio_stiliaus_pavyzdys_04.png',
        alt: `Vizualinio stiliaus suderinimas su bendra prekės ženklo identiteto strategija - vizualinio stiliaus pavyzdys 04`,
        caption: `vizualinio stiliaus pavyzdys 04`,
      },
      {
        src: `${screenshotRoot}/1.3/vizualinio_stiliaus_pavyzdys_05.png`,
        fileName: 'vizualinio_stiliaus_pavyzdys_05.png',
        alt: `Vizualinio stiliaus suderinimas su bendra prekės ženklo identiteto strategija - vizualinio stiliaus pavyzdys 05`,
        caption: `vizualinio stiliaus pavyzdys 05`,
      },
      {
        src: `${screenshotRoot}/1.3/vizualinio_stiliaus_pavyzdys_06.png`,
        fileName: 'vizualinio_stiliaus_pavyzdys_06.png',
        alt: `Vizualinio stiliaus suderinimas su bendra prekės ženklo identiteto strategija - vizualinio stiliaus pavyzdys 06`,
        caption: `vizualinio stiliaus pavyzdys 06`,
      },
      {
        src: `${screenshotRoot}/1.3/vizualinio_stiliaus_pavyzdys_07.png`,
        fileName: 'vizualinio_stiliaus_pavyzdys_07.png',
        alt: `Vizualinio stiliaus suderinimas su bendra prekės ženklo identiteto strategija - vizualinio stiliaus pavyzdys 07`,
        caption: `vizualinio stiliaus pavyzdys 07`,
      },
      {
        src: `${screenshotRoot}/1.3/vizualinio_stiliaus_pavyzdys_08.png`,
        fileName: 'vizualinio_stiliaus_pavyzdys_08.png',
        alt: `Vizualinio stiliaus suderinimas su bendra prekės ženklo identiteto strategija - vizualinio stiliaus pavyzdys 08`,
        caption: `vizualinio stiliaus pavyzdys 08`,
      },
      {
        src: `${screenshotRoot}/1.3/vizualinio_stiliaus_pavyzdys_09.png`,
        fileName: 'vizualinio_stiliaus_pavyzdys_09.png',
        alt: `Vizualinio stiliaus suderinimas su bendra prekės ženklo identiteto strategija - vizualinio stiliaus pavyzdys 09`,
        caption: `vizualinio stiliaus pavyzdys 09`,
      },
      {
        src: `${screenshotRoot}/1.3/vizualinio_stiliaus_pavyzdys_10.png`,
        fileName: 'vizualinio_stiliaus_pavyzdys_10.png',
        alt: `Vizualinio stiliaus suderinimas su bendra prekės ženklo identiteto strategija - vizualinio stiliaus pavyzdys 10`,
        caption: `vizualinio stiliaus pavyzdys 10`,
      },
      {
        src: `${screenshotRoot}/1.3/vizualinio_stiliaus_pavyzdys_11.png`,
        fileName: 'vizualinio_stiliaus_pavyzdys_11.png',
        alt: `Vizualinio stiliaus suderinimas su bendra prekės ženklo identiteto strategija - vizualinio stiliaus pavyzdys 11`,
        caption: `vizualinio stiliaus pavyzdys 11`,
      },
      {
        src: `${screenshotRoot}/1.3/vizualinio_stiliaus_pavyzdys_12.png`,
        fileName: 'vizualinio_stiliaus_pavyzdys_12.png',
        alt: `Vizualinio stiliaus suderinimas su bendra prekės ženklo identiteto strategija - vizualinio stiliaus pavyzdys 12`,
        caption: `vizualinio stiliaus pavyzdys 12`,
      },
    ],
  },
  {
    id: 'punktas-2-1',
    pointLabel: '2.1',
    title: `Svetainės dizaino adaptacija mobiliems telefonams ir planšetėms`,
    status: `Įdiegta`,
    summary: `Svetainės dizainas pritaikytas mobiliems telefonams ir planšetėms, taikant responsive išdėstymo logiką pagrindiniuose vartotojo sąsajos komponentuose. Produktų katalogo puslapis patikrintas desktop, planšetės ir mobiliojo telefono rezoliucijose, kuriose prisitaiko turinio plotis, navigacijos elgsena, elementų tarpai ir vidinių blokų išdėstymas. Responsive logika realizuota naudojant Tailwind breakpoint klases ir atskiras mobilių bei didesnių ekranų išdėstymo taisykles.`,
    screenshots: [
      {
        src: `${screenshotRoot}/2.1/mobilus_puslapio_vaizdas_03_su_url.png`,
        fileName: 'mobilus_puslapio_vaizdas_03_su_url.png',
        alt: `Svetainės dizaino adaptacija mobiliems telefonams ir planšetėms - mobilus puslapio vaizdas 03 su url`,
        caption: `mobilus puslapio vaizdas 03 su url`,
      },
      {
        src: `${screenshotRoot}/2.1/mobilus_puslapio_vaizdas_04_su_url.png`,
        fileName: 'mobilus_puslapio_vaizdas_04_su_url.png',
        alt: `Svetainės dizaino adaptacija mobiliems telefonams ir planšetėms - mobilus puslapio vaizdas 04 su url`,
        caption: `mobilus puslapio vaizdas 04 su url`,
      },
      {
        src: `${screenshotRoot}/2.1/platesnio_ekrano_puslapio_vaizdas_01_su_url.png`,
        fileName: 'platesnio_ekrano_puslapio_vaizdas_01_su_url.png',
        alt: `Svetainės dizaino adaptacija mobiliems telefonams ir planšetėms - platesnio ekrano puslapio vaizdas 01 su url`,
        caption: `platesnio ekrano puslapio vaizdas 01 su url`,
      },
      {
        src: `${screenshotRoot}/2.1/platesnio_ekrano_puslapio_vaizdas_02_su_url.png`,
        fileName: 'platesnio_ekrano_puslapio_vaizdas_02_su_url.png',
        alt: `Svetainės dizaino adaptacija mobiliems telefonams ir planšetėms - platesnio ekrano puslapio vaizdas 02 su url`,
        caption: `platesnio ekrano puslapio vaizdas 02 su url`,
      },
      {
        src: `${screenshotRoot}/2.1/prisitaikantis_desktop_vaizdas_01.png`,
        fileName: 'prisitaikantis_desktop_vaizdas_01.png',
        alt: `Svetainės dizaino adaptacija mobiliems telefonams ir planšetėms - prisitaikantis desktop vaizdas 01`,
        caption: `prisitaikantis desktop vaizdas 01`,
      },
      {
        src: `${screenshotRoot}/2.1/prisitaikantis_mobilus_vaizdas_01.png`,
        fileName: 'prisitaikantis_mobilus_vaizdas_01.png',
        alt: `Svetainės dizaino adaptacija mobiliems telefonams ir planšetėms - prisitaikantis mobilus vaizdas 01`,
        caption: `prisitaikantis mobilus vaizdas 01`,
      },
      {
        src: `${screenshotRoot}/2.1/prisitaikantis_plansetes_vaizdas_01.png`,
        fileName: 'prisitaikantis_plansetes_vaizdas_01.png',
        alt: `Svetainės dizaino adaptacija mobiliems telefonams ir planšetėms - prisitaikantis plansetes vaizdas 01`,
        caption: `prisitaikantis plansetes vaizdas 01`,
      },
      {
        src: `${screenshotRoot}/2.1/responsive_breakpointu_kodo_pavyzdys_01.png`,
        fileName: 'responsive_breakpointu_kodo_pavyzdys_01.png',
        alt: `Svetainės dizaino adaptacija mobiliems telefonams ir planšetėms - responsive breakpointu kodo pavyzdys 01`,
        caption: `responsive breakpointu kodo pavyzdys 01`,
      },
    ],
  },
  {
    id: 'punktas-2-2',
    pointLabel: '2.2',
    title: `Testavimas įvairiose platformose ir naršyklėse`,
    status: `Įdiegta`,
    summary: `Svetainė testuota skirtingose naršyklėse ir ekranų tipuose, vertinant puslapio atvaizdavimą, išsidėstymo stabilumą ir vizualinį suderinamumą. Papildomai užfiksuoti Chrome ir Edge naršyklių pavyzdžiai planšetės bei mobiliojo įrenginio kontekste.`,
    screenshots: [
      {
        src: `${screenshotRoot}/2.2/chrome_plansetes_narsykles_testavimo_pavyzdys_01.png`,
        fileName: 'chrome_plansetes_narsykles_testavimo_pavyzdys_01.png',
        alt: `Testavimas įvairiose platformose ir naršyklėse - Chrome planšetės naršyklės testavimo pavyzdys 01`,
        caption: `Chrome planšetės naršyklės testavimo pavyzdys 01`,
      },
      {
        src: `${screenshotRoot}/2.2/edge_mobiliojo_narsykles_testavimo_pavyzdys_01.png`,
        fileName: 'edge_mobiliojo_narsykles_testavimo_pavyzdys_01.png',
        alt: `Testavimas įvairiose platformose ir naršyklėse - Edge mobiliojo naršyklės testavimo pavyzdys 01`,
        caption: `Edge mobiliojo naršyklės testavimo pavyzdys 01`,
      },
      {
        src: `${screenshotRoot}/2.2/edge_plansetes_narsykles_testavimo_pavyzdys_01.png`,
        fileName: 'edge_plansetes_narsykles_testavimo_pavyzdys_01.png',
        alt: `Testavimas įvairiose platformose ir naršyklėse - Edge planšetės naršyklės testavimo pavyzdys 01`,
        caption: `Edge planšetės naršyklės testavimo pavyzdys 01`,
      },
    ],
  },
  {
    id: 'punktas-3-1',
    pointLabel: '3.1',
    title: `Meniu, antraščių, ir kitų puslapio elementų organizavimas`,
    status: `Įdiegta`,
    summary: `Svetainėje nuosekliai suorganizuoti pagrindiniai vartotojo sąsajos elementai: viršutinis meniu, puslapių antraštės, turinio blokai ir poraštė. Puslapio karkasas formuojamas per bendrą komponentinę struktūrą, kuri užtikrina vienodą Header, turinio zonos ir Footer išdėstymą visuose puslapiuose. Navigacijos meniu generuojamas centralizuotai, o puslapio elementų hierarchija išlaikoma aiški tiek pagrindiniuose, tiek vidiniuose svetainės puslapiuose.`,
    screenshots: [
      {
        src: `${screenshotRoot}/3.1/puslapio_strukturos_pavyzdys_01.png`,
        fileName: 'puslapio_strukturos_pavyzdys_01.png',
        alt: `Meniu, antraščių ir kitų puslapio elementų organizavimo pavyzdys 01`,
        caption: `Meniu, antraščių ir puslapio elementų organizavimo pavyzdys 01`,
      },
      {
        src: `${screenshotRoot}/3.1/puslapio_strukturos_pavyzdys_02.png`,
        fileName: 'puslapio_strukturos_pavyzdys_02.png',
        alt: `Meniu, antraščių ir kitų puslapio elementų organizavimo pavyzdys 02`,
        caption: `Meniu, antraščių ir puslapio elementų organizavimo pavyzdys 02`,
      },
      {
        src: `${screenshotRoot}/3.1/puslapio_strukturos_pavyzdys_03.png`,
        fileName: 'puslapio_strukturos_pavyzdys_03.png',
        alt: `Meniu, antraščių ir kitų puslapio elementų organizavimo pavyzdys 03`,
        caption: `Meniu, antraščių ir puslapio elementų organizavimo pavyzdys 03`,
      },
      {
        src: `${screenshotRoot}/3.1/puslapio_strukturos_pavyzdys_04.png`,
        fileName: 'puslapio_strukturos_pavyzdys_04.png',
        alt: `Meniu, antraščių ir kitų puslapio elementų organizavimo pavyzdys 04`,
        caption: `Meniu, antraščių ir puslapio elementų organizavimo pavyzdys 04`,
      },
      {
        src: `${screenshotRoot}/3.1/puslapio_strukturos_pavyzdys_05.png`,
        fileName: 'puslapio_strukturos_pavyzdys_05.png',
        alt: `Meniu, antraščių ir kitų puslapio elementų organizavimo pavyzdys 05`,
        caption: `Meniu, antraščių ir puslapio elementų organizavimo pavyzdys 05`,
      },
      {
        src: `${screenshotRoot}/3.1/puslapio_strukturos_pavyzdys_06.png`,
        fileName: 'puslapio_strukturos_pavyzdys_06.png',
        alt: `Meniu, antraščių ir kitų puslapio elementų organizavimo pavyzdys 06`,
        caption: `Meniu, antraščių ir puslapio elementų organizavimo pavyzdys 06`,
      },
      {
        src: `${screenshotRoot}/3.1/puslapio_strukturos_pavyzdys_07.png`,
        fileName: 'puslapio_strukturos_pavyzdys_07.png',
        alt: `Meniu, antraščių ir kitų puslapio elementų organizavimo pavyzdys 07`,
        caption: `Meniu, antraščių ir puslapio elementų organizavimo pavyzdys 07`,
      },
      {
        src: `${screenshotRoot}/3.1/puslapio_strukturos_pavyzdys_08.png`,
        fileName: 'puslapio_strukturos_pavyzdys_08.png',
        alt: `Meniu, antraščių ir kitų puslapio elementų organizavimo pavyzdys 08`,
        caption: `Meniu, antraščių ir puslapio elementų organizavimo pavyzdys 08`,
      },
    ],
  },
  {
    id: 'punktas-3-2',
    pointLabel: '3.2',
    title: `Svetainės navigacijos kūrimas ir optimizavimas`,
    status: `Įdiegta`,
    summary: `Svetainės navigacija optimizuota naudojant programiškai generuojamą robots.txt konfigūraciją per Next.js MetadataRoute funkcionalumą. Robots taisyklės leidžia paieškos sistemoms indeksuoti viešus puslapius, tuo pačiu blokuojant administravimo, vartotojų paskyros ir užsakymo puslapius. Taip užtikrinamas optimalus svetainės indeksavimas bei apsaugomi vidiniai sistemos moduliai.`,
    screenshots: [
      {
        src: `${screenshotRoot}/3.2/navigacijos_optimizavimo_pavyzdys_01.png`,
        fileName: 'navigacijos_optimizavimo_pavyzdys_01.png',
        alt: `Svetainės navigacijos kūrimas ir optimizavimas - navigacijos optimizavimo pavyzdys 01`,
        caption: `navigacijos optimizavimo pavyzdys 01`,
      },
      {
        src: `${screenshotRoot}/3.2/navigacijos_optimizavimo_pavyzdys_02.png`,
        fileName: 'navigacijos_optimizavimo_pavyzdys_02.png',
        alt: `Svetainės navigacijos kūrimas ir optimizavimas - navigacijos optimizavimo pavyzdys 02`,
        caption: `navigacijos optimizavimo pavyzdys 02`,
      },
      {
        src: `${screenshotRoot}/3.2/navigacijos_optimizavimo_pavyzdys_03.png`,
        fileName: 'navigacijos_optimizavimo_pavyzdys_03.png',
        alt: `Svetainės navigacijos kūrimas ir optimizavimas - navigacijos optimizavimo pavyzdys 03`,
        caption: `navigacijos optimizavimo pavyzdys 03`,
      },
    ],
  },
  {
    id: 'punktas-3-3',
    pointLabel: '3.3',
    title: `Interaktyvių elementų kūrimas`,
    status: `Įdiegta`,
    summary: `Svetainėje įgyvendinti interaktyvūs vartotojo sąsajos komponentai naudojant React ir Next.js komponentinę architektūrą. Interaktyvumas realizuotas taikant useState ir useEffect mechanizmus, leidžiančius dinamiškai valdyti vartotojo veiksmus ir atvaizduojamą turinį. Projektų puslapiuose integruota nuotraukų galerija su navigacijos rodyklėmis, kuri leidžia vartotojui perjungti projekto vaizdus be puslapio perkrovimo. Produktų puslapiuose naudojama išplėstinė vaizdų galerija su didinimo funkcija ir klaviatūros navigacija. Taip pat sukurti pakartotinai naudojami komponentai, tokie kaip akordeono tipo informacijos blokai ir dinaminės produktų kortelės, leidžiančios efektyviai valdyti turinio atvaizdavimą bei užtikrinti vienodą sąsajos veikimą visoje svetainėje.`,
    screenshots: [
      {
        src: `${screenshotRoot}/3.3/interaktyviu_elementu_kodas.png`,
        fileName: 'interaktyviu_elementu_kodas.png',
        alt: `Interaktyvių elementų kūrimas - interaktyviu elementu kodas`,
        caption: `interaktyviu elementu kodas`,
      },
      {
        src: `${screenshotRoot}/3.3/interaktyviu_elementu_saja.png`,
        fileName: 'interaktyviu_elementu_saja.png',
        alt: `Interaktyvių elementų kūrimas - interaktyviu elementu saja`,
        caption: `interaktyviu elementu saja`,
      },
    ],
    evidenceGroups: [
      {
        title: `Akordeonas`,
        description: `Ši grupė atitinka ataskaitos 3.3 aplanke esantį „Akordeonas“ bloką. Čia pateikti interaktyvių išskleidžiamų informacijos blokų pavyzdžiai, kuriuos vartotojas gali atverti ir suskleisti neperkraudamas puslapio.`,
        uiLinks: [
          {
            label: `Atidaryti pagrindinį puslapį`,
            href: `https://shop.yakiwood.co.uk`,
          },
        ],
        screenshots: [
          {
            src: `${screenshotRoot}/3.3/akordeonas/Ekrano kopija 2026-03-15 131813.png`,
            fileName: 'akordeono_sasajos_pavyzdys_01.png',
            alt: `Interaktyvių elementų kūrimas - akordeono sąsajos pavyzdys 01`,
            caption: `Akordeono sąsajos pavyzdys 01`,
          },
          {
            src: `${screenshotRoot}/3.3/akordeonas/Ekrano kopija 2026-03-15 131841.png`,
            fileName: 'akordeono_sasajos_pavyzdys_02.png',
            alt: `Interaktyvių elementų kūrimas - akordeono sąsajos pavyzdys 02`,
            caption: `Akordeono sąsajos pavyzdys 02`,
          },
          {
            src: `${screenshotRoot}/3.3/akordeonas/Ekrano kopija 2026-03-15 131853.png`,
            fileName: 'akordeono_sasajos_pavyzdys_03.png',
            alt: `Interaktyvių elementų kūrimas - akordeono sąsajos pavyzdys 03`,
            caption: `Akordeono sąsajos pavyzdys 03`,
          },
        ],
      },
      {
        title: `Galerija`,
        description: `Ši grupė atitinka ataskaitos 3.3 aplanke esantį „galerija“ bloką. Čia pateikti interaktyvios vaizdų galerijos pavyzdžiai, kai vartotojas gali peržiūrėti skirtingus projekto ar turinio vaizdus tame pačiame puslapyje.`,
        uiLinks: [
          {
            label: `Atidaryti projekto puslapį`,
            href: `https://shop.yakiwood.co.uk/projektai/leliju-apartments`,
          },
        ],
        screenshots: [
          {
            src: `${screenshotRoot}/3.3/galerija/Ekrano kopija 2026-03-15 162028.png`,
            fileName: 'galerijos_sasajos_pavyzdys_01.png',
            alt: `Interaktyvių elementų kūrimas - galerijos sąsajos pavyzdys 01`,
            caption: `Galerijos sąsajos pavyzdys 01`,
          },
          {
            src: `${screenshotRoot}/3.3/galerija/Ekrano kopija 2026-03-15 165914.png`,
            fileName: 'galerijos_sasajos_pavyzdys_02.png',
            alt: `Interaktyvių elementų kūrimas - galerijos sąsajos pavyzdys 02`,
            caption: `Galerijos sąsajos pavyzdys 02`,
          },
          {
            src: `${screenshotRoot}/3.3/galerija/Ekrano kopija 2026-03-15 170916.png`,
            fileName: 'galerijos_sasajos_pavyzdys_03.png',
            alt: `Interaktyvių elementų kūrimas - galerijos sąsajos pavyzdys 03`,
            caption: `Galerijos sąsajos pavyzdys 03`,
          },
        ],
      },
      {
        title: `Slaideris`,
        description: `Ši grupė atitinka ataskaitos 3.3 aplanke esantį „Slaideris“ bloką. Čia pateikti slankiojančių vaizdų ir perjungiamų ekranų pavyzdžiai, kai vartotojas juda per turinį seka po sekos.`,
        uiLinks: [
          {
            label: `Atidaryti pagrindinį puslapį`,
            href: `https://shop.yakiwood.co.uk`,
          },
        ],
        screenshots: [
          {
            src: `${screenshotRoot}/3.3/slaideris/Ekrano kopija 2026-03-15 155058.png`,
            fileName: 'slaiderio_sasajos_pavyzdys_01.png',
            alt: `Interaktyvių elementų kūrimas - slaiderio sąsajos pavyzdys 01`,
            caption: `Slaiderio sąsajos pavyzdys 01`,
          },
          {
            src: `${screenshotRoot}/3.3/slaideris/Ekrano kopija 2026-03-15 170314.png`,
            fileName: 'slaiderio_sasajos_pavyzdys_02.png',
            alt: `Interaktyvių elementų kūrimas - slaiderio sąsajos pavyzdys 02`,
            caption: `Slaiderio sąsajos pavyzdys 02`,
          },
          {
            src: `${screenshotRoot}/3.3/slaideris/Ekrano kopija 2026-03-15 171115.png`,
            fileName: 'slaiderio_sasajos_pavyzdys_03.png',
            alt: `Interaktyvių elementų kūrimas - slaiderio sąsajos pavyzdys 03`,
            caption: `Slaiderio sąsajos pavyzdys 03`,
          },
        ],
      },
    ],
  },
  {
    id: 'punktas-3-4',
    pointLabel: '3.4',
    title: `Puslapio programavimo darbai`,
    status: `Įdiegta`,
    summary: `Svetainės puslapiuose įgyvendintas dinaminis turinio atvaizdavimas naudojant React ir Next.js komponentus. Produktų ir projektų informacija generuojama iš duomenų struktūrų, kurios perduodamos komponentams kaip parametrai (props). Produktų sąrašo puslapyje naudojami klientinės pusės komponentai, atsakingi už duomenų užkrovimą, filtravimo logiką ir produktų kortelių generavimą. Dinaminės produktų kortelės automatiškai atvaizduoja produkto pavadinimą, atributus, spalvų variantus ir kitą susijusią informaciją. Komponentų veikimas optimizuotas naudojant useMemo, useState ir useEffect mechanizmus, leidžiančius efektyviai apdoroti duomenis ir atnaujinti vartotojo sąsają tik pasikeitus reikšmėms. Toks sprendimas leidžia centralizuotai valdyti turinį, sumažina kodo pasikartojimą ir užtikrina sklandų puslapių veikimą. Puslapio programavimo pavyzdžiai pateikti`,
    screenshots: [
      {
        src: `${screenshotRoot}/3.4/dinamines_produktu_korteles_komponento_programavimo_pavyzdys_productcard.png`,
        fileName: 'dinamines_produktu_korteles_komponento_programavimo_pavyzdys_productcard.png',
        alt: `Puslapio programavimo darbai - dinamines produktu korteles komponento programavimo pavyzdys productcard`,
        caption: `dinamines produktu korteles komponento programavimo pavyzdys productcard`,
      },
      {
        src: `${screenshotRoot}/3.4/produktu_puslapio_kliento_komponento_programavimo_pavyzdys_productspageclient.png`,
        fileName: 'produktu_puslapio_kliento_komponento_programavimo_pavyzdys_productspageclient.png',
        alt: `Puslapio programavimo darbai - produktu puslapio kliento komponento programavimo pavyzdys productspageclient`,
        caption: `produktu puslapio kliento komponento programavimo pavyzdys productspageclient`,
      },
    ],
  },
  {
    id: 'punktas-4-1',
    pointLabel: '4.1',
    title: `Pardavimų procesų įdiegimas, automatizavimas ir optimizavimas`,
    status: `Įdiegta`,
    summary: `Pardavimo procesas svetainėje įgyvendintas naudojant React ir Next.js
komponentus. Atsiskaitymo puslapyje renkami kliento kontaktiniai ir
pristatymo duomenys, automatiškai apskaičiuojama užsakymo suma ir
pristatymo kaina. Užsakymas sukuriamas siunčiant duomenis į serverio API maršrutą, kur perduodama informacija apie pasirinktus produktus, jų kiekius, kliento kontaktinius duomenis bei pristatymo adresą. Sistema taip pat automatiškai apskaičiuoja tarpinę sumą (subtotal),
pristatymo kainą ir galutinę užsakymo vertę.`,
    screenshots: [
      {
        src: `${screenshotRoot}/4.1/atsiskaitymo_puslapio_duomenu_ivedimo_formos_programinis_fragmentas.png`,
        fileName: 'atsiskaitymo_puslapio_duomenu_ivedimo_formos_programinis_fragmentas.png',
        alt: `Pardavimų procesų įdiegimas, automatizavimas ir optimizavimas - atsiskaitymo puslapio duomenu ivedimo formos programinis fragmentas`,
        caption: `atsiskaitymo puslapio duomenu ivedimo formos programinis fragmentas`,
      },
      {
        src: `${screenshotRoot}/4.1/atsiskaitymo_puslapio_krepselio_duomenu_apdorojimo_ir_uzsakymo_sumos_skaiciavimo_fragmentas.png`,
        fileName: 'atsiskaitymo_puslapio_krepselio_duomenu_apdorojimo_ir_uzsakymo_sumos_skaiciavimo_fragmentas.png',
        alt: `Pardavimų procesų įdiegimas, automatizavimas ir optimizavimas - atsiskaitymo puslapio krepselio duomenu apdorojimo ir uzsakymo sumos skaiciavimo fragmentas`,
        caption: `atsiskaitymo puslapio krepselio duomenu apdorojimo ir uzsakymo sumos skaiciavimo fragmentas`,
      },
      {
        src: `${screenshotRoot}/4.1/uzsakymo_kurimo_logika_atsiskaitymo_puslapyje_checkout_funkcija.png`,
        fileName: 'uzsakymo_kurimo_logika_atsiskaitymo_puslapyje_checkout_funkcija.png',
        alt: `Pardavimų procesų įdiegimas, automatizavimas ir optimizavimas - uzsakymo kurimo logika atsiskaitymo puslapyje checkout funkcija`,
        caption: `uzsakymo kurimo logika atsiskaitymo puslapyje checkout funkcija`,
      },
    ],
  },
  {
    id: 'punktas-4-2',
    pointLabel: '4.2',
    title: `Automatinis prekių atsargų valdymo diegimas`,
    status: `Įdiegta`,
    summary: `Sistemoje įdiegtas prekių atsargų valdymo modulis, leidžiantis administratoriui stebėti ir valdyti sandėlio likučius. Administravimo aplinkoje pateikiama informacija apie turimą prekių kiekį, rezervuotą kiekį, parduotą kiekį bei produkto statusą. Sistema leidžia greitai papildyti atsargas, redaguoti produktų duomenis bei stebėti bendrą sandėlio būklę.`,
    uiLinks: [
      {
        label: `Atidaryti atsargų modulį`,
        href: liveUrl('/lt/administravimas/atsargos'),
      },
    ],
    screenshots: [
      {
        src: `${screenshotRoot}/4.2/atsargu_valdymo_kodas.png`,
        fileName: 'atsargu_valdymo_kodas.png',
        alt: `Automatinis prekių atsargų valdymo diegimas - atsargų valdymo logikos kodas`,
        caption: `Atsargų valdymo logikos kodas`,
      },
      {
        src: `${screenshotRoot}/4.2/atsargu_valdymo_saja.png`,
        fileName: 'atsargu_valdymo_saja.png',
        alt: `Automatinis prekių atsargų valdymo diegimas - atsargų valdymo administravimo sąsaja`,
        caption: `Atsargų valdymo administravimo sąsaja`,
      },
    ],
  },
  {
    id: 'punktas-4-3',
    pointLabel: '4.3',
    title: `Prekių krepšelio, kiekių skaičiavimo ir užsakymo puslapių kūrimas`,
    status: `Įdiegta`,
    summary: `Svetainėje įdiegtas prekių krepšelio ir užsakymo pateikimo modulis, leidžiantis vartotojui valdyti pasirinktus produktus ir pateikti užsakymą. Produktai į krepšelį gali būti dedami tiek pagal plotą m², tiek pagal vienetus, o sistema automatiškai perskaičiuoja kiekius, tarpines eilutės sumas ir bendrą užsakymo vertę. Prekių krepšelio puslapyje pateikiama informacija apie pasirinktus produktus, jų kiekius, kainas ir automatiškai apskaičiuojamą bendrą sumą. Užsakymo pateikimo (checkout) puslapyje vartotojas įveda kontaktinius ir pristatymo duomenis, po kurių užsakymo informacija perduodama į serverio API maršrutą, kur sukuriamas užsakymo įrašas ir inicijuojamas mokėjimo procesas.`,
    uiLinks: [
      {
        label: `Atidaryti produktų katalogą`,
        href: liveUrl('/lt/produktai'),
      },
      {
        label: `Atidaryti checkout`,
        href: liveUrl('/checkout'),
      },
    ],
    screenshots: [
      {
        src: `${screenshotRoot}/4.3/krepselio_busenos_isaugojimo_narsykleje_kodas.png`,
        fileName: 'krepselio_busenos_isaugojimo_narsykleje_kodas.png',
        alt: `Prekių krepšelio, kiekių skaičiavimo ir užsakymo puslapių kūrimas - krepšelio būsenos išsaugojimo naršyklėje kodas`,
        caption: `Krepšelio būsenos išsaugojimo naršyklėje kodas`,
      },
      {
        src: `${screenshotRoot}/4.3/prekes_pridejimo_i_krepseli_funkcijos_kodas.png`,
        fileName: 'prekes_pridejimo_i_krepseli_funkcijos_kodas.png',
        alt: `Prekių krepšelio, kiekių skaičiavimo ir užsakymo puslapių kūrimas - prekių pridėjimo į krepšelį ir kiekių perskaičiavimo funkcijos kodas`,
        caption: `Prekių pridėjimo į krepšelį ir kiekių perskaičiavimo funkcijos kodas`,
      },
      {
        src: `${screenshotRoot}/4.3/krepselio_perziuros_lango_saja.png`,
        fileName: 'krepselio_perziuros_lango_saja.png',
        alt: `Prekių krepšelio, kiekių skaičiavimo ir užsakymo puslapių kūrimas - krepšelio peržiūros lango sąsaja`,
        caption: `Krepšelio peržiūros lango sąsaja`,
      },
      {
        src: `${screenshotRoot}/4.3/atsiskaitymo_puslapio_saja.png`,
        fileName: 'atsiskaitymo_puslapio_saja.png',
        alt: `Prekių krepšelio, kiekių skaičiavimo ir užsakymo puslapių kūrimas - atsiskaitymo puslapio sąsaja`,
        caption: `Atsiskaitymo puslapio sąsaja`,
      },
    ],
  },
  {
    id: 'punktas-5-1',
    pointLabel: '5.1',
    title: `Paieškos rezultatų kūrimas ir programavimas`,
    status: `Įdiegta`,
    summary: `Svetainėje įdiegtas tekstinės produktų paieškos funkcionalumas, leidžiantis vartotojui greitai rasti norimus produktus pagal įvestą raktažodį. Produktų katalogo puslapyje naudojamas paieškos laukas, kurio reikšmė valdoma React būsenos kintamuoju (searchQuery). Vartotojui įvedus paieškos frazę, sistema realiu laiku filtruoja produktų sąrašą pagal produkto pavadinimą ir susijusius atributus, taikant teksto normalizavimą (toLowerCase) ir dalinio atitikimo tikrinimą (includes). Filtruoti rezultatai dinamiškai atvaizduojami produktų katalogo puslapyje, o neradus atitikmenų rodoma atskira tuščios būsenos žinutė. Toks sprendimas leidžia pagerinti vartotojo patirtį ir paspartina reikiamų produktų paiešką didesniame prekių kataloge.`,
    uiLinks: [
      {
        label: `Atidaryti produktų katalogą`,
        href: liveUrl('/lt/produktai'),
      },
    ],
    screenshots: [
      {
        src: `${screenshotRoot}/5.1/produktu_paieskos_rezultatu_saja.png`,
        fileName: 'produktu_paieskos_rezultatu_saja.png',
        alt: `Paieškos rezultatų kūrimas ir programavimas - produktu paieskos rezultatu saja`,
        caption: `produktu paieskos rezultatu saja`,
      },
      {
        src: `${screenshotRoot}/5.1/tekstines_paieskos_filtravimo_logikos_kodas_01.png`,
        fileName: 'tekstines_paieskos_filtravimo_logikos_kodas_01.png',
        alt: `Paieškos rezultatų kūrimas ir programavimas - tekstines paieskos filtravimo logikos kodas 01`,
        caption: `tekstines paieskos filtravimo logikos kodas 01`,
      },
      {
        src: `${screenshotRoot}/5.1/tekstines_paieskos_filtravimo_logikos_kodas_02.png`,
        fileName: 'tekstines_paieskos_filtravimo_logikos_kodas_02.png',
        alt: `Paieškos rezultatų kūrimas ir programavimas - tekstines paieskos filtravimo logikos kodas 02`,
        caption: `tekstines paieskos filtravimo logikos kodas 02`,
      },
    ],
  },
  {
    id: 'punktas-5-2',
    pointLabel: '5.2',
    title: `Prekių filtravimas pagal kategorijas, kainas, prekės ženklus ir kitus parametrus`,
    status: `Įdiegta`,
    summary: `Įdiegtas produktų filtravimo funkcionalumas, leidžiantis vartotojams greitai susiaurinti produktų sąrašą pagal pasirinktus kriterijus. Produktų katalogo puslapyje vartotojai gali filtruoti prekes pagal įvairius parametrus, tokius kaip produkto paskirtis, medienos tipas, spalva, profilis, matmenys bei kainos intervalas. Filtravimo sistema realizuota naudojant React komponentus, kurie valdo pasirinktų filtrų būseną ir realiu laiku atnaujina rodomų produktų sąrašą. Vartotojui pasirinkus vieną ar kelis filtravimo parametrus, sistema taiko filtravimo logiką ir pateikia tik tuos produktus, kurie atitinka pasirinktus kriterijus. Tokiu būdu vartotojai gali greičiau rasti reikiamus produktus didesniame kataloge. Įdiegta filtravimo sistema pagerina vartotojo patirtį ir leidžia patogiai naršyti produktų katalogą pagal skirtingus techninius ar vizualinius parametrus.`,
    uiLinks: [
      {
        label: `Atidaryti filtravimo puslapį`,
        href: liveUrl('/lt/produktai'),
      },
    ],
    screenshots: [
      {
        src: `${screenshotRoot}/5.2/aktyviu_filtru_struktura_kodas.png`,
        fileName: 'aktyviu_filtru_struktura_kodas.png',
        alt: `Prekių filtravimas pagal kategorijas, kainas, prekės ženklus ir kitus parametrus - aktyviu filtru struktura kodas`,
        caption: `aktyviu filtru struktura kodas`,
      },
      {
        src: `${screenshotRoot}/5.2/filtru_busenos_valdymas_kodas.png`,
        fileName: 'filtru_busenos_valdymas_kodas.png',
        alt: `Prekių filtravimas pagal kategorijas, kainas, prekės ženklus ir kitus parametrus - filtru busenos valdymas kodas`,
        caption: `filtru busenos valdymas kodas`,
      },
      {
        src: `${screenshotRoot}/5.2/produktu_filtravimas_pagal_atributus_saja.png`,
        fileName: 'produktu_filtravimas_pagal_atributus_saja.png',
        alt: `Prekių filtravimas pagal kategorijas, kainas, prekės ženklus ir kitus parametrus - produktu filtravimas pagal atributus saja`,
        caption: `produktu filtravimas pagal atributus saja`,
      },
      {
        src: `${screenshotRoot}/5.2/produktu_filtravimas_pagal_kaina_saja.png`,
        fileName: 'produktu_filtravimas_pagal_kaina_saja.png',
        alt: `Prekių filtravimas pagal kategorijas, kainas, prekės ženklus ir kitus parametrus - produktu filtravimas pagal kaina saja`,
        caption: `produktu filtravimas pagal kaina saja`,
      },
      {
        src: `${screenshotRoot}/5.2/produktu_filtravimo_logika_kodas.png`,
        fileName: 'produktu_filtravimo_logika_kodas.png',
        alt: `Prekių filtravimas pagal kategorijas, kainas, prekės ženklus ir kitus parametrus - produktu filtravimo logika kodas`,
        caption: `produktu filtravimo logika kodas`,
      },
      {
        src: `${screenshotRoot}/5.2/produktu_katalogas_su_filtravimo_sistema_saja.png`,
        fileName: 'produktu_katalogas_su_filtravimo_sistema_saja.png',
        alt: `Prekių filtravimas pagal kategorijas, kainas, prekės ženklus ir kitus parametrus - produktu katalogas su filtravimo sistema saja`,
        caption: `produktu katalogas su filtravimo sistema saja`,
      },
    ],
  },
  {
    id: 'punktas-6-1',
    pointLabel: '6.1',
    title: `PayPal, Paysera, Stripe bei kitų mokėjimo šaltinių integravimas į svetainę`,
    status: `Įdiegta`,
    summary: `Sistemoje įgyvendyta kelių mokėjimo sistemų integracija. Projekto demonstravimo metu aktyvus Paysera mokėjimo metodas, o Stripe ir PayPal integracijos yra paruoštos ir gali būti aktyvuotos pateikus atitinkamus mokėjimo paslaugų API raktus.`,
    screenshots: [
      {
        src: `${screenshotRoot}/6.1/mokejimo_budo_pasirinkimas_atsiskaityme.png`,
        fileName: 'mokejimo_budo_pasirinkimas_atsiskaityme.png',
        alt: `PayPal, Paysera, Stripe bei kitų mokėjimo šaltinių integravimas į svetainę - mokejimo budo pasirinkimas atsiskaityme`,
        caption: `mokejimo budo pasirinkimas atsiskaityme`,
      },
      {
        src: `${screenshotRoot}/6.1/paypal_mokejimo_uzsakymo_sukurimo_kodas.png`,
        fileName: 'paypal_mokejimo_uzsakymo_sukurimo_kodas.png',
        alt: `PayPal, Paysera, Stripe bei kitų mokėjimo šaltinių integravimas į svetainę - paypal mokejimo uzsakymo sukurimo kodas`,
        caption: `paypal mokejimo uzsakymo sukurimo kodas`,
      },
      {
        src: `${screenshotRoot}/6.1/paysera_mokejimo_inicijavimo_kodas.png`,
        fileName: 'paysera_mokejimo_inicijavimo_kodas.png',
        alt: `PayPal, Paysera, Stripe bei kitų mokėjimo šaltinių integravimas į svetainę - paysera mokejimo inicijavimo kodas`,
        caption: `paysera mokejimo inicijavimo kodas`,
      },
      {
        src: `${screenshotRoot}/6.1/stripe_atsiskaitymo_sesijos_kurimo_kodas.png`,
        fileName: 'stripe_atsiskaitymo_sesijos_kurimo_kodas.png',
        alt: `PayPal, Paysera, Stripe bei kitų mokėjimo šaltinių integravimas į svetainę - stripe atsiskaitymo sesijos kurimo kodas`,
        caption: `stripe atsiskaitymo sesijos kurimo kodas`,
      },
    ],
  },
  {
    id: 'punktas-6-2',
    pointLabel: '6.2',
    title: `Automatiniai mokėjimo patvirtinimai ir ataskaitos`,
    status: `Įdiegta`,
    summary: `Sistemoje įgyvendintas automatinio mokėjimo patvirtinimo ir užsakymo būsenos atnaujinimo mechanizmas. Po sėkmingo mokėjimo vartotojas nukreipiamas į užsakymo patvirtinimo puslapį, kuriame pateikiama sėkmės žinutė, užsakymo identifikatorius ir užsakymo santrauka. Serverinėje dalyje mokėjimo būsenos apdorojamos per webhook logiką, kuri validuoja gautą mokėjimo informaciją, atnaujina užsakymo būseną, inicijuoja papildomus veiksmus, tokius kaip el. laiško siuntimas ir atsargų atnaujinimas.`,
    notes: [
      `Platformoje vartotojo sąsajoje aktyviai naudojamas Paysera mokėjimo būdas, o Stripe webhook logika naudojama serveriniam mokėjimų apdorojimui ir užsakymų būsenų atnaujinimui.`,
    ],
    screenshots: [
      {
        src: `${screenshotRoot}/6.2/mokejimo_patvirtinimo_pavyzdys_01.png`,
        fileName: 'mokejimo_patvirtinimo_pavyzdys_01.png',
        alt: `Automatiniai mokėjimo patvirtinimai ir ataskaitos - mokejimo patvirtinimo pavyzdys 01`,
        caption: `mokejimo patvirtinimo pavyzdys 01`,
      },
      {
        src: `${screenshotRoot}/6.2/mokejimo_patvirtinimo_pavyzdys_02.png`,
        fileName: 'mokejimo_patvirtinimo_pavyzdys_02.png',
        alt: `Automatiniai mokėjimo patvirtinimai ir ataskaitos - mokejimo patvirtinimo pavyzdys 02`,
        caption: `mokejimo patvirtinimo pavyzdys 02`,
      },
      {
        src: `${screenshotRoot}/6.2/mokejimo_patvirtinimo_pavyzdys_03.png`,
        fileName: 'mokejimo_patvirtinimo_pavyzdys_03.png',
        alt: `Automatiniai mokėjimo patvirtinimai ir ataskaitos - mokejimo patvirtinimo pavyzdys 03`,
        caption: `mokejimo patvirtinimo pavyzdys 03`,
      },
      {
        src: `${screenshotRoot}/6.2/uzsakymo_patvirtinimo_padekos_puslapis.png`,
        fileName: 'uzsakymo_patvirtinimo_padekos_puslapis.png',
        alt: `Automatiniai mokėjimo patvirtinimai ir ataskaitos - uzsakymo patvirtinimo padekos puslapis`,
        caption: `uzsakymo patvirtinimo padekos puslapis`,
      },
      {
        src: `${screenshotRoot}/6.2/mokejimo_duomenu_irasymo_i_uzsakyma_kodas.png`,
        fileName: 'mokejimo_duomenu_irasymo_i_uzsakyma_kodas.png',
        alt: `Automatiniai mokėjimo patvirtinimai ir ataskaitos - mokejimo duomenu irasymo i uzsakyma kodas`,
        caption: `mokejimo duomenu irasymo i uzsakyma kodas`,
      },
      {
        src: `${screenshotRoot}/6.2/paypal_mokejimo_capture_patvirtinimo_kodas.png`,
        fileName: 'paypal_mokejimo_capture_patvirtinimo_kodas.png',
        alt: `Automatiniai mokėjimo patvirtinimai ir ataskaitos - paypal mokejimo capture patvirtinimo kodas`,
        caption: `paypal mokejimo capture patvirtinimo kodas`,
      },
      {
        src: `${screenshotRoot}/6.2/uzsakymo_busenos_atnaujinimo_logikos_kodas.png`,
        fileName: 'uzsakymo_busenos_atnaujinimo_logikos_kodas.png',
        alt: `Automatiniai mokėjimo patvirtinimai ir ataskaitos - uzsakymo busenos atnaujinimo logikos kodas`,
        caption: `uzsakymo busenos atnaujinimo logikos kodas`,
      },
      {
        src: `${screenshotRoot}/6.2/atsargu_atnaujinimo_po_apmokejimo_kodas.png`,
        fileName: 'atsargu_atnaujinimo_po_apmokejimo_kodas.png',
        alt: `Automatiniai mokėjimo patvirtinimai ir ataskaitos - atsargu atnaujinimo po apmokejimo kodas`,
        caption: `atsargu atnaujinimo po apmokejimo kodas`,
      },
    ],
  },
  {
    id: 'punktas-7-1',
    pointLabel: '7.1',
    title: `Elektroninio pašto rinkodaros įrankių integracija svetainėje`,
    status: `Įdiegta`,
    summary: `Svetainėje įdiegtas naujienlaiškio prenumeratos modulis, leidžiantis lankytojams pateikti savo el. pašto adresą ir gauti aktualią informaciją apie naujus produktus bei pasiūlymus. Prenumeratos forma validuoja vartotojo įvestus duomenis, registruoja sutikimą ir perduoda duomenis į serverinį API maršrutą. Serverinėje dalyje įdiegta kelių el. pašto rinkodaros tiekėjų architektūra, leidžianti naudoti skirtingus tiekėjus, tokius kaip duomenų bazės saugykla, Mailchimp ar Resend, priklausomai nuo sistemos konfigūracijos.`,
    uiLinks: [
      {
        label: `Atidaryti viešą svetainę`,
        href: liveUrl('/lt'),
      },
      {
        label: `Atidaryti el. pašto šablonus`,
        href: liveUrl('/lt/administravimas/el-pasto-sablonai'),
      },
    ],
    screenshots: [
      {
        src: `${screenshotRoot}/7.1/el_pasto_rinkodaros_kodas.png`,
        fileName: 'el_pasto_rinkodaros_kodas.png',
        alt: `Elektroninio pašto rinkodaros įrankių integracija svetainėje - el pasto rinkodaros kodas`,
        caption: `el pasto rinkodaros kodas`,
      },
    ],
  },
  {
    id: 'punktas-7-2',
    pointLabel: '7.2',
    title: `Socialinių tinklų ir trečiųjų šalių platformų integracija svetainėje`,
    status: `Įdiegta`,
    summary: `Platformoje integruotos socialinių tinklų ir trečiųjų šalių platformų nuorodos bei papildomi išoriniai moduliai. Vartotojo sąsajoje pateikiamos aktyvios nuorodos į Facebook, Instagram ir LinkedIn paskyras, o sistemos struktūroje taip pat įdiegtas analitikos ir papildomų klientų aptarnavimo įrankių palaikymas. Chatbot pilnai suprogramuotas – veikia viešojoje svetainės sąsajoje ir turi atskirą administravimo skydą, kuriame galima prisijungti OpenAI API raktą ir valdyti visus AI nustatymus. Tokia integracijų struktūra leidžia svetainę naudoti ne tik kaip elektroninę parduotuvę, bet ir kaip komunikacijos bei rinkodaros kanalų centrą.`,
    notes: [
      `Socialinių nuorodų integracija veikia aktyviai vartotojo sąsajoje, o kai kurios papildomos trečiųjų šalių integracijos aktyvuojamos pagal konfigūraciją arba aplinkos kintamuosius.`,
    ],
    uiLinks: [
      {
        label: `Atidaryti pagrindinį puslapį`,
        href: liveUrl('/lt'),
      },
    ],
    screenshots: [
      {
        src: `${screenshotRoot}/7.2/socialiniu_integraciju_kodas.png`,
        fileName: 'socialiniu_integraciju_kodas.png',
        alt: `Socialinių tinklų ir trečiųjų šalių platformų integracija svetainėje - socialiniu integraciju kodas`,
        caption: `socialiniu integraciju kodas`,
      },
      {
        src: `${screenshotRoot}/7.2/socialiniu_tinklu_nuorodu_saja.png`,
        fileName: 'socialiniu_tinklu_nuorodu_saja.png',
        alt: `Socialinių tinklų ir trečiųjų šalių platformų integracija svetainėje - footer socialinių nuorodų ir mokėjimo ikonų sąsaja`,
        caption: `Footer socialinių nuorodų ir mokėjimo ikonų sąsaja`,
      },
    ],
    evidenceGroups: [
      {
        title: `Analitika` ,
        description: `Ši grupė apima trečiųjų šalių analitikos integracijos pavyzdžius, rodančius, kaip svetainėje įjungiami stebėjimo ir matavimo įrankiai.` ,
        uiLinks: [
          {
            label: `Atidaryti pagrindinį puslapį`,
            href: liveUrl('/lt'),
          },
        ],
        screenshots: [
          {
            src: `${screenshotRoot}/7.2/analytics_integracijos_kodas.png`,
            fileName: 'analytics_integracijos_kodas.png',
            alt: `Socialinių tinklų ir trečiųjų šalių platformų integracija svetainėje - analitikos integracijos kodo pavyzdys`,
            caption: `Analitikos integracijos kodo pavyzdys`,
          },
        ],
      },
      {
        title: `Google prisijungimas`,
        description: `Ši grupė pateikia trečiosios šalies autentifikacijos integracijos pavyzdžius, kai naudotojas gali prisijungti naudodamas Google paskyrą.` ,
        uiLinks: [
          {
            label: `Atidaryti prisijungimo puslapį`,
            href: liveUrl('/login'),
          },
        ],
        screenshots: [
          {
            src: `${screenshotRoot}/7.2/google_prisijungimo_integracijos_kodas.png`,
            fileName: 'google_prisijungimo_integracijos_kodas.png',
            alt: `Socialinių tinklų ir trečiųjų šalių platformų integracija svetainėje - google prisijungimo integracijos kodas`,
            caption: `Google prisijungimo integracijos kodas`,
          },
          {
            src: `${screenshotRoot}/7.2/google_prisijungimo_saja.png`,
            fileName: 'google_prisijungimo_saja.png',
            alt: `Socialinių tinklų ir trečiųjų šalių platformų integracija svetainėje - google prisijungimo sąsajos pavyzdys`,
            caption: `Google prisijungimo sąsajos pavyzdys`,
          },
        ],
      },
      {
          title: `Chatbot sąsaja ir administravimas`,
          description: `Chatbot pilnai suprogramuotas ir integruotas svetainėje – veikia tiek viešojoje vartotojo sąsajoje, tiek administravimo aplinkoje. Administravimo skydelyje galima prisijungti OpenAI API raktą, pasirinkti veikimo režimą (visada / atsarginė / išjungta), nustatyti sisteminį prompt'ą lietuvių ir anglų kalbomis, konfigūruoti temperatūrą bei minimalų pasitikėjimo slenkstį. Chatbot gali atsakyti į dažniausiai užduodamus klausimus (FAQ) iš duomenų bazės arba siųsti užklausas į OpenAI GPT modelį priklausomai nuo nustatymų.` ,
        uiLinks: [
          {
            label: `Atidaryti chatbot svetainėje`,
            href: liveUrl('/lt'),
          },
          {
            label: `Atidaryti chatbot admin`,
            href: liveUrl('/lt/administravimas/chatbot'),
          },
        ],
        screenshots: [
          {
            src: `${screenshotRoot}/7.2/chatbot_saja.png`,
            fileName: 'chatbot_saja.png',
              alt: `Socialinių tinklų ir trečiųjų šalių platformų integracija svetainėje - chatbot vartotojo sąsajos pavyzdys`,
              caption: `Chatbot vartotojo sąsajos pavyzdys`,
          },
          {
            src: `${screenshotRoot}/7.2/chatbot_ai_nustatymu_saja.png`,
            fileName: 'chatbot_ai_nustatymu_saja.png',
              alt: `Socialinių tinklų ir trečiųjų šalių platformų integracija svetainėje - chatbot AI administravimo sąsajos pavyzdys`,
              caption: `Chatbot AI administravimo sąsajos pavyzdys`,
          },
        ],
      },
    ],
  },
  {
    id: 'punktas-8-1',
    pointLabel: '8.1',
    title: `Svetainės daugiakalbiškumo modulio programavimas`,
    status: `Įdiegta`,
    summary: `Sistemoje suprogramuotas daugiakalbiškumo modulis, apimantis lokalės nustatymą, kelių kalbų maršrutų palaikymą ir vertimų žinučių panaudojimą skirtinguose puslapiuose. Maršrutų logika užtikrina, kad skirtingų kalbų puslapiai būtų pasiekiami per atitinkamas URL struktūras, o turinys būtų pateikiamas pagal pasirinktą lokalę.`,
    uiLinks: [
      {
        label: `Atidaryti LT pagrindinį puslapį`,
        href: liveUrl('/lt'),
      },
    ],
    screenshots: [
      {
        src: `${screenshotRoot}/8.1/kalbos_modulio_kodas.png`,
        fileName: 'kalbos_modulio_kodas.png',
        alt: `Svetainės daugiakalbiškumo modulio programavimas - kalbos modulio kodas`,
        caption: `kalbos modulio kodas`,
      },
    ],
  },
  {
    id: 'punktas-8-2',
    pointLabel: '8.2',
    title: `Kalbos perjungimo mygtuko integracija`,
    status: `Įdiegta`,
    summary: `Vartotojo sąsajoje integruotas kalbos perjungimo mygtukas, leidžiantis vartotojui pasirinkti norimą kalbą tiek pagrindinėje antraštėje, tiek mobilioje navigacijoje. Perjungimo komponentas išsaugo pasirinkimą, perveda vartotoją į atitinkamos kalbos maršrutą ir palaiko lokalizuotų projektų bei tinklaraščio įrašų nuorodų keitimą.`,
    uiLinks: [
      {
        label: `Atidaryti LT pagrindinį puslapį`,
        href: liveUrl('/lt'),
      },
      {
        label: `Atidaryti LT produktų puslapį`,
        href: liveUrl('/lt/produktai'),
      },
    ],
    screenshots: [
      {
        src: `${screenshotRoot}/8.2/kalbos_perjungiklio_kodas.png`,
        fileName: 'kalbos_perjungiklio_kodas.png',
        alt: `Kalbos perjungimo mygtuko integracija - kalbos perjungiklio kodas`,
        caption: `kalbos perjungiklio kodas`,
      },
      {
        src: `${screenshotRoot}/8.2/kalbos_perjungimo_meniu_saja.png`,
        fileName: 'kalbos_perjungimo_meniu_saja.png',
        alt: `Kalbos perjungimo mygtuko integracija - kalbos perjungimo meniu sąsajos pavyzdys`,
        caption: `Kalbos perjungimo meniu sąsajos pavyzdys`,
      },
    ],
  },
  {
    id: 'punktas-9-1',
    pointLabel: '9.1',
    title: `Turinio redaktoriaus integracija`,
    status: `Įdiegta`,
    summary: `Administravimo aplinkoje įdiegtos redagavimo formos, leidžiančios valdyti projektų, įrašų, el. laiškų šablonų ir kitų turinio blokų laukus. Redagavimo sąsajos pateikia formų laukus turinio įvedimui, atnaujinimui, vaizdų įkėlimui ir išsaugojimui, o duomenų išsaugojimo logika sujungta su administravimo API ir Supabase integracija. Tokiu būdu administratorius gali keisti sistemos turinį per specializuotą valdymo aplinką ir iškart jį išsaugoti duomenų bazėje.`,
    uiLinks: [
      {
        label: `Atidaryti produktų administravimą`,
        href: liveUrl('/lt/administravimas/produktai'),
      },
      {
        label: `Atidaryti projektų administravimą`,
        href: liveUrl('/lt/administravimas/projektai'),
      },
      {
        label: `Atidaryti straipsnių administravimą`,
        href: liveUrl('/lt/administravimas/straipsniai'),
      },
      {
        label: `Atidaryti el. pašto šablonus`,
        href: liveUrl('/lt/administravimas/el-pasto-sablonai'),
      },
    ],
    screenshots: [
      {
        src: `${screenshotRoot}/9.1/turinio_redagavimo_saja.png`,
        fileName: 'turinio_redagavimo_saja.png',
        alt: `Turinio redaktoriaus integracija - turinio redagavimo formos sąsaja`,
        caption: `Turinio redagavimo formos sąsaja`,
      },
      {
        src: `${screenshotRoot}/9.1/turinio_redaktoriaus_kodas_v2.png`,
        fileName: 'turinio_redaktoriaus_kodas_v2.png',
        alt: `Turinio redaktoriaus integracija - turinio redagavimo ir Supabase išsaugojimo logikos kodas`,
        caption: `Turinio redagavimo ir Supabase išsaugojimo logikos kodas`,
      },
      {
        src: `${screenshotRoot}/9.1/turinio_redaktoriaus_saja.png`,
        fileName: 'turinio_redaktoriaus_saja.png',
        alt: `Turinio redaktoriaus integracija - turinio redaktoriaus sąsajos pavyzdys`,
        caption: `Turinio redaktoriaus sąsajos pavyzdys`,
      },
      {
        src: `${screenshotRoot}/9.1/projektu_turinio_administravimo_saja.png`,
        fileName: 'projektu_turinio_administravimo_saja.png',
        alt: `Turinio redaktoriaus integracija - projektų turinio administravimo sąsaja`,
        caption: `Projektų turinio administravimo sąsaja`,
      },
    ],
  },
  {
    id: 'punktas-9-2',
    pointLabel: '9.2',
    title: `Vartotojo teisių ir prieigos valdymas`,
    status: `Įdiegta`,
    summary: `Sistemoje įgyvendintas vartotojų autentifikacijos ir administratoriaus teisių tikrinimo mechanizmas. Administravimo puslapiai prieinami tik prisijungusiems ir autorizuotiems vartotojams, o serverinėje dalyje papildomai tikrinama vartotojo sesija, prieigos raktas ir administratorių el. pašto sąrašas. Tokiu būdu ribojama prieiga prie jautrių sistemos dalių ir valdymo funkcijų.`,
    uiLinks: [
      {
        label: `Atidaryti prisijungimą`,
        href: liveUrl('/login'),
      },
      {
        label: `Atidaryti admin skydelį`,
        href: liveUrl('/lt/administravimas/skydelis'),
      },
      {
        label: `Atidaryti vartotojų valdymą`,
        href: liveUrl('/lt/administravimas/vartotojai'),
      },
    ],
    screenshots: [
      {
        src: `${screenshotRoot}/9.2/prieigos_valdymo_kodas.png`,
        fileName: 'prieigos_valdymo_kodas.png',
        alt: `Vartotojo teisių ir prieigos valdymas - prieigos valdymo kodas`,
        caption: `prieigos valdymo kodas`,
      },
      {
        src: `${screenshotRoot}/9.2/prieigos_valdymo_saja.png`,
        fileName: 'prieigos_valdymo_saja.png',
        alt: `Vartotojo teisių ir prieigos valdymas - prieigos valdymo saja`,
        caption: `prieigos valdymo saja`,
      },
      {
        src: `${screenshotRoot}/9.2/vartotoju_ir_teisiu_valdymo_saja.png`,
        fileName: 'vartotoju_ir_teisiu_valdymo_saja.png',
        alt: `Vartotojo teisių ir prieigos valdymas - vartotoju ir teisiu valdymo saja`,
        caption: `vartotoju ir teisiu valdymo saja`,
      },
    ],
  },
  {
    id: 'punktas-9-3',
    pointLabel: '9.3',
    title: `Skirtingų turinio tipų valdymo galimybės`,
    status: `Įdiegta`,
    summary: `Administravimo sistemoje numatytas skirtingų turinio tipų valdymas, apimantis produktus, projektus, tinklaraščio įrašus, SEO įrašus, atsargas ir el. laiškų šablonus. Kiekvienam turinio tipui skirta atskira administravimo sritis arba formų logika, todėl sistema leidžia centralizuotai tvarkyti skirtingo pobūdžio duomenis pagal jų paskirtį.`,
    uiLinks: [
      {
        label: `Atidaryti admin skydelį`,
        href: liveUrl('/lt/administravimas/skydelis'),
      },
      {
        label: `Atidaryti produktus`,
        href: liveUrl('/lt/administravimas/produktai'),
      },
      {
        label: `Atidaryti projektus`,
        href: liveUrl('/lt/administravimas/projektai'),
      },
      {
        label: `Atidaryti parinktis`,
        href: liveUrl('/lt/administravimas/parinktys'),
      },
      {
        label: `Atidaryti SEO`,
        href: liveUrl('/lt/administravimas/seo'),
      },
    ],
    screenshots: [
      {
        src: `${screenshotRoot}/9.3/administravimo_skydelio_saja.png`,
        fileName: 'administravimo_skydelio_saja.png',
        alt: `Skirtingų turinio tipų valdymo galimybės - administravimo skydelio saja`,
        caption: `administravimo skydelio saja`,
      },
      {
        src: `${screenshotRoot}/9.3/parinkciu_valdymo_saja.png`,
        fileName: 'parinkciu_valdymo_saja.png',
        alt: `Skirtingų turinio tipų valdymo galimybės - parinkciu valdymo saja`,
        caption: `parinkciu valdymo saja`,
      },
      {
        src: `${screenshotRoot}/9.3/projektu_valdymo_saja.png`,
        fileName: 'projektu_valdymo_saja.png',
        alt: `Skirtingų turinio tipų valdymo galimybės - projektu valdymo saja`,
        caption: `projektu valdymo saja`,
      },
      {
        src: `${screenshotRoot}/9.3/turinio_tipu_valdymo_kodas.png`,
        fileName: 'turinio_tipu_valdymo_kodas.png',
        alt: `Skirtingų turinio tipų valdymo galimybės - turinio tipu valdymo kodas`,
        caption: `turinio tipu valdymo kodas`,
      },
      {
        src: `${screenshotRoot}/9.3/turinio_tipu_valdymo_saja.png`,
        fileName: 'turinio_tipu_valdymo_saja.png',
        alt: `Skirtingų turinio tipų valdymo galimybės - turinio tipu valdymo saja`,
        caption: `turinio tipu valdymo saja`,
      },
    ],
  },
  {
    id: 'punktas-10-1',
    pointLabel: '10.1',
    title: `Raktinių žodžių integracija į turinį, meta žymes ir URL.`,
    status: `Įdiegta`,
    summary: `Sistemoje įdiegta SEO orientuota URL ir metaduomenų logika, leidžianti formuoti aiškius puslapių adresus bei generuoti pavadinimų ir aprašymų informaciją. Produktų, puslapių ir kitų turinio objektų maršrutai susieti su lokalizuota slug ir metadata logika, padedančia geriau pateikti turinį paieškos sistemoms.`,
    uiLinks: [
      {
        label: `Atidaryti SEO modulį`,
        href: liveUrl('/lt/administravimas/seo'),
      },
    ],
    screenshots: [
      {
        src: `${screenshotRoot}/10.1/seo_pradinio_modulio_saja.png`,
        fileName: 'seo_pradinio_modulio_saja.png',
        alt: `Raktinių žodžių integracija į turinį, meta žymes ir URL. - seo pradinio modulio saja`,
        caption: `seo pradinio modulio saja`,
      },
      {
        src: `${screenshotRoot}/10.1/seo_raktazodziu_kodas.png`,
        fileName: 'seo_raktazodziu_kodas.png',
        alt: `Raktinių žodžių integracija į turinį, meta žymes ir URL. - seo raktazodziu kodas`,
        caption: `seo raktazodziu kodas`,
      },
      {
        src: `${screenshotRoot}/10.1/seo_raktazodziu_saja.png`,
        fileName: 'seo_raktazodziu_saja.png',
        alt: `Raktinių žodžių integracija į turinį, meta žymes ir URL. - seo raktazodziu saja`,
        caption: `seo raktazodziu saja`,
      },
      {
        src: `${screenshotRoot}/10.1/seo_skenavimo_eigos_saja.png`,
        fileName: 'seo_skenavimo_eigos_saja.png',
        alt: `Raktinių žodžių integracija į turinį, meta žymes ir URL. - seo skenavimo eigos saja`,
        caption: `seo skenavimo eigos saja`,
      },
      {
        src: `${screenshotRoot}/10.1/seo_skenavimo_rezultatu_saja.png`,
        fileName: 'seo_skenavimo_rezultatu_saja.png',
        alt: `Raktinių žodžių integracija į turinį, meta žymes ir URL. - seo skenavimo rezultatu saja`,
        caption: `seo skenavimo rezultatu saja`,
      },
    ],
  },
  {
    id: 'punktas-10-2',
    pointLabel: '10.2',
    title: `Nuotraukų optimizacija SEO`,
    status: `Įdiegta`,
    summary: `Platformoje nuotraukų atvaizdavimui naudojami optimizuoti komponentai, leidžiantys kontroliuoti dydžius, išdėstymą ir alternatyvius tekstus. Tokiu būdu pagerinamas turinio prieinamumas, paieškos sistemų supratimas apie paveikslėlius ir bendra svetainės našumo kokybė.`,
    screenshots: [
      {
        src: `${screenshotRoot}/10.2/nuotrauku_seo_kodas.png`,
        fileName: 'nuotrauku_seo_kodas.png',
        alt: `Nuotraukų optimizacija SEO - nuotrauku seo kodas`,
        caption: `nuotrauku seo kodas`,
      },
        {
          src: `${screenshotRoot}/10.2/nuotrauku_seo_saja_v2.png`,
          fileName: 'nuotrauku_seo_saja_v2.png',
          alt: `Nuotraukų optimizacija SEO - produktų katalogo ir paveikslėlių atributų peržiūros sąsaja`,
          caption: `Produktų katalogo ir paveikslėlių atributų peržiūros sąsaja`,
        },
    ],
  },
  {
    id: 'punktas-10-3',
    pointLabel: '10.3',
    title: `Serverio nustatymai siekiant maksimalaus greičio`,
    status: `Įdiegta`,
    summary: `Platformoje sukonfigūruoti pagrindiniai serverio ir aplikacijos lygmens našumo nustatymai, apimantys cache antraštes statiniams resursams, saugumo ir politikos antraštes bei pasirinktų komponentų atidėtą įkėlimą. Tokie sprendimai padeda optimizuoti svetainės veikimo greitį ir sumažina nereikalingą apkrovą pirminio atvaizdavimo metu.`,
    screenshots: [
      {
        src: `${screenshotRoot}/10.3/nasumo_nustatymu_kodas.png`,
        fileName: 'nasumo_nustatymu_kodas.png',
        alt: `Serverio nustatymai siekiant maksimalaus greičio - nasumo nustatymu kodas`,
        caption: `nasumo nustatymu kodas`,
      },
        {
          src: `${screenshotRoot}/10.3/pagespeed_mobiliojo_rezultatai.png`,
          fileName: 'pagespeed_mobiliojo_rezultatai.png',
          alt: `Serverio nustatymai siekiant maksimalaus greičio - PageSpeed mobiliojo našumo rezultatai`,
          caption: `PageSpeed mobiliojo našumo rezultatai`,
        },
        {
          src: `${screenshotRoot}/10.3/pagespeed_stalinio_kompiuterio_rezultatai.png`,
          fileName: 'pagespeed_stalinio_kompiuterio_rezultatai.png',
          alt: `Serverio nustatymai siekiant maksimalaus greičio - PageSpeed stalinio kompiuterio našumo rezultatai`,
          caption: `PageSpeed stalinio kompiuterio našumo rezultatai`,
        },
    ],
  },
  {
    id: 'punktas-10-4',
    pointLabel: '10.4',
    title: `Struktūrizuotų duomenų integracija`,
    status: `Įdiegta`,
    summary: `Svetainėje integruoti struktūrizuoti duomenys JSON-LD formatu, apimantys Organization, Product, BreadcrumbList, Article, FAQPage, WebSite, LocalBusiness ir ItemList schemų tipus. Struktūrizuotų duomenų generavimas realizuotas bendrose schema generavimo funkcijose, o jų įterpimas vykdomas serverinėje pusėje per application/ld+json script elementus skirtinguose puslapių šablonuose. Tokiu būdu paieškos sistemoms pateikiamas ne tik bendras organizacijos kontekstas, bet ir konkretūs produktų, straipsnių, DUK, kontaktų bei katalogo duomenys.`,
    screenshots: [
      {
        src: `${screenshotRoot}/10.4/schema_generatoriu_kodas.png`,
        fileName: 'schema_generatoriu_kodas.png',
        alt: `Struktūrizuotų duomenų integracija - schema generatorių kodas`,
        caption: `Schema generatorių kodas`,
      },
      {
        src: `${screenshotRoot}/10.4/jsonld_iterpimo_i_puslapius_kodas.png`,
        fileName: 'jsonld_iterpimo_i_puslapius_kodas.png',
        alt: `Struktūrizuotų duomenų integracija - JSON-LD įterpimo į puslapius kodas`,
        caption: `JSON-LD įterpimo į puslapius kodas`,
      },
      {
        src: `${screenshotRoot}/10.4/jsonld_isvesties_pavyzdziai.png`,
        fileName: 'jsonld_isvesties_pavyzdziai.png',
        alt: `Struktūrizuotų duomenų integracija - galutinio JSON-LD išvesties pavyzdžiai`,
        caption: `Galutinio JSON-LD išvesties pavyzdžiai`,
      },
    ],
  },
  {
    id: 'punktas-10-5',
    pointLabel: '10.5',
    title: `Google Rich Snippets optimizavimas`,
    status: `Įdiegta`,
    summary: `Platformoje įdiegtas produktų ir kitų turinio tipų struktūrizuotų duomenų pagrindas, leidžiantis formuoti paieškos sistemoms pritaikytus rich snippets signalus. Produkto puslapiuose generuojama Product schema su pagrindiniais atributais, tokiais kaip pavadinimas, aprašymas, prekės ženklas, kaina ir prieinamumas, o papildomai naudojami ItemList, LocalBusiness, FAQPage ir kiti struktūrizuoti duomenys. Šiuo metu review ir aggregate rating schemos nedeklaruojamos, todėl pateikiami tik tie rich results signalai, kuriuos pagrindžia realiai turimi duomenys.`,
    screenshots: [
      {
        src: `${screenshotRoot}/10.5/rich_snippets_kodas.png`,
        fileName: 'rich_snippets_kodas.png',
        alt: `Google Rich Snippets optimizavimas - rich snippets kodas`,
        caption: `rich snippets kodas`,
      },
    ],
  },
  {
    id: 'punktas-11-1',
    pointLabel: '11.1',
    title: `SSL sertifikato integracija`,
    status: `Įdiegta`,
    summary: `Platforma veikia per saugų HTTPS ryšį, todėl vartotojų naršyklėse duomenys perduodami šifruotu kanalu. HTTPS naudojimas užtikrina bazinį svetainės patikimumo ir saugumo lygį tiek vartotojams, tiek paieškos sistemoms.`,
    uiLinks: [
      {
        label: `Atidaryti HTTPS svetainę`,
        href: liveUrl(''),
      },
    ],
    screenshots: [
      {
        src: `${screenshotRoot}/11.1/ssl_https_saja.png`,
        fileName: 'ssl_https_saja.png',
        alt: `SSL sertifikato integracija - gyvas HTTPS domeno atsakas ir saugumo headeriai`,
        caption: `Gyvas HTTPS domeno atsakas ir saugumo headeriai (shop.yakiwood.co.uk)`,
      },
      {
        src: `${screenshotRoot}/11.1/ssl_https_kodas.png`,
        fileName: 'ssl_https_kodas.png',
        alt: `SSL sertifikato integracija - HSTS ir saugumo antraščių konfigūracija`,
        caption: `HSTS ir saugumo antraščių konfigūracija (next.config.ts)`,
      },
    ],
  },
  {
    id: 'punktas-11-2',
    pointLabel: '11.2',
    title: `Atsarginių kopijų kūrimas ir atkūrimo modulio integracija`,
    status: `Įdiegta`,
    summary: `Sistemoje įdiegtas pilnas atsarginių kopijų ir duomenų atkūrimo modulis aplikacijos lygmeniu. Biblioteka \`lib/admin/backups.ts\` kopijuoja 14 duomenų bazės lentelių (produktai, variantai, resursai, 3D modeliai, atsargos, el. pašto šablonai, chatbot nustatymai, SEO perrašymai, CMS turinys ir kt.) į JSON momentines kopijas. Palaikomi intervalai: 6h, 12h, 24h ar 7d — planuoklis paleidžiamas automatiškai kiekvieną serverio startą per \`instrumentation.ts\` ir tikrina intervalą kas 60 sekundžių. Atkūrimas vykdomas chunked upsert būdu (po 200 eilučių) ir apsaugotas papildomu patvirtinimo žodžiu „ATSTATYTI". Administravimo sąsaja prieinama per maršrutą \`/admin/backups\`.`,
    uiLinks: [
      {
        label: `Atidaryti backupų modulį`,
        href: liveUrl('/lt/administravimas/backupai'),
      },
    ],
    screenshots: [
      {
        src: `${screenshotRoot}/11.2/atsarginiu_kopiju_modulio_kodas.png`,
        fileName: 'atsarginiu_kopiju_modulio_kodas.png',
        alt: `Atsarginių kopijų modulis — 14 lentelių kopijų kūrimas, atkūrimas ir automatinis planuoklis`,
        caption: `Atsarginių kopijų modulio kodas (lib/admin/backups.ts · backup-scheduler.ts · instrumentation.ts)`,
      },
      {
        src: `${screenshotRoot}/11.2/atsarginiu_kopiju_valdymo_saja_v2.png`,
        fileName: 'atsarginiu_kopiju_valdymo_saja_v2.png',
        alt: `Atsarginių kopijų valdymo administravimo sąsaja`,
        caption: `Atsarginių kopijų valdymo administravimo sąsaja`,
      },
    ],
  },
  {
    id: 'punktas-12-1',
    pointLabel: '12.1',
    title: `Produkto vizualizacija trimačiame formate`,
    status: `Įdiegta`,
    summary: `Produktų konfigūravimo puslapyje įdiegta trimatės peržiūros aplinka, leidžianti atvaizduoti produkto modelį ir vartotojui interaktyviai peržiūrėti pasirinktą variantą. Vizualizacijos komponentas naudoja 3D atvaizdavimo bibliotekas ir modelių įkėlimo logiką, kad produkto pasirinkimas būtų pateiktas aiškiau ir patraukliau.`,
    uiLinks: [
      {
        label: `Atidaryti 3D konfiguratorių`,
        href: liveUrl('/lt/konfiguratorius3d'),
      },
    ],
    screenshots: [
      {
        src: `${screenshotRoot}/12.1/konfiguratoriaus_3d_kodas.png`,
        fileName: 'konfiguratoriaus_3d_kodas.png',
        alt: `Produkto vizualizacija trimačiame formate - konfiguratoriaus 3d kodas`,
        caption: `konfiguratoriaus 3d kodas`,
      },
      {
        src: `${screenshotRoot}/12.1/konfiguratoriaus_3d_saja.png`,
        fileName: 'konfiguratoriaus_3d_saja.png',
        alt: `Produkto vizualizacija trimačiame formate - konfiguratoriaus 3d saja`,
        caption: `konfiguratoriaus 3d saja`,
      },
    ],
  },
  {
    id: 'punktas-12-2',
    pointLabel: '12.2',
    title: `Detalus modeliavimas produkto pagal kliento specifikacijas`,
    status: `Įdiegta`,
    summary: `Sistemoje įdiegtas parametrinis produkto konfigūravimo mechanizmas, leidžiantis keisti produkto tipą, profilį, medieną, spalvą, plotį, ilgį ir kitus parametrus pagal kliento pasirinkimus. Keičiant nustatymus, atitinkamai atnaujinama produkto konfigūracija, vizualizacija ir susiję duomenys.`,
    notes: [
      `Ši dalis aprašoma kaip parametrinis konfigūravimas pagal specifikacijas, o ne kaip individualus CAD projektavimo modulis.`,
    ],
    uiLinks: [
      {
        label: `Atidaryti specifikacijų konfiguratorių`,
        href: liveUrl('/lt/konfiguratorius3d'),
      },
    ],
    screenshots: [
      {
        src: `${screenshotRoot}/12.2/konfiguratoriaus_specifikaciju_kodas.png`,
        fileName: 'konfiguratoriaus_specifikaciju_kodas.png',
        alt: `Detalus modeliavimas produkto pagal kliento specifikacijas - konfiguratoriaus specifikaciju kodas`,
        caption: `konfiguratoriaus specifikaciju kodas`,
      },
      {
        src: `${screenshotRoot}/12.2/konfiguratoriaus_specifikaciju_saja.png`,
        fileName: 'konfiguratoriaus_specifikaciju_saja.png',
        alt: `Detalus modeliavimas produkto pagal kliento specifikacijas - konfiguratoriaus specifikaciju saja`,
        caption: `konfiguratoriaus specifikaciju saja`,
      },
    ],
  },
  {
    id: 'punktas-12-3',
    pointLabel: '12.3',
    title: `Modelio eksportavimo į skirtingus formatus modulio integracija`,
    status: `Įdiegta`,
    summary: `Konfigūravimo modulyje įdiegta eksporto funkcija, leidžianti paruoštą produkto konfigūraciją atsisiųsti ar išvesti į skirtingus formatus, tokius kaip PDF, paveikslėlio failas ar spausdinimo vaizdas. Tai leidžia naudotojui išsisaugoti ar perduoti pasirinktą produkto konfigūraciją tolimesniam darbui.`,
    uiLinks: [
      {
        label: `Atidaryti eksporto funkciją`,
        href: liveUrl('/lt/konfiguratorius3d'),
      },
    ],
    screenshots: [
      {
        src: `${screenshotRoot}/12.3/konfiguratoriaus_eksporto_kodas.png`,
        fileName: 'konfiguratoriaus_eksporto_kodas.png',
        alt: `Modelio eksportavimo į skirtingus formatus modulio integracija - konfiguratoriaus eksporto kodas`,
        caption: `konfiguratoriaus eksporto kodas`,
      },
      {
        src: `${screenshotRoot}/12.3/konfiguratoriaus_eksporto_saja.png`,
        fileName: 'konfiguratoriaus_eksporto_saja.png',
        alt: `Modelio eksportavimo į skirtingus formatus modulio integracija - konfiguratoriaus eksporto saja`,
        caption: `konfiguratoriaus eksporto saja`,
      },
    ],
  },
  {
    id: 'punktas-13-1',
    pointLabel: '13.1',
    title: `Savybių keitimo modulio kūrimas, kur vartotojai gali keisti produkto spalvas, tekstūras ar kitus parametrus ir matyti rezultatus realiu laiku.`,
    status: `Įdiegta`,
    summary: `Naudotojui suteikta galimybė keisti produkto spalvas, profilius, matmenis ir kitus parametrus, o pasirinkimų rezultatai realiu laiku atspindimi konfigūravimo ir vizualizacijos modulyje. Tokia logika pagerina produkto pasirinkimo patirtį ir leidžia aiškiau suprasti, kaip konkretus variantas atrodys praktiškai.`,
    uiLinks: [
      {
        label: `Atidaryti gyvą konfiguratorių`,
        href: liveUrl('/lt/konfiguratorius3d'),
      },
    ],
    screenshots: [
      {
        src: `${screenshotRoot}/13.1/gyvu_produktu_variantu_kodas.png`,
        fileName: 'gyvu_produktu_variantu_kodas.png',
        alt: `Savybių keitimo modulio kūrimas, kur vartotojai gali keisti produkto spalvas, tekstūras ar kitus parametrus ir matyti rezultatus realiu laiku. - gyvu produktu variantu kodas`,
        caption: `gyvu produktu variantu kodas`,
      },
      {
        src: `${screenshotRoot}/13.1/gyvu_produktu_variantu_saja.png`,
        fileName: 'gyvu_produktu_variantu_saja.png',
        alt: `Savybių keitimo modulio kūrimas, kur vartotojai gali keisti produkto spalvas, tekstūras ar kitus parametrus ir matyti rezultatus realiu laiku. - gyvu produktu variantu saja`,
        caption: `gyvu produktu variantu saja`,
      },
    ],
  },
  {
    id: 'punktas-14-1',
    pointLabel: '14.1',
    title: `Produkto savybių ir specifikacijų keitimo programavimas`,
    status: `Įdiegta`,
    summary: `Sukurtas dinaminis Blender GLB modelių registro mechanizmas (lib/models.ts), kuris importuoja public/models/products/index.json su 80+ slug→kelias įrašų ir suteikia trimis žingsnių URL rezoliuciją: tikslus slug → kategorija/mediena → atsarginis variantas. Konfigūratorius automatiškai gauna tinkamą Draco-supresuotą GLB pagal kiekvieną produkto konfigūraciją.`,
    uiLinks: [
      {
        label: `Atidaryti produkto konfigūraciją`,
        href: liveUrl('/lt/konfiguratorius3d'),
      },
    ],
    screenshots: [
      {
        src: `${screenshotRoot}/14.1/produktu_specifikaciju_administravimo_kodas.png`,
        fileName: 'produktu_specifikaciju_administravimo_kodas.png',
        alt: `3D modelio registro ir produkto GLB duomenų integracija - modelio registro kodas`,
        caption: `modelio registro kodas`,
      },
      {
        src: `${screenshotRoot}/14.1/produktu_specifikaciju_administravimo_saja.png`,
        fileName: 'produktu_specifikaciju_administravimo_saja.png',
        alt: `3D modelio registro ir produkto GLB duomenų integracija - konfiguratoriaus specifikacijų sąsaja`,
        caption: `konfiguratoriaus specifikacijų sąsaja`,
      },
    ],
  },
  {
    id: 'punktas-14-2',
    pointLabel: '14.2',
    title: `Tekstinio ir vaizdinio turinio paruošimas ir pritaikymas kiekvienai prekei.`,
    status: `Įdiegta`,
    summary: `Visi 3D produktų modeliai eksportuoti iš Blender kaip Draco-suspausti GLB failai su integruotomis Principled BSDF PBR medžiagomis (albedo, AO, normal kanalai). Three.js aplinkoje getFinishSurfacePreset() funkcija dinamiškai pritaiko roughness ir metalness vertes kiekvienai apdailos variantui, leidžiant realiu laiku perjungti apdailos savybes.`,
    screenshots: [
      {
        src: `${screenshotRoot}/14.2/blender_pbr_kodas.png`,
        fileName: 'blender_pbr_kodas.png',
        alt: `3D modelių paruošimas Blender aplinkoje ir PBR medžiagų integracija - PBR medžiagų kodas`,
        caption: `PBR medžiagų kodas`,
      },
      {
        src: `${screenshotRoot}/14.2/blender_modelio_saja.png`,
        fileName: 'blender_modelio_saja.png',
        alt: `3D modelių paruošimas Blender aplinkoje ir PBR medžiagų integracija - Blender modelio scena`,
        caption: `Blender modelio scena`,
      },
      {
        src: `${screenshotRoot}/14.2/blender_pbr_maps_saja.png`,
        fileName: 'blender_pbr_maps_saja.png',
        alt: `3D modelių paruošimas Blender aplinkoje ir PBR medžiagų integracija - PBR tekstūrų žemėlapiai`,
        caption: `PBR tekstūrų žemėlapiai`,
      },
    ],
  },
  {
    id: 'punktas-14-3',
    pointLabel: '14.3',
    title: `Užsakymų valdymo sistemos diegimas`,
    status: `Įdiegta`,
    summary: `Konfigūratorius (ConfiguratorPage.tsx) tiesiogiai integruotas su Zustand persistent krepšelio store — vartotojui paspaudus „Į krepšelį", addItem() funkcijai perduodamas pilnas konfigūracijos snapshot: spalvos ir profilio variantų ID, storis, plotis, ilgis mm ir tikslinė vietos plotas m². Duomenys išsaugomi localStorage ir išlieka tarp puslapio perkrovimų.`,
    uiLinks: [
      {
        label: `Atidaryti konfigūratorių`,
        href: liveUrl('/lt/konfiguratorius3d'),
      },
      {
        label: `Atidaryti užsakymų valdymą`,
        href: liveUrl('/lt/administravimas/uzsakymai'),
      },
    ],
    screenshots: [
      {
        src: `${screenshotRoot}/14.3/uzsakymu_administravimo_kodas.png`,
        fileName: 'uzsakymu_administravimo_kodas.png',
        alt: `Konfiguratoriaus ir krepšelio integracijos sistema - krepšelio integracijos kodas`,
        caption: `krepšelio integracijos kodas`,
      },
      {
        src: `${screenshotRoot}/14.3/uzsakymu_administravimo_saja.png`,
        fileName: 'uzsakymu_administravimo_saja.png',
        alt: `Konfiguratoriaus ir krepšelio integracijos sistema - konfiguratoriaus sąsaja`,
        caption: `konfiguratoriaus sąsaja`,
      },
    ],
  },
]

export const evaluatorEvidenceAssetRoot = screenshotRoot

