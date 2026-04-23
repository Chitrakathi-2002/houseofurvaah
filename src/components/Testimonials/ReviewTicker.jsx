import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const ReviewTicker = () => {
  const ticker1Ref = useRef(null);
  const ticker2Ref = useRef(null);
  const speedRef = useRef({ row1: 0.8, row2: 0.5 });
  const isHovered = useRef(false);

  const row1Content = "Simply the Best ★★★★★  ✦  10/10 Experience ★★★★★  ✦  Most Beautiful Saree I Own ★★★★★  ✦  Worth Every Rupee ★★★★★  ✦  True to Picture ★★★★★  ✦  Perfect for Roka Ceremony ★★★★★  ✦  5 Stars Are Not Enough ★★★★★  ✦  Drapes Like a Glove ★★★★★  ✦";
  const row2Content = "✦ Venetian Maroon Kanjivaram  ✦  Barbie Pink Silk  ✦  Navy Blue Banarasi  ✦  Rust Orange Satin  ✦  Brunswick Green Zari  ✦  Baby Pink Feather Soft  ✦  Coral Peach Satin  ✦  Raspberry Pink Kanjivaram  ✦";

  useEffect(() => {
    let xPos1 = 0;
    let xPos2 = 0;
    
    // Duplicate content for seamless loop
    const tickWidth1 = ticker1Ref.current.scrollWidth / 2;
    const tickWidth2 = ticker2Ref.current.scrollWidth / 2;

    const tick = () => {
      // Smoothly ramp speed on hover
      const targetRow1 = isHovered.current ? 0 : 0.8;
      const targetRow2 = isHovered.current ? 0 : 0.5;
      
      speedRef.current.row1 = gsap.utils.interpolate(speedRef.current.row1, targetRow1, 0.05);
      speedRef.current.row2 = gsap.utils.interpolate(speedRef.current.row2, targetRow2, 0.05);

      xPos1 -= speedRef.current.row1;
      xPos2 += speedRef.current.row2;

      if (Math.abs(xPos1) >= tickWidth1) xPos1 = 0;
      if (xPos2 >= 0) xPos2 = -tickWidth2;

      gsap.set(ticker1Ref.current, { x: xPos1 });
      gsap.set(ticker2Ref.current, { x: xPos2 });
    };

    const id = gsap.ticker.add(tick);

    return () => gsap.ticker.remove(id);
  }, []);

  return (
    <div 
      className="w-full py-2 bg-gold/5 border-y border-gold/15 overflow-hidden relative"
      onMouseEnter={() => isHovered.current = true}
      onMouseLeave={() => isHovered.current = false}
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
      }}
    >
      {/* Row 1: Reviews */}
      <div className="flex whitespace-nowrap mb-1">
        <div ref={ticker1Ref} className="flex gap-8 items-center px-4">
          <span className="font-body text-[13px] text-gold tracking-wider uppercase whitespace-nowrap">
            {row1Content}
          </span>
          <span className="font-body text-[13px] text-gold tracking-wider uppercase whitespace-nowrap">
            {row1Content}
          </span>
        </div>
      </div>

      {/* Row 2: Products */}
      <div className="flex whitespace-nowrap">
        <div ref={ticker2Ref} className="flex gap-12 items-center px-4">
          <span className="font-body text-[11px] text-gold/40 tracking-[3px] uppercase whitespace-nowrap">
            {row2Content}
          </span>
          <span className="font-body text-[11px] text-gold/40 tracking-[3px] uppercase whitespace-nowrap">
            {row2Content}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReviewTicker;
