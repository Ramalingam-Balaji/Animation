import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Store } from 'lucide-react';
import { FOOD_STORE_CATEGORIES } from '../data/foodStoresData';
import Eyebrow from '../components/Eyebrow.jsx';

// --------------------------------
// FILTER TABS
// --------------------------------
const FILTER_TABS = [
  ['all', 'All Items'],
  ['veg', 'Veg'],
  ['nonveg', 'Non-Veg'],
  ['protein', 'Proteins'],
];

// Map a category slug/name to a food type so the
// Veg / Non-Veg / Proteins filter can group the cards.
const inferCategoryType = (slug, name) => {
  const key = `${slug} ${name}`.toLowerCase();

  if (key.includes('non')) return 'nonveg';
  if (key.includes('restaurant')) return 'nonveg';

  if (
    key.includes('egg') ||
    key.includes('dairy') ||
    key.includes('protein') ||
    key.includes('diet')
  ) {
    return 'protein';
  }

  // Everything else (veg, fruits, vegetables, bakery, sweets, home foods)
  // defaults to veg.
  return 'veg';
};

// Build the list of category cards from FOOD_STORE_CATEGORIES.
const buildCategoryCards = () =>
  Object.entries(FOOD_STORE_CATEGORIES).map(([slug, data]) => {
    const name = data?.name || slug;
    const stores = Array.isArray(data?.stores) ? data.stores : [];
    const banners = Array.isArray(data?.banners) ? data.banners : [];

    const image =
      data?.image ||
      banners[0]?.image ||
      stores[0]?.image ||
      '/category-placeholder.jpg';

    return {
      slug,
      name,
      image,
      storeCount: stores.length,
      type: inferCategoryType(slug, name),
    };
  });

// --------------------------------
// ANIMATION VARIANTS
// (same UI/animation feel as the original MenuSection)
// --------------------------------
const easeOutCubic = [0.25, 0.1, 0.25, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.06, staggerDirection: -1 } },
};

const cardVariants = {
  hidden: { y: -120, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: easeOutCubic },
  },
  exit: {
    y: 80,
    opacity: 0,
    transition: { duration: 0.35, ease: easeOutCubic },
  },
};

export default function MenuSection({ showToast }) {
  const [category, setCategory] = useState('all');
  const navigate = useNavigate();

  const allCards = buildCategoryCards();

  // Apply the Veg / Non-Veg / Proteins filter using the inferred type.
  const filteredCards = allCards.filter((card) => {
    if (category === 'all') return true;
    return card.type === category;
  });

  const handleCardClick = (card) => {
    if (typeof showToast === 'function') {
      showToast(`Browsing ${card.name} stores... 🥗`);
    }
    navigate(`/food-stores/${card.slug}`);
  };

  return (
    <section id="menu-section" className="bg-[#eff4ff] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <Eyebrow>Fuel Station</Eyebrow>
            <h2 className="section-title">Power-Packed Menu</h2>
          </div>

          {/* Filter tabs — All / Veg / Non-Veg / Proteins */}
          <div
            className="flex max-w-full gap-1 overflow-x-auto rounded-xl bg-white p-1 shadow-sm"
            aria-label="Filter menu items"
          >
            {FILTER_TABS.map(([value, title]) => (
              <button
                key={value}
                onClick={() => setCategory(value)}
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition sm:px-4 ${
                  category === value
                    ? 'bg-[#b70011] text-white'
                    : 'text-[#5c403c] hover:text-[#121c2a]'
                }`}
              >
                {title}
              </button>
            ))}
          </div>
        </div>

        {/* AnimatePresence + key={category} replays the fall on every filter change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            className="
              grid gap-3
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-5
              lg:grid-cols-9
            "
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2, margin: '-60px 0px -60px 0px' }}
            exit="exit"
          >
            {filteredCards.map((card) => (
              <motion.button
                type="button"
                key={card.slug}
                onClick={() => handleCardClick(card)}
                aria-label={`Browse ${card.name} stores`}
                variants={cardVariants}
                className="
                  menu-card group flex h-full w-full flex-col
                  overflow-hidden rounded-2xl bg-white text-left
                  shadow-xl shadow-[#b70011]/5 transition
                  hover:-translate-y-1 hover:shadow-2xl
                "
              >
                {/* Category image */}
                <div className="relative h-28 w-full overflow-hidden bg-[#e6eeff] sm:h-32">
                  <img
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    src={card.image}
                    alt={card.name}
                    loading="lazy"
                  />
                  <span className="absolute right-2 top-2 rounded-full bg-[#006e2d] px-2 py-0.5 text-[9px] font-bold text-white sm:text-[10px]">
                    {card.type === 'nonveg'
                      ? 'NON-VEG'
                      : card.type === 'protein'
                        ? 'PROTEIN'
                        : 'VEG'}
                  </span>
                </div>

                {/* Card body — compact so 9 fit in one row */}
                <div className="flex flex-1 flex-col p-3">
                  <h3 className="text-sm font-bold leading-tight text-[#121c2a] sm:text-base">
                    {card.name}
                  </h3>

                  <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-[#5c403c]">
                    <Store size={12} />
                    {card.storeCount} Store{card.storeCount === 1 ? '' : 's'}
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
