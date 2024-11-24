import { type MetadataRoute } from "next"

import { homePage, host } from "@/content/config"
import { i18n } from "@/content/i18n"
import { getCachedPages } from "@/lib/cms/fetchers"

// static site
export const dynamic = "force-static"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sites: MetadataRoute.Sitemap = []
  i18n.locales.forEach((lang) => {
    sites.push(
      ...[
        {
          url: `https://${host}${homePage(lang)}`,
          lastModified: new Date(),
          priority: 1,
        },
      ],
    )
  })

  const pages = await getCachedPages()
  pages.forEach((p) =>
    sites.push({
      url: `https://${host}${p.canonical}`,
      lastModified: p.lastEdited,
      priority: p.sitemapPriority,
    }),
  )

  return sites
}
