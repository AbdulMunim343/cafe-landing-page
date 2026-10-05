/**
 * OpeningHours Component
 *
 * Displays business opening hours information.
 * Features:
 * - Two-column layout: Image side (desktop) and Hours side
 * - Background image with overlay on hours side
 * - Badge overlay on image side
 * - Opening and closing time for every day of the week (from data/cafeInfo)
 * - Today's row highlighted, with a live "Open now" / "Closed now" status
 * - Responsive: Single column on mobile, two columns on desktop
 */

"use client"; // Uses hooks to compute today's status in the visitor's timezone

import { useEffect, useState } from "react";
import Image from "next/image";
import Badge from "./Badge";
import Separator from "./Separator";
import { formatTime, isOpenAt, openingHours } from "@/data/cafeInfo";

const OpeningHours = () => {
  // Computed after mount only, so the prerendered HTML doesn't depend on
  // the server's clock (avoids hydration mismatches)
  const [today, setToday] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setToday(now.getDay());
      setIsOpen(isOpenAt(now));
    };
    update();
    // Refresh every minute so the status flips at opening/closing time
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="flex bg-primary min-h-[60vh] xl:min-h-[80vh]">
      {/* Left Side - Image with Badge Overlay (Hidden on mobile, visible on xl) */}
      <div className="hidden relative xl:flex flex-1 justify-center items-center">
        {/* Dark Overlay - 60% opacity for contrast */}
        <div className="w-full h-full absolute z-40 top-0 bg-black/60" />
        {/* Background Image */}
        <Image
          src="/assets/opening-hours/img.png"
          fill
          alt=""
          quality={100}
          priority
          className="object-cover"
        />
        {/* Badge Overlay - Centered over image */}
        <Badge containerStyles="w-[320px] h-[320px] absolute z-40" />
      </div>

      {/* Right Side - Opening Hours Content */}
      <div className="flex-1 bg-opening_hours bg-cover bg-no-repeat flex flex-col justify-center items-center relative py-16">
        {/* Dark Overlay - 85% opacity for text readability */}
        <div className="w-full h-full absolute top-0 bg-black/[0.85] z-10" />

        {/* Content Container */}
        <div className="z-20 flex flex-col items-center justify-center w-full px-4">
          {/* Section Title */}
          <h2 className="h2 text-white mb-4 text-center">Opening Hours</h2>

          {/* Decorative Separator */}
          <Separator bg="accent" />

          {/* Live Status - rendered once the visitor's local time is known */}
          <div className="h-[36px] mt-8">
            {isOpen !== null && (
              <span
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm uppercase tracking-widest font-semibold ${
                  isOpen ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isOpen ? "bg-green-400" : "bg-red-400"}`} />
                {isOpen ? "Open now" : "Closed now"}
              </span>
            )}
          </div>

          {/* Weekly Schedule - Day, opening time, closing time */}
          <ul className="mt-6 w-full max-w-[420px] text-white/80">
            {openingHours.map(({ day, label, open, close }) => {
              const isToday = day === today;
              return (
                <li
                  key={day}
                  className={`flex items-center justify-between gap-4 py-3 px-4 border-b border-white/10 ${
                    isToday ? "text-accent font-semibold bg-white/5 rounded-md" : ""
                  }`}
                >
                  <span className="uppercase tracking-widest text-sm">
                    {label}
                    {isToday && <span className="ml-2 normal-case tracking-normal text-xs">(today)</span>}
                  </span>
                  <span className="font-primary text-xl">
                    {formatTime(open)} &ndash; {formatTime(close)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default OpeningHours;
