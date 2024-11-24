import { type MetadataRoute } from "next"

import { host } from "@/content/config"

// static site
export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `https://${host}/sitemap.xml`,
  }
}
