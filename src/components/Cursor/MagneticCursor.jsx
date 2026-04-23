import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import gsap from 'gsap';

const MagneticCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorType, setCursorType] = useState('DEFAULT'); // DEFAULT, PRODUCT, CTA, LINK
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    setIsVisible(true);
    
    // Hide default cursor
    const style = document.createElement('style');
    style.innerHTML = '* { cursor: none !important; }';
    document.head.appendChild(style);

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Dot cursor follows directly
      if (dotRef.current) {
        gsap.set(dotRef.current, { x: clientX, y: clientY });
      }

      // Ring cursor follows with lag
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.15,
          ease: 'power2.out',
        });
      }
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (target.closest('.product-card')) {
        setCursorType('PRODUCT');
      } else if (target.closest('button, .cta')) {
        setCursorType('CTA');
      } else if (target.closest('a, .nav-link')) {
        setCursorType('LINK');
      } else {
        setCursorType('DEFAULT');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.head.removeChild(style);
    };
  }, []);

  if (!isVisible) return null;

  const renderCursor = () => {
    let dotStyle = "w-[10px] h-[10px] bg-gold";
    let ringStyle = "w-[40px] h-[40px] border-[1.5px] border-gold";
    let ringContent = null;

    if (cursorType === 'PRODUCT') {
      dotStyle = "opacity-0";
      ringStyle = "w-[80px] h-[80px] bg-gold/12 border-gold";
      ringContent = <span className="text-gold text-[12px] font-body">VIEW</span>;
    } else if (cursorType === 'CTA') {
      dotStyle = "w-[8px] h-[8px] bg-maroon";
      ringStyle = "w-[60px] h-[60px] border-[2px] border-gold";
    } else if (cursorType === 'LINK') {
      ringStyle = "w-[20px] h-[20px] border-gold rotate-45";
      dotStyle = "w-[4px] h-[4px] bg-gold rotate-45";
    }

    return (
      <>
        {/* Dot Cursor */}
        <div
          ref={dotRef}
          aria-hidden="true"
          className={`fixed top-0 left-0 -ml-[5px] -mt-[5px] rounded-full pointer-events-none z-[99999] transition-all duration-300 ease-out ${dotStyle}`}
        />
        {/* Ring Cursor */}
        <div
          ref={ringRef}
          aria-hidden="true"
          className={`fixed top-0 left-0 -ml-[20px] -mt-[20px] rounded-full pointer-events-none z-[99998] transition-all duration-300 ease-out flex items-center justify-center origin-center ${ringStyle}`}
          style={{
            marginLeft: cursorType === 'PRODUCT' ? '-40px' : cursorType === 'CTA' ? '-30px' : cursorType === 'LINK' ? '-10px' : '-20px',
            marginTop: cursorType === 'PRODUCT' ? '-40px' : cursorType === 'CTA' ? '-30px' : cursorType === 'LINK' ? '-10px' : '-20px',
          }}
        >
          {ringContent}
        </div>
      </>
    );
  };

  return ReactDOM.createPortal(renderCursor(), document.body);
};

export default MagneticCursor;
