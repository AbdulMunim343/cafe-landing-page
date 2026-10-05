/**
 * MenuItem Component
 *
 * Individual menu item displayed as a card.
 * Shows coffee item image, name, description, and price, with a
 * hover effect that lifts the card and highlights its border.
 *
 * Props:
 * @param imgSrc - Path to item image (must start with '/')
 * @param name - Item name (displayed in uppercase)
 * @param description - Item description text
 * @param price - Item price (formatted to 2 decimal places)
 */

import Image from "next/image";
import React from "react";

type PropsType = {
  imgSrc: `/${string}`; // Template literal type: string starting with '/'
  name: string;
  description: string;
  price: number;
};

const MenuItem = ({ imgSrc, name, description, price }: PropsType) => {
  return (
    <div className="group h-full flex flex-col items-center text-center bg-white border border-primary/10 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-accent transition-all duration-300">
      {/* Item Image - Circular, on a soft accent backdrop */}
      <div className="w-[120px] h-[120px] rounded-full bg-accent/10 flex items-center justify-center mb-6">
        <div className="relative w-[96px] h-[96px] rounded-full group-hover:scale-110 transition-transform duration-300">
          <Image
            src={imgSrc}
            fill
            alt={name}
            quality={100} // Maximum image quality
            className="object-cover" // Covers circle while maintaining aspect ratio
          />
        </div>
      </div>

      {/* Item Name - Uppercase, bold */}
      <h3 className="uppercase font-primary font-semibold text-[24px] leading-none text-primary mb-3">
        {name}
      </h3>

      {/* Item Description - flex-1 keeps prices aligned across cards */}
      <p className="flex-1 mb-6">{description}</p>

      {/* Price Badge */}
      <span className="inline-flex items-center justify-center min-w-[96px] h-[44px] px-4 rounded-full bg-accent/15 font-primary font-semibold text-[26px] leading-none text-primary group-hover:bg-accent transition-colors duration-300">
        ${price.toFixed(2)}
      </span>
    </div>
  );
};

export default MenuItem;
