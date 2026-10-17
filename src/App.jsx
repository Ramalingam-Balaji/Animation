import { useCallback, useEffect, useRef, useState } from 'react';
import ScrollHero from './components/ScrollHero.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Loader from './components/Loader.jsx';
import Toast from './components/Toast.jsx';
import MenuSection from './sections/MenuSection.jsx';
import BMISection from './sections/BMISection.jsx';
import AboutSection from './sections/AboutSection.jsx';
import AppPromo from './sections/AppPromo.jsx';
import FranchiseSection from './sections/FranchiseSection.jsx';

export default function App() {
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState('');
  const timer = useRef(null);
  const updateProgress = useCallback((value) => setProgress((current) => Math.max(current, value)), []);

  function showToast(message) {
    setToast(message);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(''), 2800);
  }

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return <>
    <Navbar />
    <Loader progress={progress} />
    <ScrollHero onProgress={updateProgress} />
    <main className="bg-[#f8f9ff]">
      <MenuSection showToast={showToast} />
      <BMISection showToast={showToast} />
      <AboutSection />
      <AppPromo showToast={showToast} />
      <FranchiseSection showToast={showToast} />
    </main>
    <Footer />
    <Toast message={toast} />
  </>;
}
