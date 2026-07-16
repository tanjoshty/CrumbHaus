export function MediaAndText() {
  return (
    <section className="bg-cobalt px-12 py-[88px] flex justify-between items-center gap-12">
      <div className="max-w-[520px]">
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-cream/50 mb-[18px]">
          Our story
        </p>
        <h2 className="font-display font-black text-[62px] text-cream uppercase leading-[0.92] mb-6">
          Made From<br />Scratch
        </h2>
        <p className="text-[15px] font-light leading-[1.8] text-cream/75">
          Every Crumb Studio cake is made to order, by hand, using real
          ingredients. No mixes, no shortcuts — just honest baking for the
          moments that matter.
        </p>
      </div>

      <div className="border border-cream/20 px-[52px] py-10 text-center shrink-0">
        <div className="font-display font-black text-[80px] text-cream leading-none">100%</div>
        <div className="text-[11px] font-medium tracking-[0.18em] uppercase text-cream/45 mt-2.5">
          Made to Order
        </div>
      </div>
    </section>
  )
}