import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ScrollTrigger } from '@/lib/gsap';
import { useReady } from '@/context/ReadyContext';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import LogoTransform from './LogoTransform/LogoTransform';
import Preloader from './Preloader/Preloader';
import FabStack from './FabStack/FabStack';
import MenuOverlay from '@/components/overlays/MenuOverlay/MenuOverlay';
import ContactOverlay from '@/components/overlays/ContactOverlay/ContactOverlay';
import SearchOverlay from '@/components/overlays/SearchOverlay/SearchOverlay';

/**
 * App shell shared by every route: preloader, floating logo, header, the
 * routed page content, footer, floating action buttons and the slide-in
 * overlays. Refreshes ScrollTrigger once the preloader releases so triggers
 * measure against the final, unlocked layout.
 */
export default function Layout() {
  const { ready, markReady } = useReady();
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  // Only the home page shows the intro preloader (matching the original site).
  // On any other entry point, release animations immediately.
  useEffect(() => {
    if (!isHome && !ready) markReady();
  }, [isHome, ready, markReady]);

  useEffect(() => {
    if (ready) ScrollTrigger.refresh();
  }, [ready]);

  return (
    <>
      {isHome && <Preloader />}
      <LogoTransform />
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
      <FabStack />

      <MenuOverlay />
      <ContactOverlay />
      <SearchOverlay />
    </>
  );
}
