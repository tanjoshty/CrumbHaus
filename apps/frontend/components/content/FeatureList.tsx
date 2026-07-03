export function FeatureList() {
  const marqueeItems = ['Made to Order', 'Baked Fresh', 'Real Ingredients', 'Sydney Made', 'No Shortcuts']
  return (
    <div className="bg-cobalt py-[13px] overflow-hidden whitespace-nowrap">
      <div className="inline-block animate-marquee">
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span key={i}>
            <span className="font-display font-bold text-[14px] tracking-[0.18em] uppercase text-cream/85 mr-10">
              {item}
            </span>
            <span className="font-display text-[12px] text-cream/35 mr-10">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}