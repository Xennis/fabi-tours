import { MapIcon, MapPinIcon, StarIcon, TagIcon } from "@heroicons/react/24/outline"

import { cn } from "@/lib/tw"
import { PlaceProperties, tagColors, tagLabel } from "@/lib/cms/places"
import { i18n } from "@/content/i18n"

const Link = ({ className, ...props }: React.ComponentPropsWithoutRef<"a">) => {
  /* outline-hidden: Somehow the link is auto-selected if a new page with a place is opened */
  return (
    <a
      className={cn("underline decoration-emerald-500 decoration-2 outline-hidden hover:no-underline", className ?? "")}
      {...props}
    >
      {props.children}
    </a>
  )
}

export const PlacePropertiesCard = ({ lang, props }: { lang: string; props: PlaceProperties }) => {
  const dictionary =
    lang === i18n.defaultLocale
      ? {
          srRating: "Rating",
          srRatingNone: "None",
          srRatingSuffix: "out of 5 stars",
        }
      : {
          srRating: "Bewertung",
          srRatingNone: "Keine",
          srRatingSuffix: "von 5 Sternen",
        }

  return (
    <>
      <div className="flex space-x-2.5">
        <span
          className="rounded px-1.5 py-0.5 text-sm text-white"
          style={{ backgroundColor: tagColors[props.mainTag] }}
        >
          {tagLabel(lang)[props.mainTag]}
        </span>
        <div className="space-x flex items-center">
          <div className="sr-only">
            {`${dictionary.srRating}: `}
            {props.rating !== null ? `${props.rating} ${dictionary.srRatingSuffix}` : dictionary.srRatingNone}
          </div>
          {[0, 1, 2, 3, 4].map((rating) => (
            <StarIcon
              key={rating}
              aria-hidden={true}
              className={cn(
                "h-5 w-5",
                props.rating !== null && props.rating > rating
                  ? "fill-yellow-300 text-yellow-300"
                  : "fill-gray-300 text-gray-300",
              )}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-6 gap-x-2 gap-y-3 pt-5">
        <MapPinIcon className="h-6 w-6" />
        <span className="col-span-5">{props.address}</span>
        <MapIcon className="h-6 w-6" />
        <Link className="col-span-5" href={props.googleMaps} target="_blank">
          maps.google.com
        </Link>
        {props.komoot !== null ? (
          <>
            <TagIcon className="h-6 w-6" />
            <Link className="col-span-5" href={props.komoot} target="_blank">
              komoot.com
            </Link>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}
