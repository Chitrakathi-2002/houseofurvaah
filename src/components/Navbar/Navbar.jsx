import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnnouncementBar from './AnnouncementBar';
import MegaMenu from './MegaMenu';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Sarees', hasMega: true },
    { name: 'Blouses', hasMega: false },
    { name: "Men's Kurta", hasMega: false },
    { name: 'Collections', hasMega: false },
    { name: 'Blog', hasMega: false },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-[1000] transition-all duration-400">
      <AnnouncementBar />
      
      <nav 
        className={`w-full transition-all duration-400 ease-in-out px-6 md:px-12 py-4 flex items-center justify-between ${
          scrolled 
            ? 'glass py-3' 
            : 'bg-transparent'
        }`}
      >
        {/* Left: Logo */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <svg 
            width="24" height="24" viewBox="0 0 24 24" fill="none" 
            className="lotus-icon text-gold"
          >
            <path 
              d="M12 22c0 0-8-4-8-10s4-10 8-10 8 4 8 10-8 10-8 10z" 
              stroke="currentColor" strokeWidth="1.5"
            />
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1" />
          </svg>
          <h1 className="font-display text-[22px] text-gold tracking-tight font-bold">
            House of Urvaah
          </h1>
        </div>

        {/* Center: Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              className="relative py-2"
              onMouseEnter={() => link.hasMega && setActiveMenu('Sarees')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <a 
                href="#" 
                className="nav-link font-body text-[14px] uppercase tracking-widest text-ivory/90 hover:text-gold"
              >
                {link.name}
              </a>
              {link.hasMega && (
                <MegaMenu isOpen={activeMenu === 'Sarees'} />
              )}
            </div>
          ))}
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-5">
          <button className="text-ivory/90 hover:text-gold transition-colors">
            <Search size={20} />
          </button>
          <button className="text-ivory/90 hover:text-gold transition-colors hidden sm:block">
            <Heart size={20} />
          </button>
          <button className="relative text-ivory/90 hover:text-gold transition-colors">
            <ShoppingBag size={20} />
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold text-dark text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
              2
            </span>
          </button>
          <button className="hidden md:flex items-center gap-2 px-4 py-2 border border-gold/30 rounded-full text-gold hover:bg-gold hover:text-dark transition-all duration-300 font-body text-[13px] tracking-wide">
            <User size={16} />
            <span>Login</span>
          </button>
          
          {/* Mobile Toggle */}
          <button 
            className={`lg:hidden flex flex-col gap-1.5 z-50 hamburger ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="w-6 h-0.5 bg-gold line-1 hamburger-line"></span>
            <span className="w-6 h-0.5 bg-gold line-2 hamburger-line"></span>
            <span className="w-6 h-0.5 bg-gold line-3 hamburger-line"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#0A0A0F] z-[999] flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, idx) => (
              <motion.a
                key={link.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 + 0.2 }}
                href="#"
                className="text-2xl font-display text-ivory hover:text-gold transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
