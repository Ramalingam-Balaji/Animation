import { useState } from 'react';

const links = [
  ['menu-section', 'Menu'],
  ['bmi-section', 'Protein calculator'],
  ['about-section', 'Our story'],
  ['franchise-section', 'Franchise'],
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-5">
    <nav aria-label="Main navigation" className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-lg shadow-black/10 backdrop-blur-xl sm:px-6">
      <a href="#top" onClick={() => setMenuOpen(false)} className="flex shrink-0 items-center gap-2 text-base font-extrabold tracking-tight text-[#b70011] sm:text-lg">
        <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-xl bg-[#b70011] text-lg text-white">E</span>
        <span>Eat Protein</span>
      </a>
      <div className="hidden items-center gap-6 whitespace-nowrap text-sm font-semibold text-[#5c403c] md:flex">
        {links.map(([id, label]) => <a key={id} href={`#${id}`} className="transition hover:text-[#b70011]">{label}</a>)}
      </div>
      <a href="#menu-section" className="hidden shrink-0 rounded-xl bg-[#b70011] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#dc2626] md:inline-flex">Order now</a>
      <button type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setMenuOpen((open) => !open)} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-[#121c2a] transition hover:bg-[#eff4ff] md:hidden">
        <span aria-hidden="true" className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
      </button>
      {menuOpen && <div id="mobile-navigation" className="absolute inset-x-0 top-full mt-2 grid gap-1 rounded-2xl border border-white/60 bg-white/95 p-3 shadow-xl backdrop-blur-xl md:hidden">
        {links.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3 text-sm font-semibold text-[#5c403c] transition hover:bg-[#eff4ff] hover:text-[#b70011]">{label}</a>)}
        <a href="#menu-section" onClick={() => setMenuOpen(false)} className="mt-1 rounded-xl bg-[#b70011] px-3 py-3 text-center text-sm font-bold text-white transition hover:bg-[#dc2626]">Order now</a>
      </div>}
    </nav>
  </header>;
}
