import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import Hero from '@/components/sections/home/Hero/Hero';
import Intro from '@/components/sections/home/Intro/Intro';
import NewArrivals from '@/components/sections/home/NewArrivals/NewArrivals';
import PopularCategories from '@/components/sections/home/PopularCategories/PopularCategories';
import Curated from '@/components/sections/home/Curated/Curated';
import SpecialOffers from '@/components/sections/home/SpecialOffers/SpecialOffers';
import Testimonials from '@/components/sections/home/Testimonials/Testimonials';
import WhyShopWithUs from '@/components/sections/home/WhyShopWithUs/WhyShopWithUs';
import OurStory from '@/components/sections/home/OurStory/OurStory';
import AboutCta from '@/components/sections/home/AboutCta/AboutCta';
import VisitUs from '@/components/sections/shared/VisitUs/VisitUs';

const HOME_META = {
  title: "Behna Clothing Studio | Women's Ethnic Wear in Jaipur",
  description:
    'Behna Clothing Studio in Jaipur — handcrafted 3 piece suits, kurtis, anarkali, co-ord sets & festival wear for women. Gandhi Path West, Lalarpura, Jaipur. Open Mon–Sat 10:30 AM–10 PM.',
  canonical: 'https://behna.in/',
  ogTitle: "Behna Clothing Studio | Women's Ethnic Wear in Jaipur",
  ogDescription:
    'Handcrafted ethnic wear for women — 3 piece suits, kurtis, anarkali, co-ord sets & festival wear. Visit us in Jaipur, Rajasthan.',
};

export default function HomePage() {
  useDocumentMeta(HOME_META);

  return (
    <>
      <Hero />
      <Intro />
      <NewArrivals />
      <PopularCategories />
      <Curated />
      <SpecialOffers />
      <Testimonials />
      <WhyShopWithUs />
      <OurStory />
      <AboutCta />
      <VisitUs />
    </>
  );
}
