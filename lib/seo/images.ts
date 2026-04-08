export type SeoLocale = 'lt' | 'en';

function joinParts(parts: Array<string | null | undefined>, separator = ', '): string {
  return parts
    .map((part) => (typeof part === 'string' ? part.trim() : ''))
    .filter(Boolean)
    .join(separator);
}

function truncate(value: string, maxLength = 160): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1).trimEnd()}…`;
}

export function buildProductImageSeo(
  locale: SeoLocale,
  {
    name,
    attributeLabel,
    shortDescription,
  }: {
    name: string;
    attributeLabel?: string | null;
    shortDescription?: string | null;
  }
) {
  const alt = joinParts([name, attributeLabel]);
  const titleBase = joinParts([name, attributeLabel], ' - ');
  const title =
    locale === 'lt'
      ? `${titleBase || name} | Degintos medienos produktas | Yakiwood`
      : `${titleBase || name} | Charred wood product | Yakiwood`;
  const description =
    locale === 'lt'
      ? truncate(`${joinParts([name, attributeLabel, shortDescription])}. Produkto vaizdas Yakiwood kataloge.`)
      : truncate(`${joinParts([name, attributeLabel, shortDescription])}. Product image in the Yakiwood catalog.`);

  return { alt, title, description };
}

export function buildProjectImageSeo(
  locale: SeoLocale,
  {
    title,
    location,
    index,
  }: {
    title: string;
    location?: string | null;
    index?: number;
  }
) {
  const sequence = typeof index === 'number' ? String(index + 1) : null;
  const alt = joinParts([title, location, sequence ? `${locale === 'lt' ? 'Nuotrauka' : 'Image'} ${sequence}` : null]);
  const imageLabel = sequence
    ? locale === 'lt'
      ? `Projekto nuotrauka ${sequence}`
      : `Project image ${sequence}`
    : locale === 'lt'
      ? 'Projekto nuotrauka'
      : 'Project image';
  const seoTitle =
    locale === 'lt'
      ? `${joinParts([title, location], ' - ')} | Yakiwood projektas`
      : `${title} | Yakiwood project`;
  const description =
    locale === 'lt'
      ? truncate(`${joinParts([title, location])}. ${imageLabel} Yakiwood projektų galerijoje.`)
      : truncate(`${joinParts([title, location])}. ${imageLabel} in the Yakiwood projects gallery.`);

  return { alt, title: seoTitle, description };
}

export function buildUiImageSeo(
  locale: SeoLocale,
  {
    name,
    context,
    description,
  }: {
    name: string;
    context?: string | null;
    description?: string | null;
  }
) {
  const alt = joinParts([name, context]);
  const seoTitle = context ? `${joinParts([name, context], ' - ')} | Yakiwood` : `${name} | Yakiwood`;
  const seoDescription =
    locale === 'lt'
      ? truncate(`${joinParts([name, context, description])}. Vaizdas Yakiwood svetainėje.`)
      : truncate(`${joinParts([name, context, description])}. Image used across the Yakiwood website.`);

  return {
    alt,
    title: seoTitle,
    description: seoDescription,
  };
}