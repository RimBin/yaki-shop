export type AppLocale = 'en' | 'lt';

type PrefixMap = Array<{ from: string; to: string }>;

const enToLt: PrefixMap = [
  { from: '/account/details', to: '/paskyra/duomenys' },
  { from: '/account/orders', to: '/paskyra/uzsakymai' },
  { from: '/account/invoices', to: '/paskyra/saskaitos' },
  { from: '/account', to: '/paskyra' },
  { from: '/policies/terms', to: '/politikos/taisykles-ir-salygos' },
  { from: '/policies/shipping', to: '/politikos/pristatymas' },
  { from: '/policies/refund', to: '/politikos/grazinimas' },
  { from: '/policies', to: '/politikos' },
  { from: '/admin/ia-irodymai', to: '/administravimas/ia-irodymai' },
  { from: '/admin/email-templates', to: '/administravimas/el-pasto-sablonai' },
  { from: '/admin/orders', to: '/administravimas/uzsakymai' },
  { from: '/admin/inventory', to: '/administravimas/atsargos' },
  { from: '/admin/products', to: '/administravimas/produktai' },
  { from: '/admin/projects', to: '/administravimas/projektai' },
  { from: '/admin/posts', to: '/administravimas/straipsniai' },
  { from: '/admin/options', to: '/administravimas/parinktys' },
  { from: '/admin/backups', to: '/administravimas/backupai' },
  { from: '/admin/users', to: '/administravimas/vartotojai' },
  { from: '/admin/chatbot', to: '/administravimas/chatbot' },
  { from: '/admin/seo', to: '/administravimas/seo' },
  { from: '/admin/dashboard', to: '/administravimas/skydelis' },
  { from: '/admin', to: '/administravimas' },
  { from: '/products', to: '/produktai' },
  { from: '/solutions', to: '/sprendimai' },
  { from: '/projects', to: '/projektai' },
  { from: '/eu-projects', to: '/eu-projektai' },
  { from: '/blog', to: '/straipsniai' },
  { from: '/about', to: '/apie' },
  { from: '/contact', to: '/kontaktai' },
  { from: '/faq', to: '/duk' },
  { from: '/configurator3d', to: '/konfiguratorius3d' },
];

const ltToEn: PrefixMap = [
  { from: '/administravimas/sandelys', to: '/admin/inventory' },
  ...enToLt.map(({ from, to }) => ({ from: to, to: from })),
];

function replaceLeadingPath(pathname: string, mapping: PrefixMap): string {
  for (const { from, to } of mapping) {
    if (pathname === from || pathname.startsWith(`${from}/`)) {
      return pathname.replace(from, to);
    }
  }
  return pathname;
}

function splitHref(href: string): { path: string; suffix: string } {
  const hashIndex = href.indexOf('#');
  const queryIndex = href.indexOf('?');

  const endOfPath =
    hashIndex === -1
      ? queryIndex === -1
        ? href.length
        : queryIndex
      : queryIndex === -1
        ? hashIndex
        : Math.min(hashIndex, queryIndex);

  return { path: href.slice(0, endOfPath) || '/', suffix: href.slice(endOfPath) };
}

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('tel:');
}

function stripPrefix(pathname: string, prefix: string): string {
  if (pathname === prefix) return '/';
  if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length);
  return pathname;
}

export function toLocalePath(href: string, locale: AppLocale): string {
  if (!href) return href;
  if (isExternalHref(href)) return href;

  const { path, suffix } = splitHref(href);
  const normalized = path.startsWith('/') ? path : `/${path}`;

  const withoutEnPrefix = stripPrefix(normalized, '/en');

  if (locale === 'lt') {
    if (withoutEnPrefix === '/lt' || withoutEnPrefix.startsWith('/lt/')) return `${withoutEnPrefix}${suffix}`;
    if (withoutEnPrefix === '/') return `/lt${suffix}`;

    const mapped = replaceLeadingPath(withoutEnPrefix, enToLt);
    return `/lt${mapped}${suffix}`;
  }

  if (withoutEnPrefix === '/lt' || withoutEnPrefix.startsWith('/lt/')) {
    const withoutLt = stripPrefix(withoutEnPrefix, '/lt');
    const mapped = replaceLeadingPath(withoutLt, ltToEn);
    return `${mapped}${suffix}`;
  }

  return `${replaceLeadingPath(withoutEnPrefix, ltToEn)}${suffix}`;
}
