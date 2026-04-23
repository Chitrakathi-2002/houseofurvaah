import React from 'react';
import ThreeBackground from './ThreeBackground';
import HeroText from './HeroText';
import ProductCard3D from './ProductCard3D';
import ScrollIndicator from './ScrollIndicator';

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-dark">
      {/* 3D Background */}
      <ThreeBackground />

      {/* HTML Content Overlay */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex flex-col lg:flex-row items-center justify-between pt-24 pb-12 gap-12">
        <HeroText />
        <ProductCard3D />
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
};

export default HeroSection;
