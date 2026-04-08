import { Project } from '@/types/project';

const projectProductLinks = {
  blackLarch: {
    name: 'Black larch',
    slug: 'black-larch',
    hrefLt: '/lt/produktai/terasine-lenta-maumedis?ct=black',
    hrefEn: '/products/terrace-board-larch?ct=black',
  },
  brownLarch: {
    name: 'Brown larch',
    slug: 'brown-larch',
    hrefLt: '/lt/produktai/terasine-lenta-maumedis?ct=dark-brown',
    hrefEn: '/products/terrace-board-larch?ct=dark-brown',
  },
  carbonLarch: {
    name: 'Carbon larch',
    slug: 'carbon-larch',
    hrefLt: '/lt/produktai/terasine-lenta-maumedis?ct=carbon',
    hrefEn: '/products/terrace-board-larch?ct=carbon',
  },
} as const;

export const projects: Project[] = [
  {
    id: '1',
    slug: 'leliju-apartments',
    title: 'Lelijų Apartamentai',
    subtitle: 'Gyvenamųjų namų kompleksas',
    location: 'Vilnius, Lietuva',
    featuredImage: '/images/ui/projects/imgProject6.jpg',
    images: ['/images/ui/projects/imgProject6.jpg', '/images/ui/projects/imgProject5.jpg'],
    productsUsed: [
      projectProductLinks.blackLarch,
      projectProductLinks.brownLarch,
    ],
    description:
      'Lelijų Apartamentai sujungia modernią architektūrą ir natūralius akcentus: aukštos kokybės medžiagos, tvarūs sprendimai ir išraiškingas degintos medienos charakteris.',
    fullDescription:
      'Lelijų Apartamentai - šiuolaikiško dizaino ir organiškos estetikos dermė. Architektūroje degintos medienos plokštumos subtiliai kontrastuoja su dideliais stiklo fasadais, sukurdamos modernų, bet harmoningą įvaizdį. Butai projektuoti galvojant apie komfortą ir funkcionalumą: daug natūralios šviesos, erdvūs balkonai ir kokybiška apdaila. Kompleksas įsikūręs žalioje ir ramioje aplinkoje, todėl patogiai suderina miesto privalumus su gamtos artumu - puikus pasirinkimas ieškantiems stilingų ir ilgaamžių sprendimų.',
    i18n: {
      lt: {
        title: 'Lelijų Apartamentai',
        subtitle: 'Gyvenamųjų namų kompleksas',
        slug: 'leliju-apartments',
        location: 'Vilnius, Lietuva',
        description:
          'Lelijų Apartamentai sujungia modernią architektūrą ir natūralius akcentus: aukštos kokybės medžiagos, tvarūs sprendimai ir išraiškingas degintos medienos charakteris.',
        fullDescription:
          'Lelijų Apartamentai - šiuolaikiško dizaino ir organiškos estetikos dermė. Architektūroje degintos medienos plokštumos subtiliai kontrastuoja su dideliais stiklo fasadais, sukurdamos modernų, bet harmoningą įvaizdį. Butai projektuoti galvojant apie komfortą ir funkcionalumą: daug natūralios šviesos, erdvūs balkonai ir kokybiška apdaila. Kompleksas įsikūręs žalioje ir ramioje aplinkoje, todėl patogiai suderina miesto privalumus su gamtos artumu - puikus pasirinkimas ieškantiems stilingų ir ilgaamžių sprendimų.',
      },
      en: {
        title: "Lily's Apartments",
        subtitle: 'Apartment complex',
        slug: 'lilys-apartments',
        location: 'Vilnius, Lithuania',
        description:
          'Lelijų Apartments combine modern architecture with natural elements, featuring high-quality materials and sustainable design. Located in a peaceful neighborhood, they offer stylish living with a connection to nature.',
        fullDescription:
          'Lelijų Apartments are a perfect blend of contemporary design and organic aesthetics, offering a unique living experience in Lithuania. The architecture seamlessly integrates burnt wood elements with large glass facades, creating a striking yet harmonious contrast. Each apartment is designed with comfort and functionality in mind, providing ample natural light, spacious balconies, and high-quality finishes. Situated in a green and tranquil environment, the complex ensures a perfect balance between urban convenience and serene nature. Ideal for those seeking modern, stylish, and eco-conscious living.',
      },
    },
    featured: true,
    category: 'residential',
  },
  {
    id: '2',
    slug: 'moderni-vila',
    title: 'Moderni vila',
    location: 'Kaunas, Lietuva',
    featuredImage: '/images/ui/projects/imgProject2.jpg',
    images: ['/images/ui/projects/imgProject2.jpg', '/images/ui/projects/imgProject3.jpg'],
    productsUsed: [
      projectProductLinks.carbonLarch,
    ],
    description:
      'Įspūdinga moderni vila, kurioje deginta mediena išryškina fasado tekstūrą ir suteikia ilgaamžiškumo.',
    i18n: {
      lt: {
        title: 'Moderni vila',
        slug: 'moderni-vila',
        location: 'Kaunas, Lietuva',
        description:
          'Įspūdinga moderni vila, kurioje deginta mediena išryškina fasado tekstūrą ir suteikia ilgaamžiškumo.',
      },
      en: {
        title: 'Modern Villa',
        slug: 'modern-villa',
        location: 'Kaunas, Lithuania',
        description:
          'A stunning modern villa showcasing the beauty of burnt wood in residential architecture.',
      },
    },
    category: 'residential',
  },
  {
    id: '3',
    slug: 'uzmiescio-poilsio-namai',
    title: 'Užmiesčio poilsio namai',
    location: 'Trakai, Lietuva',
    featuredImage: '/images/ui/projects/imgProject3.jpg',
    images: ['/images/ui/projects/imgProject3.jpg', '/images/ui/projects/imgProject4.jpg'],
    productsUsed: [
      projectProductLinks.blackLarch,
    ],
    description:
      'Ramus prieglobstis gamtoje su elegantišku degintos medienos fasadu.',
    i18n: {
      lt: {
        title: 'Užmiesčio poilsio namai',
        slug: 'uzmiescio-poilsio-namai',
        location: 'Trakai, Lietuva',
        description: 'Ramus prieglobstis gamtoje su elegantišku degintos medienos fasadu.',
      },
      en: {
        title: 'Countryside Retreat',
        slug: 'countryside-retreat',
        location: 'Trakai, Lithuania',
        description: 'A peaceful retreat in nature with elegant burnt wood facades.',
      },
    },
    category: 'residential',
  },
  {
    id: '4',
    slug: 'harmonijos-poilsis-divi',
    title: 'Harmonijos poilsis',
    subtitle: 'Divi',
    location: 'Lietuva',
    featuredImage: '/images/ui/projects/winter-harmony-retreat-lithuania-silver-shou-sugi-ban-exterior-cladding-1.webp',
    images: [
      '/images/ui/projects/winter-harmony-retreat-lithuania-silver-shou-sugi-ban-exterior-cladding-1.webp',
      '/images/ui/projects/winter-harmony-retreat-lithuania-silver-shou-sugi-ban-exterior-cladding-3.webp',
    ],
    productsUsed: [
      projectProductLinks.blackLarch,
    ],
    description:
      '„Harmonijos poilsis Divi“ projektas, kuriame deginta mediena tampa pagrindiniu natūraliu akcentu.',
    fullDescription:
      'Rami poilsio erdvė, sujungianti modernų dizainą su tradicine Shou Sugi Ban degintos medienos technika. Natūralios tekstūros ir tamsūs paviršiai kuria jaukią atmosferą atsipalaidavimui ir gerai savijautai.',
    i18n: {
      lt: {
        title: 'Harmonijos poilsis',
        subtitle: 'Divi',
        slug: 'harmonijos-poilsis-divi',
        location: 'Lietuva',
        description: '„Harmonijos poilsis Divi“ projektas, kuriame deginta mediena tampa pagrindiniu natūraliu akcentu.',
        fullDescription:
          'Rami poilsio erdvė, sujungianti modernų dizainą su tradicine Shou Sugi Ban degintos medienos technika. Natūralios tekstūros ir tamsūs paviršiai kuria jaukią atmosferą atsipalaidavimui ir gerai savijautai.',
      },
      en: {
        title: 'Harmony retreat',
        subtitle: 'Divi',
        slug: 'harmony-retreat-divi',
        location: 'Lithuania',
        description: 'Harmony retreat Divi project featuring natural burnt wood elements',
        fullDescription:
          'A serene retreat space combining modern design with traditional Shou Sugi Ban burnt wood technique, creating a peaceful atmosphere for relaxation and wellness.',
      },
    },
    category: 'residential',
    featured: false,
  },
  {
    id: '5',
    slug: 'forestline-harmonijos-rezidencijos',
    title: 'Forestline harmonijos rezidencijos',
    location: 'Lietuva',
    featuredImage: '/images/ui/projects/imgProject5.jpg',
    images: ['/images/ui/projects/imgProject5.jpg', '/images/ui/projects/imgProject6.jpg'],
    productsUsed: [
      projectProductLinks.brownLarch,
    ],
    description:
      '„Forestline harmonijos rezidencijos“ - gyvenamasis kompleksas su natūralios medienos estetika ir degintos medienos apdaila.',
    fullDescription:
      'Gyvenamasis kompleksas harmoningai įsiliejęs į miško aplinką, naudojant premium degintos medienos fasadą. Natūrali tekstūra ir medienos šiluma sukuria tvirtą ryšį tarp architektūros ir gamtos.',
    i18n: {
      lt: {
        title: 'Forestline harmonijos rezidencijos',
        slug: 'forestline-harmonijos-rezidencijos',
        location: 'Lietuva',
        description:
          '„Forestline harmonijos rezidencijos“ - gyvenamasis kompleksas su natūralios medienos estetika ir degintos medienos apdaila.',
        fullDescription:
          'Gyvenamasis kompleksas harmoningai įsiliejęs į miško aplinką, naudojant aukščiausios kokybės degintos medienos fasadą. Natūrali tekstūra ir medienos šiluma sukuria tvirtą ryšį tarp architektūros ir gamtos.',
      },
      en: {
        title: 'Forestline Harmony Residences',
        slug: 'forestline-harmony-residences',
        location: 'Lithuania',
        description: 'Forestline Harmony Residences with natural wood aesthetics',
        fullDescription:
          'Residential complex harmoniously integrated with forest surroundings using premium burnt wood cladding. The natural texture and warmth of the wood create a perfect connection between architecture and nature.',
      },
    },
    category: 'residential',
    featured: false,
  },
  {
    id: '6',
    slug: 'siaurietiska-dreifmedzio-ramybe',
    title: 'Šiaurietiška dreifmedžio ramybė',
    location: 'Lietuva',
    featuredImage: '/images/ui/projects/nordic-driftwood-serenity-shou-sugi-ban-larch-latte-facade-yakiwood-2-1.webp',
    images: [
      '/images/ui/projects/nordic-driftwood-serenity-shou-sugi-ban-larch-latte-facade-yakiwood-2-1.webp',
      '/images/ui/projects/nordic-driftwood-serenity-shou-sugi-ban-larch-latte-facade-yakiwood-3-1-e1755064373742.webp',
      '/images/ui/projects/nordic-driftwood-serenity-shou-sugi-ban-larch-latte-facade-yakiwood-4-1.webp',
      '/images/ui/projects/nordic-driftwood-serenity-shou-sugi-ban-larch-latte-facade-yakiwood-5-1.webp',
      '/images/ui/projects/nordic-driftwood-serenity-shou-sugi-ban-larch-latte-facade-yakiwood-6%20(1).webp',
      '/images/ui/projects/nordic-driftwood-serenity-shou-sugi-ban-larch-latte-facade-yakiwood-7%20(1).webp',
    ],
    productsUsed: [
      projectProductLinks.carbonLarch,
    ],
    description:
      'Šiaurietiško minimalizmo įkvėptas dizainas su dreifmedžio estetika ir degintos medienos paviršiais.',
    fullDescription:
      'Rami erdvė, įkvėpta Šiaurės šalių minimalizmo ir natūralių dreifmedžio tekstūrų. Degintos medienos paviršiai primena pajūrio peizažų „išvėdintą“ grožį ir suteikia ilgaamžę apsaugą.',
    i18n: {
      lt: {
        title: 'Šiaurietiška dreifmedžio ramybė',
        slug: 'siaurietiska-dreifmedzio-ramybe',
        location: 'Lietuva',
        description:
          'Šiaurietiško minimalizmo įkvėptas dizainas su dreifmedžio estetika ir degintos medienos paviršiais.',
        fullDescription:
          'Rami erdvė, įkvėpta Šiaurės šalių minimalizmo ir natūralių dreifmedžio tekstūrų. Degintos medienos paviršiai primena pajūrio peizažų „išvėdintą“ grožį ir suteikia ilgaamžę apsaugą.',
      },
      en: {
        title: 'Nordic driftwood serenity',
        slug: 'nordic-driftwood-serenity',
        location: 'Lithuania',
        description: 'Nordic-inspired design with driftwood aesthetics',
        fullDescription:
          'A tranquil space inspired by Nordic minimalism and natural driftwood textures, featuring burnt wood surfaces that evoke the weathered beauty of coastal landscapes.',
      },
    },
    category: 'residential',
    featured: false,
  },
  {
    id: '7',
    slug: 'siaurietiskas-pajurio-gyvenimas',
    title: 'Šiaurietiškas pajūrio gyvenimas',
    location: 'Lietuva',
    featuredImage: '/images/ui/projects/nordic-coastline-living-palanga-exterior-1.jpg',
    images: [
      '/images/ui/projects/nordic-coastline-living-palanga-exterior-1.jpg',
      '/images/ui/projects/nordic-coastline-living-palanga-exterior-2.jpg',
      '/images/ui/projects/nordic-coastline-living-palanga-exterior-3.jpg',
      '/images/ui/projects/nordic-coastline-living-palanga-exterior-4.jpg',
      '/images/ui/projects/nordic-coastline-living-palanga-exterior-5.jpg',
      '/images/ui/projects/nordic-coastline-living-palanga-exterior-6.jpg',
    ],
    productsUsed: [
      projectProductLinks.blackLarch,
    ],
    description:
      'Pajūrio gyvenimo nuotaika ir Šiaurės šalių dizaino principai - su atspariu degintos medienos fasadu.',
    fullDescription:
      'Moderni pajūrio rezidencija su orui atspariu degintos medienos fasadu, įkvėptu Šiaurės šalių architektūros. Tamsi apsauginė apdaila suteikia ilgaamžiškumo ir išsaugo natūralų medienos grožį.',
    i18n: {
      lt: {
        title: 'Šiaurietiškas pajūrio gyvenimas',
        slug: 'siaurietiskas-pajurio-gyvenimas',
        location: 'Lietuva',
        description:
          'Pajūrio gyvenimo nuotaika ir Šiaurės šalių dizaino principai - su atspariu degintos medienos fasadu.',
        fullDescription:
          'Moderni pajūrio rezidencija su orui atspariu degintos medienos fasadu, įkvėptu Šiaurės šalių architektūros. Tamsi apsauginė apdaila suteikia ilgaamžiškumo ir išsaugo natūralų medienos grožį.',
      },
      en: {
        title: 'Nordic coastline living',
        slug: 'nordic-coastline-living',
        location: 'Lithuania',
        description: 'Coastal living with Nordic design principles',
        fullDescription:
          'Modern coastal residence featuring weather-resistant burnt wood cladding inspired by Nordic architecture. The dark, protective finish provides durability while maintaining natural beauty.',
      },
    },
    category: 'residential',
    featured: false,
  },
  {
    id: '8',
    slug: 'modernus-biuras',
    title: 'Modernus biuras',
    location: 'Vilnius, Lietuva',
    featuredImage: '/images/ui/projects/modern-office-shou-sugi-ban-black-1.webp',
    images: [
      '/images/ui/projects/modern-office-shou-sugi-ban-black-1.webp',
      '/images/ui/projects/modern-office-shou-sugi-ban-black-2.webp',
      '/images/ui/projects/modern-office-shou-sugi-ban-black-3.webp',
      '/images/ui/projects/modern-office-shou-sugi-ban-black-4.webp',
      '/images/ui/projects/modern-office-shou-sugi-ban-black-5.webp',
      '/images/ui/projects/modern-office-shou-sugi-ban-black-6.webp',
      '/images/ui/projects/modern-office-shou-sugi-ban-black-7.webp',
      '/images/ui/projects/modern-office-shou-sugi-ban-black-8.webp',
      '/images/ui/projects/modern-office-shou-sugi-ban-black-9.webp',
      '/images/ui/projects/modern-office-shou-sugi-ban-black-10.webp',
    ],
    productsUsed: [
      projectProductLinks.carbonLarch,
      projectProductLinks.brownLarch,
    ],
    description:
      'Šiuolaikinė biuro erdvė su degintos medienos akcentais, kuriančiais šiltą ir profesionalų įvaizdį.',
    fullDescription:
      'Subtili biuro aplinka su degintos medienos sienų panelėmis, kurios suteikia jaukumo ir solidumo. Natūralūs medienos elementai padeda kurti gerą mikroklimatą ir skatina produktyvumą.',
    i18n: {
      lt: {
        title: 'Modernus biuras',
        slug: 'modernus-biuras',
        location: 'Vilnius, Lietuva',
        description:
          'Šiuolaikinė biuro erdvė su degintos medienos akcentais, kuriančiais šiltą ir profesionalų įvaizdį.',
        fullDescription:
          'Subtili biuro aplinka su degintos medienos sienų panelėmis, kurios suteikia jaukumo ir solidumo. Natūralūs medienos elementai padeda kurti gerą mikroklimatą ir skatina produktyvumą.',
      },
      en: {
        title: 'Modern office',
        slug: 'modern-office',
        location: 'Vilnius, Lithuania',
        description: 'Contemporary office space with burnt wood accents',
        fullDescription:
          'A sophisticated office environment featuring burnt wood wall panels that create a warm, professional atmosphere. The natural wood elements promote creativity and well-being in the workplace.',
      },
    },
    category: 'commercial',
    featured: true,
  },
  {
    id: '10',
    slug: 'tamsaus-fasado-namas',
    title: 'Tamsaus fasado namas',
    subtitle: 'Shou Sugi Ban apdaila',
    location: 'Klaipėda, Lietuva',
    images: ['/images/ui/projects/imgProject4.jpg', '/images/ui/projects/imgProject5.jpg', '/images/ui/projects/imgProject1.jpg'],
    productsUsed: [
      projectProductLinks.blackLarch,
      projectProductLinks.carbonLarch,
    ],
    description:
      'Privataus namo fasadas su matine degintos medienos apdaila - aiškios linijos, gili tekstūra ir ilgaamžė apsauga nuo aplinkos poveikio.',
    fullDescription:
      'Šiame projekte pasirinkta Shou Sugi Ban technika padėjo sukurti išraiškingą, tačiau santūrų fasadą. Deginta mediena suteikia natūralią UV ir drėgmės apsaugą, o matinis paviršius gražiai „sugeria“ šviesą ir dera su modernia architektūra. Sprendimas parinktas taip, kad būtų lengva prižiūrėti ir ilgai išlaikytų vienodą estetiką Lietuvos klimato sąlygomis.',
    i18n: {
      lt: {
        title: 'Tamsaus fasado namas',
        subtitle: 'Shou Sugi Ban apdaila',
        slug: 'tamsaus-fasado-namas',
        location: 'Klaipėda, Lietuva',
        description:
          'Privataus namo fasadas su matine degintos medienos apdaila - aiškios linijos, gili tekstūra ir ilgaamžė apsauga nuo aplinkos poveikio.',
        fullDescription:
          'Šiame projekte pasirinkta Shou Sugi Ban technika padėjo sukurti išraiškingą, tačiau santūrų fasadą. Deginta mediena suteikia natūralią UV ir drėgmės apsaugą, o matinis paviršius gražiai „sugeria“ šviesą ir dera su modernia architektūra. Sprendimas parinktas taip, kad būtų lengva prižiūrėti ir ilgai išlaikytų vienodą estetiką Lietuvos klimato sąlygomis.',
      },
      en: {
        title: 'Dark facade house',
        subtitle: 'Shou Sugi Ban cladding',
        slug: 'dark-facade-house',
        location: 'Klaipėda, Lithuania',
        description:
          'Private house facade finished with matte burnt wood cladding - clean lines, deep texture, and long-lasting protection against the elements.',
        fullDescription:
          'In this project, the Shou Sugi Ban technique was used to create a distinctive yet minimal facade. Burnt wood provides natural UV and moisture resistance, while the matte surface absorbs light beautifully and complements modern architecture. The system was selected for easy maintenance and consistent aesthetics in Lithuania’s climate.',
      },
    },
    category: 'residential',
    featured: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(currentSlug: string, limit = 3): Project[] {
  return projects
    .filter((project) => project.slug !== currentSlug)
    .slice(0, limit);
}
