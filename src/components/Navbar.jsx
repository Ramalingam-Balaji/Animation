import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Download } from 'lucide-react';

const links = [
  ['menu-section', 'Menu'],
  ['bmi-section', 'Protein calculator'],
  ['about-section', 'About'],
  ['franchise-section', 'Franchise'],
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinkClass =
    'transition hover:text-[#b70011]';

  const mobileLinkClass =
    'rounded-xl px-3 py-3 text-sm font-semibold text-[#5c403c] transition hover:bg-[#fff0f0] hover:text-[#b70011]';

  // Handles section anchor links from any route.
  // If we're already on the home page, just scroll to the section.
  // Otherwise, navigate to "/" first, then scroll once the page has loaded.
  const handleSectionClick = (event, sectionId) => {
    event.preventDefault();
    setMenuOpen(false);

    const scrollToSection = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Also update the URL hash so it stays shareable / consistent.
        window.history.replaceState(null, '', `/#${sectionId}`);
      }
    };

    if (location.pathname === '/') {
      // Already on home — just scroll.
      scrollToSection();
    } else {
      // Navigate to home with the target hash; AppRoutes will scroll
      // after the home page mounts (see the small ScrollToHash helper
      // included at the bottom of this file if you want one-time setup).
      navigate(`/#${sectionId}`);
      // Fallback: also try scrolling after navigation settles.
      setTimeout(scrollToSection, 250);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/90 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6"
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex shrink-0 items-center gap-2 text-base font-extrabold tracking-tight text-[#b70011] sm:text-lg"
        >
          <span
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center rounded-xl bg-[#b70011] text-lg text-white"
          >
            E
          </span>
          <span>Eat Protein</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-5 whitespace-nowrap text-sm font-semibold text-[#5c403c] lg:flex">
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`/#${id}`}
              onClick={(event) => handleSectionClick(event, id)}
              className={navLinkClass}
            >
              {label}
            </a>
          ))}

          {/* Store page link */}
          <Link to="/store" className={navLinkClass}>
            Store
          </Link>

          <Link to="/contact" className={navLinkClass}>
            Contact Us
          </Link>
        </div>

        {/* Download app button */}
        <a
          href="/#app-promo"
          onClick={(event) => handleSectionClick(event, 'app-promo')}
          className="hidden shrink-0 items-center gap-2 rounded-xl bg-[#b70011] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#dc2626] md:inline-flex"
        >
          <Download size={16} />
          Download App
        </a>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={
            menuOpen ? 'Close navigation menu' : 'Open navigation menu'
          }
          onClick={() => setMenuOpen((open) => !open)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-[#121c2a] transition hover:bg-[#fff0f0] md:hidden"
        >
          <span aria-hidden="true" className="material-symbols-outlined">
            {menuOpen ? 'close' : 'menu'}
          </span>
        </button>

        {/* Mobile navigation */}
        {menuOpen && (
          <div
            id="mobile-navigation"
            className="absolute inset-x-0 top-full grid gap-1 border-b border-slate-100 bg-white/95 p-3 backdrop-blur-xl md:hidden"
          >
            {links.map(([id, label]) => (
              <a
                key={id}
                href={`/#${id}`}
                onClick={(event) => handleSectionClick(event, id)}
                className={mobileLinkClass}
              >
                {label}
              </a>
            ))}

            {/* Store page link */}
            <Link
              to="/store"
              onClick={() => setMenuOpen(false)}
              className={mobileLinkClass}
            >
              Store
            </Link>

            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className={mobileLinkClass}
            >
              Contact Us
            </Link>
            <a
              href="/#app-promo"
              onClick={(event) => handleSectionClick(event, 'app-promo')}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#b70011] px-3 py-3 text-center text-sm font-bold text-white transition hover:bg-[#dc2626]"
            >
              <Download size={16} />
              Download App
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
