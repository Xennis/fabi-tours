import type { MetadataRoute } from "next"

import { brandColor } from "@/content/config"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FabiTours",
    short_name: "FabiTours",
    description: "Discover the green spaces of Hamburg",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: brandColor,
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
