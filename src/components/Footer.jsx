const links = [
  ['menu-section', 'Menu'],
  ['bmi-section', 'Protein calculator'],
  ['about-section', 'Our story'],
  ['franchise-section', 'Franchise opportunities'],
];

export default function Footer() {
  return <footer className="bg-[#121c2a] text-white">
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 md:py-16">
      <div className="max-w-md">
        <a href="#top" className="inline-flex items-center gap-3 text-xl font-extrabold tracking-tight">
          <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-xl bg-[#b70011]">E</span>
          Eat Protein
        </a>
        <p className="mt-4 text-sm leading-6 text-white/65">Real food. Serious fuel. Chef-crafted nutrition to help you feel stronger and perform at your best.</p>
      </div>
      <div className="md:justify-self-end">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-white/55">Explore</h2>
        <nav aria-label="Footer navigation" className="grid gap-3 text-sm font-medium text-white/80">
          {links.map(([id, label]) => <a key={id} href={`#${id}`} className="transition hover:text-white">{label}</a>)}
        </nav>
      </div>
    </div>
    <div className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-white/55 sm:px-8 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Eat Protein. All rights reserved.</span>
        <a href="#top" className="transition hover:text-white">Back to top ↑</a>
      </div>
    </div>
  </footer>;
}
