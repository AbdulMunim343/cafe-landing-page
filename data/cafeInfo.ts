/**
 * Cafe Info
 *
 * Single source of truth for the cafe's address and opening hours.
 * Used by the OpeningHours and Location sections. Edit the values here
 * to update them everywhere on the site.
 */

// Address shown in the Location section and used for the embedded map
export const cafeAddress = {
  street: "123 Coffee Street",
  city: "New York, NY 10001",
  phone: "+1 (555) 123-4567",
  email: "hello@coffeeshop.com",
  // Query passed to Google Maps - an address or "lat,lng" both work
  mapQuery: "123 Coffee Street, New York, NY 10001",
} as const;

// Opening hours per day, in 24-hour "HH:MM" format.
// `day` follows JavaScript's Date.getDay(): 0 = Sunday ... 6 = Saturday.
export const openingHours = [
  { day: 1, label: "Monday", open: "07:00", close: "21:00" },
  { day: 2, label: "Tuesday", open: "07:00", close: "21:00" },
  { day: 3, label: "Wednesday", open: "07:00", close: "21:00" },
  { day: 4, label: "Thursday", open: "07:00", close: "21:00" },
  { day: 5, label: "Friday", open: "07:00", close: "22:00" },
  { day: 6, label: "Saturday", open: "08:00", close: "22:00" },
  { day: 0, label: "Sunday", open: "08:00", close: "18:00" },
] as const;

// Converts "HH:MM" (24h) to a readable "h:MM AM/PM" string
export const formatTime = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${suffix}`;
};

// Returns whether the cafe is open at the given moment (visitor's local time)
export const isOpenAt = (date: Date) => {
  const today = openingHours.find((d) => d.day === date.getDay());
  if (!today) return false;
  const toMinutes = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const now = date.getHours() * 60 + date.getMinutes();
  return now >= toMinutes(today.open) && now < toMinutes(today.close);
};
