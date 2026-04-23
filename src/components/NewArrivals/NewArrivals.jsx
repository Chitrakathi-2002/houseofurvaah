import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from './SectionHeader';
import FilterTabs from './FilterTabs';
import HorizontalScrollTrack from './HorizontalScrollTrack';
import ParticleBurst from './ParticleBurst';

// Import images
import maroonSaree from '../../assets/products/maroon-saree.png';
import pinkSaree from '../../assets/products/pink-saree.png';
import navySaree from '../../assets/products/navy-saree.png';
import greenSaree from '../../assets/products/green-saree.png';
import beigeSaree from '../../assets/products/beige-saree.png';
import mintKurta from '../../assets/products/mint-kurta.png';
import coupleSet from '../../assets/products/couple-set.png';

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  { id:1, name:'Venetian Maroon Golden Zari Kanjivaram Silk Saree',
    fabric:'Kanjivaram Silk', occasion:'Wedding', weave:'Zari Gold',
    originalPrice:7198, salePrice:3599, discount:50, rating:4.9, reviewCount:86,
    badge:'BESTSELLER', category:'Sarees', image: maroonSaree,
    gradientColors:['#6B1F2A','#C9A84C','#8B1A2A'],
    tags:['Wedding','Festive'] },
  { id:2, name:'Baby Pink Feather Soft Drape Saree',
    fabric:'Georgette', occasion:'Sangeet', weave:'Feather Soft',
    originalPrice:6998, salePrice:3499, discount:50, rating:4.8, reviewCount:36,
    badge:'NEW', category:'Sarees', image: pinkSaree,
    gradientColors:['#E8B4B8','#F5D0D4','#C9A84C'],
    tags:['Sangeet','Party'] },
  { id:3, name:'Navy Blue Banarasi Katan Silk Saree',
    fabric:'Banarasi Katan', occasion:'Reception', weave:'Kalamkari Zari',
    originalPrice:13998, salePrice:6999, discount:50, rating:4.9, reviewCount:73,
    badge:'HOT', category:'Sarees', image: navySaree,
    gradientColors:['#0d2b5e','#1a4fa0','#C9A84C'],
    tags:['Reception','Wedding'] },
  { id:4, name:'Brunswick Green Zari Kanjivaram Silk Saree',
    fabric:'Kanjivaram Silk', occasion:'Festive', weave:'Golden Zari',
    originalPrice:7198, salePrice:3599, discount:50, rating:4.7, reviewCount:45,
    badge:'', category:'Sarees', image: greenSaree,
    gradientColors:['#1D6B4F','#2d9970','#C9A84C'],
    tags:['Festive','Haldi'] },
  { id:5, name:'Beige Net Handwork Saree — Silver Cutdana & Sequin',
    fabric:'Net Handwork', occasion:'Party', weave:'Embroidery',
    originalPrice:35199, salePrice:17599, discount:50, rating:4.5, reviewCount:12,
    badge:'NEW LAUNCH', category:'Sarees', image: beigeSaree,
    gradientColors:['#c8b88a','#e8d4a0','#9a8860'],
    tags:['Party','Reception'] },
  { id:6, name:'Maroon Satin Crepe — Silver Cutdana Beads Handwork',
    fabric:'Satin Crepe', occasion:'Reception', weave:'Handwork',
    originalPrice:63999, salePrice:25999, discount:59, rating:5.0, reviewCount:8,
    badge:'LUXURY', category:'Sarees', image: maroonSaree, // Reusing maroon for now
    gradientColors:['#5a0f18','#8B1A2A','#C9A84C'],
    tags:['Reception','Wedding'] },
  { id:7, name:'Mint Green Textured Jacquard Men\'s Kurta',
    fabric:'Jacquard', occasion:'Festive', weave:'Self-Design',
    originalPrice:4499, salePrice:2249, discount:50, rating:4.6, reviewCount:22,
    badge:'NEW', category:"Men's Kurta", image: mintKurta,
    gradientColors:['#1a5c40','#2d9b6e','#a0d4bc'],
    tags:['Festive','Sangeet'] },
  { id:8, name:'Yellow Gold Zari Kanjivaram + Shibori Kurta Couple Set',
    fabric:'Kanjivaram + Cotton', occasion:'Mehendi', weave:'Zari',
    originalPrice:13399, salePrice:6199, discount:54, rating:4.8, reviewCount:12,
    badge:'COUPLE SET', category:'Couple Sets', image: coupleSet,
    gradientColors:['#c9a84c','#e8c060','#6B1F2A'],
    tags:['Mehendi','Haldi'] },
];

const NewArrivals = () => {
  const [activeTab, setActiveTab] = useState('All');
  const filteredProducts = activeTab === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeTab);

  useEffect(() => {
    // Refresh ScrollTrigger when products change
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [activeTab]);

  return (
    <section id="new-arrivals" className="bg-[#0A0A0F] pb-[120px] relative z-10">
      <SectionHeader />
      <FilterTabs activeTab={activeTab} onChange={setActiveTab} />
      <HorizontalScrollTrack products={filteredProducts} />
      <ParticleBurst />
    </section>
  );
};

export default NewArrivals;
export { PRODUCTS };
