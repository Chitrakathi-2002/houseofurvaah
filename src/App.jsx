import React from 'react';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/Hero/HeroSection';
import NewArrivals from './components/NewArrivals/NewArrivals';
import OccasionsSection from './components/Occasions/OccasionsSection';
import TestimonialsSection from './components/Testimonials/TestimonialsSection';
import Footer from './components/Footer/Footer';
import MagneticCursor from './components/Cursor/MagneticCursor';

function App() {
  return (
    <div className="min-h-screen bg-dark">
      <MagneticCursor />
      <Navbar />
      <main>
        <HeroSection />
        <NewArrivals />
        <OccasionsSection />
        <TestimonialsSection />
        <Footer />
      </main>
    </div>
  );
}

export default App;
