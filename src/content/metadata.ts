import { i18n } from "@/content/i18n"
import { pageTitle } from "@/content/config"

export const getMetadata = (lang: string) => {
  const dictionary =
    lang === i18n.defaultLocale
      ? {
          description: "Discover the green spaces of Hamburg",
        }
      : {
          description: "Entdecke die grünen Ecken von Hamburg",
        }

  return {
    description: dictionary.description,
    openGraph: {
      description: dictionary.description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
        },
        {
          url: "/og-image-square.png",
          width: 400,
          height: 400,
        },
      ],
      // title: Is included as template in the layout
      type: "website",
      siteName: pageTitle,
    },
  }
}
