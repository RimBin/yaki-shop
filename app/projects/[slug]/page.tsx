import { Metadata } from 'next';
import ProjectDetailClient from '@/components/projects/ProjectDetailClient';
import { projects } from '@/data/projects';
import { getProjectOgImage } from '@/lib/og-image';
import { getLocale, getTranslations } from 'next-intl/server';
import { toLocalePath } from '@/i18n/paths';
import { applySeoOverride } from '@/lib/seo/overrides';
import { findProjectBySlug, getProjectDescription, getProjectLocation, getProjectSlug, getProjectTitle, normalizeProjectLocale } from '@/lib/projects/i18n';
import { getPublishedProjects } from '@/lib/projects/server';
import { absoluteUrl } from '@/lib/seo/site';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function truncateSeo(value: string, maxLength = 160): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1).trimEnd()}…`;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: getProjectSlug(project, 'en'),
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const currentLocale = normalizeProjectLocale(locale);
  const loadedProjects = await getPublishedProjects(currentLocale);
  const project = findProjectBySlug(loadedProjects, slug, currentLocale);

  if (!project) {
    return {
      title: 'Project',
    };
  }

  const title = getProjectTitle(project, currentLocale);
  const location = getProjectLocation(project, currentLocale);
  const description = getProjectDescription(project, currentLocale);
  const localizedSlug = getProjectSlug(project, currentLocale);
  const pageTitle = location ? `${title} - ${location}` : title;
  const seoDescription = truncateSeo(
    `${description} ${
      currentLocale === 'lt'
        ? 'Peržiūrėkite projekto nuotraukas ir panaudotus degintos medienos sprendimus.'
        : 'Explore project photos and the charred wood solutions used.'
    }`.trim()
  );
  const socialTitle = currentLocale === 'lt'
    ? `${location ? `${title} | ${location} | ` : `${title} | `}Yakiwood projektas`
    : `${location ? `${title} | ${location} | ` : `${title} | `}Yakiwood project`;
  const socialAlt = currentLocale === 'lt'
    ? `${title}${location ? `, ${location}` : ''} projekto nuotrauka`
    : `${title}${location ? `, ${location}` : ''} project image`;

  const ogImage = project.images?.[0] || project.featuredImage;
  const projectPath = toLocalePath(`/projects/${localizedSlug}`, currentLocale);
  const canonical = absoluteUrl(projectPath, currentLocale);

  const metadata: Metadata = {
    title: pageTitle,
    description: seoDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: socialTitle,
      description: seoDescription,
      images: [
        {
          url: getProjectOgImage(ogImage),
          width: 1200,
          height: 630,
          alt: socialAlt,
        },
      ],
      type: 'article',
      url: canonical,
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description: seoDescription,
      images: [getProjectOgImage(ogImage)],
    },
  };

  return applySeoOverride(metadata, new URL(canonical).pathname, currentLocale);
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const locale = await getLocale();
  const tBreadcrumbs = await getTranslations('breadcrumbs');
  const currentLocale = normalizeProjectLocale(locale);
  const loadedProjects = await getPublishedProjects(currentLocale);
  const project = findProjectBySlug(loadedProjects, slug, currentLocale) ?? null;
  const relatedProjects = project ? loadedProjects.filter((p) => p.id !== project.id).slice(0, 3) : [];

  return (
    <ProjectDetailClient
      basePath="/projects"
      currentLocale={currentLocale}
      project={project}
      relatedProjects={relatedProjects}
      labels={{ home: tBreadcrumbs('home'), projects: tBreadcrumbs('projects') }}
    />
  );
}

