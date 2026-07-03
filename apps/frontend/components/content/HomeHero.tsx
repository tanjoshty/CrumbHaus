export function HomeHero() {
  return (
    <section className="grid grid-cols-2 min-h-[82vh]">
      <div className="px-12 py-[72px] flex flex-col justify-center">
        <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-cobalt mb-[22px]">
          Handmade in Sydney
        </p>
        <h1 className="font-display font-black text-[clamp(80px,9vw,128px)] leading-[0.9] text-cobalt uppercase mb-8 tracking-[-0.01em]">
          Baked<br />With<br />Love
        </h1>
        <p className="text-base font-light leading-[1.75] text-ink/75 max-w-[360px] mb-11">
          Custom cakes made to order — for the moments worth celebrating.
          Real ingredients, no shortcuts.
        </p>
        <div className="flex gap-[14px]">
          <button className="bg-cobalt text-cream text-[12px] font-medium tracking-[0.12em] uppercase px-9 py-4 cursor-pointer">
            Order Now
          </button>
          <button className="bg-transparent text-cobalt border border-cobalt text-[12px] font-medium tracking-[0.12em] uppercase px-9 py-4 cursor-pointer">
            See All Cakes
          </button>
        </div>
      </div>

      <div className="bg-cobalt flex items-center justify-center relative overflow-hidden">
        <span className="font-display font-black text-[220px] text-cream/[0.05] absolute select-none leading-none">
          🎂
        </span>
        <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-cream/30 border border-dashed border-cream/20 px-8 py-5 z-10">
          Hero Image
        </span>
      </div>
    </section>
  ) 
}