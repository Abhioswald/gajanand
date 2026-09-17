import React from 'react';
import ScrollVideoHero from './components/ScrollVideoHero';
import BrandStory from './components/BrandStory';
import IngredientsSection from './components/IngredientsSection';
import OrderCTA from './components/OrderCTA';
import LocationsSection from './components/LocationsSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <main className="w-full bg-[#120B07] min-h-screen">
      <ScrollVideoHero />
      <BrandStory />
      <IngredientsSection />
      <OrderCTA />
      <LocationsSection />
      <Footer />
    </main>
  );
}






