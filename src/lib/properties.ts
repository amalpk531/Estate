import data from "@/data/properties.json";

export type Photo = {
  url: string;
  category: string;
  caption: string;
  isCover: boolean;
};

export type Video = {
  type: "walkthrough" | "drone";
  url: string;
  thumbnail: string;
  title: string;
};

export type Property = {
  id: string;
  slug: string;
  title: string;
  type: "Apartment" | "Villa" | "House" | "Land";
  listingType: "Buy" | "Rent";
  status: string;
  price: number;
  priceDisplay: string;
  location: { city: string; locality: string; state: string };
  specs: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    parking: number;
    furnishing: string;
  };
  description: string;
  amenities: string[];
  photos: Photo[];
  videos: Video[];
  createdAt: string;
  featured: boolean;
};

export const properties = data as Property[];

export const PROPERTY_TYPES = ["Apartment", "Villa", "House", "Land"] as const;

export function getPropertyBySlug(slug: string) {
  return properties.find((p) => p.slug === slug);
}

export function coverPhoto(p: Property) {
  return (p.photos.find((ph) => ph.isCover) ?? p.photos[0])?.url ?? "";
}

/** Formats an amount the Indian way: ₹85 Lakhs / ₹1.25 Cr / ₹22,000/mo */
export function formatPrice(property: Pick<Property, "price" | "listingType">) {
  const { price, listingType } = property;
  if (listingType === "Rent") {
    return `₹${price.toLocaleString("en-IN")}/mo`;
  }
  if (price >= 10000000) {
    const cr = price / 10000000;
    return `₹${Number(cr.toFixed(2))} Cr`;
  }
  if (price >= 100000) {
    const lakhs = price / 100000;
    return `₹${Number(lakhs.toFixed(2))} Lakhs`;
  }
  return `₹${price.toLocaleString("en-IN")}`;
}

export type PropertyFilters = {
  q?: string | undefined;
  city?: string | undefined;
  listing?: string | undefined;
  type?: string | undefined;
  min_price?: number | undefined;
  max_price?: number | undefined;
  beds?: string | undefined;
  sort?: string | undefined;
};

export function filterProperties(list: Property[], f: PropertyFilters) {
  const q = (f.q ?? f.city ?? "").trim().toLowerCase();

  let result = list.filter((p) => {
    if (q) {
      const haystack =
        `${p.location.city} ${p.location.locality} ${p.location.state} ${p.title}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (f.listing && p.listingType.toLowerCase() !== f.listing.toLowerCase()) return false;
    if (f.type && p.type.toLowerCase() !== f.type.toLowerCase()) return false;
    if (typeof f.min_price === "number" && p.price < f.min_price) return false;
    if (typeof f.max_price === "number" && p.price > f.max_price) return false;
    if (f.beds) {
      const n = parseInt(f.beds, 10);
      if (f.beds === "4+") {
        if (p.specs.bedrooms < 4) return false;
      } else if (p.specs.bedrooms !== n) {
        return false;
      }
    }
    return true;
  });

  switch (f.sort) {
    case "price_asc":
      result = [...result].sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      result = [...result].sort((a, b) => b.price - a.price);
      break;
    default:
      result = [...result].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }
  return result;
}

export function similarProperties(current: Property, limit = 3) {
  return properties
    .filter(
      (p) =>
        p.id !== current.id &&
        (p.type === current.type || p.location.city === current.location.city),
    )
    .slice(0, limit);
}

export function whatsappLink(p: Property) {
  const msg = `Hi, I'm interested in Property ID #${p.id}. Please share more details.`;
  return `https://wa.me/919947809632?text=${encodeURIComponent(msg)}`;
}

export const CONTACT_PHONE = "+919947809632";

/** Returns a YouTube embed URL (no autoplay) or null when the url is not YouTube. */
export function youtubeEmbed(url: string) {
  const match = url.match(/(?:youtu\.be\/|v=)([A-Za-z0-9_-]{6,})/);
  return match ? `https://www.youtube.com/embed/${match[1]}?rel=0` : null;
}
