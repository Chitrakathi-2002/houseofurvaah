import React from 'react';

const AnnouncementBar = () => {
  const text = "✦ First Order? Extra 10% Off ✦ 5% Off on Prepaid Orders ✦ Free Gift Packaging ✦ COD Available Across India ✦";
  
  return (
    <div className="h-[36px] bg-[#6B1F2A] overflow-hidden flex items-center relative z-50">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        <span className="text-[10px] md:text-xs font-body tracking-wider text-[#C9A84C] px-4">
          {text} {text} {text} {text}
        </span>
      </div>
    </div>
  );
};

export default AnnouncementBar;
