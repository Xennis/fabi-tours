import { type MetadataRoute } from "next"

import { host } from "@/content/config"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `https://${host}/sitemap.xml`,
  }
}
