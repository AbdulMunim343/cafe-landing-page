/**
 * Location Component
 *
 * "Find Us" section with an embedded Google Map and contact details.
 * Features:
 * - Embedded Google Maps iframe (no API key required)
 * - Address, phone, email and a short opening-times summary
 * - "Get directions" button opening Google Maps in a new tab
 * - Responsive: stacked on mobile, side by side on desktop
 *
 * The address and map location come from data/cafeInfo.ts.
 */

import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";
import Separator from "./Separator";
import { cafeAddress, formatTime, openingHours } from "@/data/cafeInfo";

const Location = () => {
  const query = encodeURIComponent(cafeAddress.mapQuery);
  const embedSrc = `https://maps.google.com/maps?q=${query}&z=15&output=embed`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${query}`;

  // Group consecutive days that share the same hours, e.g. "Mon – Thu"
  const hourGroups = openingHours.reduce<{ from: string; to: string; open: string; close: string }[]>(
    (groups, d) => {
      const last = groups[groups.length - 1];
      const short = d.label.slice(0, 3);
      if (last && last.open === d.open && last.close === d.close) last.to = short;
      else groups.push({ from: short, to: short, open: d.open, close: d.close });
      return groups;
    },
    []
  );

  const details = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Address",
      lines: [cafeAddress.street, cafeAddress.city],
    },
    {
      icon: <FaClock />,
      title: "Hours",
      lines: hourGroups.map(
        (g) =>
          `${g.from === g.to ? g.from : `${g.from} – ${g.to}`}: ${formatTime(g.open)} – ${formatTime(g.close)}`
      ),
    },
    { icon: <FaPhoneAlt />, title: "Phone", lines: [cafeAddress.phone] },
    { icon: <FaEnvelope />, title: "Email", lines: [cafeAddress.email] },
  ];

  return (
    <section id="location" className="pt-12 pb-16 xl:pt-16 xl:pb-36">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-12 xl:mb-20">
          <h2 className="h2 text-center">Find Us</h2>
          <div className="mb-4">
            <Separator bg="accent" />
          </div>
          <p className="text-center max-w-[620px] mx-auto">
            Drop by for a fresh cup — we&apos;d love to see you. Here&apos;s where to find us.
          </p>
        </div>

        {/* Map + Contact Card */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Embedded Map - spans 2 of 3 columns on desktop */}
          <div className="xl:col-span-2 h-[360px] xl:h-auto xl:min-h-[520px] rounded-2xl overflow-hidden border border-primary/10 shadow-sm">
            <iframe
              title="Coffee shop location map"
              src={embedSrc}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          {/* Contact Details Card */}
          <div className="flex flex-col justify-between gap-8 bg-primary text-white/80 rounded-2xl p-8">
            <ul className="flex flex-col gap-6">
              {details.map((item) => (
                <li key={item.title} className="flex gap-4">
                  <span className="w-[44px] h-[44px] shrink-0 rounded-full bg-accent/15 text-accent flex items-center justify-center">
                    {item.icon}
                  </span>
                  <div>
                    <h3 className="font-primary text-white text-[22px] leading-none mb-2">
                      {item.title}
                    </h3>
                    {item.lines.map((line) => (
                      <p key={line} className="text-[15px]">
                        {line}
                      </p>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn flex items-center justify-center w-full"
            >
              Get directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
