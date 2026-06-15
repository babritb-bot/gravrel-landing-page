import React from "react";

const TaglineBar = () => {
  return (
    <div
      data-testid="tagline-bar"
      className="hidden lg:block fixed top-0 inset-x-0 z-[60] bg-[#0b1f3a] text-[#a7db9b] text-[12.5px] font-medium tracking-wide"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-1.5 text-center">
        Gravrel — where gravity meets relativity in an eco-conscious datacenter built
        for growth, innovation, and reliability.
      </div>
    </div>
  );
};

export default TaglineBar;
