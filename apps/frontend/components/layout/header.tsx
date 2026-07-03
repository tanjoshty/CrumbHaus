import Link from 'next/link'

export function Header() {
  const navItems = [
  {
    label: "Cakes",
    link: "/products"
  },
  {
    label: "About",
    link: "#"
  },
  {
    label: "Contact",
    link: "#"
  },
]
  return (
    <nav className="flex justify-between items-center px-12 py-[18px] border-b border-cream-border bg-cream sticky top-0 z-10">
        <span className="font-display font-black text-[22px] text-cobalt tracking-[0.06em] uppercase">
          Crumb Haus
        </span>
 
        <div className="flex gap-9">
          {navItems.map((l) => (
            <Link key={l.label} href={l.link}
              className="text-[12px] font-medium tracking-[0.12em] uppercase text-ink/60 hover:text-ink transition-colors no-underline">
              {l.label}
            </Link>
          ))}
        </div>
 
        <button className="bg-cobalt text-cream text-[11px] font-medium tracking-[0.12em] uppercase px-[22px] py-[10px] cursor-pointer">
          Cart (0)
        </button>
      </nav>
  )
}
