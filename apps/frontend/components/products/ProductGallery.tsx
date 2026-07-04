"use client"

import { useState } from "react"
import { Image } from "next-sanity/image"

import { urlForImage } from "@/lib/sanity/image"
import { Product } from "@/types/sanity.types"

interface Props {
  images?: Product["images"]
  tag?: string
}

export function ProductGallery({ images = [], tag }: Props) {
  const [selected, setSelected] = useState(0)
  const activeImage = images[selected]

  return (
    <div className="bg-cream-light sticky top-0 self-start h-screen flex flex-col items-center justify-center gap-4 relative border-r border-cream-border">
      <div className="w-[72%] aspect-square border border-cream-border flex items-center justify-center relative overflow-hidden">
        {activeImage ? (
          <Image
            src={urlForImage(activeImage).width(800).height(800).fit("crop").url()}
            alt=""
            fill
            className="object-cover"
          />
        ) : (
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-ink/25">
            Product Image
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((image, index) => (
            <button
              key={image._key}
              type="button"
              onClick={() => setSelected(index)}
              aria-label={`Show image ${index + 1}`}
              className={`relative w-14 h-14 border overflow-hidden cursor-pointer ${
                index === selected ? "border-cobalt" : "border-cream-border"
              }`}
            >
              <Image
                src={urlForImage(image).width(112).height(112).fit("crop").url()}
                alt=""
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {tag && (
        <div className="absolute top-6 left-6 bg-cobalt text-cream text-[10px] font-medium tracking-[0.15em] uppercase px-3 py-1.5">
          {tag}
        </div>
      )}
    </div>
  )
}
