import { useState } from 'react';
import products from '../data/products.js';
import Eyebrow from '../components/Eyebrow.jsx';

const categories = [
  ['all', 'All Items'],
  ['shake', 'Shakes'],
  ['meal', 'Meals'],
  ['snack', 'Snacks'],
];

export default function MenuSection({ showToast }) {
  const [category, setCategory] = useState('all');
  const filteredProducts = products.filter((item) => category === 'all' || item.category === category);

  return <section id="menu-section" className="bg-[#eff4ff] py-20 sm:py-24">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
        <div>
          <Eyebrow>Fuel Station</Eyebrow>
          <h2 className="section-title">Power-Packed Menu</h2>
        </div>
        <div className="flex max-w-full gap-1 overflow-x-auto rounded-xl bg-white p-1 shadow-sm" aria-label="Filter menu items">
          {categories.map(([value, title]) => <button key={value} onClick={() => setCategory(value)} className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition sm:px-4 ${category === value ? 'bg-[#b70011] text-white' : 'text-[#5c403c] hover:text-[#121c2a]'}`}>{title}</button>)}
        </div>
      </div>
      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((item) => <article key={item.category} className="menu-card flex flex-col overflow-hidden rounded-2xl bg-white shadow-xl shadow-[#b70011]/5">
          <div className="relative h-64 overflow-hidden bg-[#e6eeff]">
            <img className="h-full w-full object-cover transition duration-500 hover:scale-105" src={item.image} alt={item.name} />
            <span className="absolute right-4 top-4 rounded-full bg-[#006e2d] px-3 py-1 text-xs font-bold text-white">{item.protein}</span>
          </div>
          <div className="flex flex-1 flex-col justify-between p-6">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#5c403c]">{item.label}</span>
                <span className="text-xl font-bold text-[#b70011]">{item.price}</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[#121c2a]">{item.name}</h3>
              <p className="mb-5 text-sm leading-6 text-[#5c403c]">{item.description}</p>
            </div>
            <button onClick={() => showToast(`Added ${item.name} to your order bag! 🥤`)} className="w-full rounded-xl bg-[#dc2626] py-3 font-bold text-white transition hover:bg-[#b70011]">Order Now</button>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}
