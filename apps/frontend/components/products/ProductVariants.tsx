'use client'
import { Product } from '@/types/sanity.types';
import { useState } from 'react'

interface Props {
  flavours?: string[];
  hasCustomisation?: boolean;
  sizes?: Product["sizes"];
}

const colours  = [
  { name: 'Ivory',    hex: '#F5EDD3' },
  { name: 'Cobalt',   hex: '#2350B5' },
  { name: 'Blush',    hex: '#E8B4B8' },
  { name: 'Sage',     hex: '#A8B89A' },
  { name: 'Charcoal', hex: '#3D3D3D' },
]

export function ProductVariants({
  flavours,
  sizes,
  hasCustomisation,
}: Props) {
  const [selectedSize,    setSize]    = useState('Select Size')
  const [selectedFlavour, setFlavour] = useState('Select Flavour')
  const [selectedColour,  setColour]  = useState('Cobalt')
  return (
    <div className='flex flex-col gap-8'>
        {/* Size */}
        {sizes?.length && 
          <div>
            <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-ink/60 mb-3">
              Size <span className="text-cobalt ml-2">{selectedSize}</span>
            </p>
            <div className="flex gap-2.5">
              {sizes.map((s) => (
                <button key={s.label} onClick={() => setSize(s.label)}
                  className={`px-5 py-2.5 text-[12px] font-medium tracking-[0.1em] uppercase border transition-colors cursor-pointer
                    ${selectedSize === s.label
                      ? 'bg-ink text-cream border-ink'
                      : 'bg-transparent text-ink border-cream-border hover:border-ink'}`}>
                  {s.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] font-light text-ink/60 mt-2">
              6" serves 8–10 · 8" serves 14–16 · 10" serves 22–25
            </p>
          </div>
        }
 
        {/* Colour */}
        <div>
          <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-ink/60 mb-3">
            Ribbon Colour <span className="text-cobalt ml-2">{selectedColour}</span>
          </p>
          <div className="flex gap-3">
            {colours.map((c) => (
              <button key={c.name} onClick={() => setColour(c.name)}
                title={c.name}
                className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer
                  ${selectedColour === c.name ? 'border-ink scale-110' : 'border-cream-border hover:border-ink/40'}`}
                style={{ backgroundColor: c.hex }} />
            ))}
          </div>
        </div>
 
        {/* Flavour */}
        {flavours?.length && 
          <div>
            <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-ink/60 mb-3">
              Flavour <span className="text-cobalt ml-2">{selectedFlavour}</span>
            </p>
            <div className="flex flex-wrap gap-2.5">
              {flavours.map((f) => (
                <button key={f} onClick={() => setFlavour(f)}
                  className={`px-4 py-2 text-[12px] font-medium tracking-[0.08em] uppercase border transition-colors cursor-pointer
                    ${selectedFlavour === f
                      ? 'bg-ink text-cream border-ink'
                      : 'bg-transparent text-ink border-cream-border hover:border-ink'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        }
 
        <div className="h-px bg-cream-border" />
 
        {/* Date */}
        <div>
          <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-ink/60 mb-3">
            Pickup / Delivery Date
          </p>
          <div className="border border-cream-border p-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-[13px] font-light text-ink/60">Select a date</p>
              <p className="text-[11px] font-light text-ink/60 mt-0.5">We need at least 5 days notice</p>
            </div>
            <div className="bg-cream border border-cream-border px-10 py-8 text-center shrink-0">
              <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-ink/60">
                Date Picker
              </p>
            </div>
          </div>
        </div>
 
        {/* Notes */}
        <div>
          <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-ink/60 mb-3">
            Notes
            <span className="font-light normal-case tracking-normal text-ink/60 ml-2">(optional)</span>
          </p>
          <textarea
            rows={3}
            placeholder={`E.g. write 'Happy 30th Sarah' · nut allergy · surprise delivery`}
            className="w-full border border-cream-border bg-cream text-ink text-[13px] font-light px-4 py-3 placeholder:text-ink/60 focus:outline-none focus:border-ink resize-none transition-colors"
          />
        </div>
 
        {/* CTA */}
        <div className="flex gap-3 pt-2">
          <button className="flex-1 bg-cobalt text-cream text-[13px] font-medium tracking-[0.12em] uppercase py-[18px] cursor-pointer hover:bg-cobalt-dark transition-colors">
            Add to Cart
          </button>
        </div>
 
        <p className="text-[11px] font-light text-ink/60 tracking-[0.03em] -mt-4">
          Full payment required at checkout. Cancellations accepted up to 72 hours before your date.
        </p>
    </div>
  )
}