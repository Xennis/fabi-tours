import NextLink from "next/link"
import { Suspense } from "react"
import NextImage from "next/image"

import { homePage, legalPage } from "@/content/config"
import { LanguageToggle } from "@/components/layout/language-toggle"
import { i18n } from "@/content/i18n"
import instagramIcon from "@/content/images/instagram.svg"

export const Header = ({ lang }: { lang: string }) => {
  const dictionary =
    lang === i18n.defaultLocale
      ? {
          legalLabel: "Legal",
          logoAriaLabel: "Home",
        }
      : {
          legalLabel: "Impressum",
          logoAriaLabel: "Startseite",
        }
  return (
    <header className="bg-emerald-500 px-3 py-2">
      <nav className="flex justify-between space-x-2">
        <NextLink href={homePage(lang)} aria-label={dictionary.logoAriaLabel} className="text-lg tracking-tight">
          <span className="font-semibold">Fabi</span>Tours
          <span aria-hidden={true}>&nbsp;☀️</span>️
        </NextLink>
        <ul className="flex items-center space-x-3 divide-x divide-black">
          <li>
            <NextLink href={legalPage(lang)} className="hover:underline">
              {dictionary.legalLabel}
            </NextLink>
          </li>
          <li className="ps-3">
            {/* TODO: Add fallback */}
            <Suspense>
              <LanguageToggle className="hover:underline" />
            </Suspense>
          </li>
          <li className="ps-3">
            <a href="https://www.instagram.com/fabitours.hh/" target="_blank">
              <span className="sr-only">Instagram</span>
              <NextImage
                aria-hidden={true}
                className="hover:grayscale"
                width={25}
                src={instagramIcon}
                alt="Instagram logo"
              />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
