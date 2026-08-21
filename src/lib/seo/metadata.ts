import type { Metadata } from 'next'

export interface SEOConfig {
  title: string
  description: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  twitterCard?: 'summary' | 'summary_large_image'
  canonicalUrl?: string
  noIndex?: boolean
  noFollow?: boolean
}

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    ogTitle,
    ogDescription,
    ogImage,
    ogType = 'website',
    twitterCard = 'summary_large_image',
    canonicalUrl,
    noIndex = false,
    noFollow = false,
  } = config

  const siteName = 'Developer Portfolio'
  const fullTitle = `${title} | ${siteName}`

  return {
    title: fullTitle,
    description,
    robots: {
      index: !noIndex,
      follow: !noFollow,
    },
    openGraph: {
      title: ogTitle ?? fullTitle,
      description: ogDescription ?? description,
      type: ogType,
      siteName,
      images: ogImage ? [{ url: ogImage }] : [],
    },
    twitter: {
      card: twitterCard,
      title: ogTitle ?? fullTitle,
      description: ogDescription ?? description,
      images: ogImage ? [ogImage] : [],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export function generateProjectMetadata(
  project: {
    title: string
    short_description: string | null
    description: string | null
    slug: string
    cover_media_id: string | null
    project_media: { storage_path: string; media_type: string; alt_text: string | null }[]
  },
  baseUrl: string
): Metadata {
  const coverImage = project.cover_media_id
    ? project.project_media.find((m) => m.storage_path === project.cover_media_id)
    : project.project_media[0]

  const imageUrl = coverImage
    ? `${baseUrl}/storage/v1/object/public/portfolio-images/${coverImage.storage_path}`
    : `${baseUrl}/og-default.jpg`

  return generateMetadata({
    title: project.title,
    description: project.short_description ?? project.description ?? '',
    ogTitle: project.title,
    ogDescription: project.short_description ?? project.description ?? '',
    ogImage: imageUrl,
    ogType: 'article',
    canonicalUrl: `${baseUrl}/projects/${project.slug}`,
  })
}