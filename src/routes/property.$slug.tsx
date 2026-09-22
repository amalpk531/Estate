import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Bath,
  BedDouble,
  Car,
  Check,
  Images,
  MapPin,
  MessageCircle,
  Phone,
  PlayCircle,
  Ruler,
  Sofa,
} from "lucide-react";

import { EnquiryForm } from "@/components/property/EnquiryForm";
import { Lightbox } from "@/components/property/Lightbox";
import { PropertyCard } from "@/components/property/PropertyCard";
import { VideoSection } from "@/components/property/VideoSection";
import {
  CONTACT_PHONE,
  coverPhoto,
  formatPrice,
  getPropertyBySlug,
  similarProperties,
  whatsappLink,
  type Property,
} from "@/lib/properties";

export const Route = createFileRoute("/property/$slug")({
  loader: ({ params }) => {
    const property = getPropertyBySlug(params.slug);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Property not found — Estate" }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData.property;
    const title = `${p.title}, ${p.location.city} — Estate`;
    const description = `${formatPrice(p)} · ${p.specs.bedrooms || "-"} beds · ${p.specs.area} sq.ft in ${p.location.locality}, ${p.location.city}.`;
    const image = coverPhoto(p);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: image },
        { name: "twitter:image", content: image },
      ],
    };
  },
  notFoundComponent: PropertyNotFound,
  component: PropertyDetails,
});

function PropertyNotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-28 text-center">
      <h1 className="text-3xl font-semibold">Property not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        This listing may have been sold or removed.
      </p>
      <Link
        to="/properties"
        className="mt-6 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
      >
        Browse all properties
      </Link>
    </div>
  );
}

function PropertyDetails() {
  const { property } = Route.useLoaderData();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const similar = similarProperties(property);
  const { specs, location } = property;

  return (
    <div className="pb-24 lg:pb-0">
      <MediaHero property={property} onOpen={() => setLightboxIndex(0)} />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_380px] lg:py-16">
        <div className="space-y-10">
          <section>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                For {property.listingType}
              </span>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                {property.type}
              </span>
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                {property.status}
              </span>
              <span className="text-xs text-muted-foreground">ID #{property.id}</span>
            </div>

            <h1 className="mt-3 text-4xl font-semibold">{property.title}</h1>
            <p className="mt-2 flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="size-4" />
              {location.locality}, {location.city}, {location.state}
            </p>
            <p className="mt-4 text-3xl font-semibold text-primary">
              {formatPrice(property)}
              <span className="ml-2 align-middle text-sm font-normal text-muted-foreground">
                {property.priceDisplay}
              </span>
            </p>
          </section>

          <section className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            <Spec icon={BedDouble} label="Bedrooms" value={specs.bedrooms || "—"} />
            <Spec icon={Bath} label="Bathrooms" value={specs.bathrooms || "—"} />
            <Spec icon={Ruler} label="Area" value={`${specs.area.toLocaleString("en-IN")} sq.ft`} />
            <Spec icon={Car} label="Parking" value={specs.parking || "—"} />
            <Spec icon={Sofa} label="Furnishing" value={specs.furnishing} />
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">About this property</h2>
            <p className="leading-relaxed text-muted-foreground">{property.description}</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Photos ({property.photos.length})</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {property.photos.map((photo, i) => (
                <button
                  key={photo.url}
                  onClick={() => setLightboxIndex(i)}
                  className="group relative aspect-4/3 overflow-hidden rounded-lg bg-muted"
                >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute bottom-2 left-2 rounded bg-overlay px-2 py-0.5 text-xs text-on-overlay">
                    {photo.category}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <VideoSection videos={property.videos} />

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Amenities</h2>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {property.amenities.map((a) => (
                <li key={a} className="flex items-center gap-2 text-sm">
                  <span className="flex size-6 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    <Check className="size-3.5" />
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
          <div className="hidden gap-3 lg:flex">
            <a
              href={`tel:${CONTACT_PHONE}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Phone className="size-4" />
              Call
            </a>
            <a
              href={whatsappLink(property)}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-success px-4 py-3 text-sm font-semibold text-success-foreground transition-opacity hover:opacity-90"
            >
              <MessageCircle className="size-4" />
              WhatsApp
            </a>
          </div>
          <div id="enquire">
            <EnquiryForm property={property} />
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          <h2 className="text-2xl font-semibold">Similar properties</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      )}

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 gap-2 border-t border-border bg-card p-3 shadow-float lg:hidden">
        <a
          href={`tel:${CONTACT_PHONE}`}
          className="flex items-center justify-center gap-1.5 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground"
        >
          <Phone className="size-4" />
          Call
        </a>
        <a
          href={whatsappLink(property)}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-lg bg-success py-3 text-sm font-semibold text-success-foreground"
        >
          <MessageCircle className="size-4" />
          WhatsApp
        </a>
        <a
          href="#enquire"
          className="flex items-center justify-center rounded-lg border border-input py-3 text-sm font-semibold"
        >
          Enquire
        </a>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={property.photos}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}

function MediaHero({ property, onOpen }: { property: Property; onOpen: () => void }) {
  return (
    <section className="relative">
      <button onClick={onOpen} className="block w-full">
        <div className="relative h-[42vh] min-h-72 w-full overflow-hidden bg-muted sm:h-[58vh]">
          <img
            src={coverPhoto(property)}
            alt={property.title}
            className="size-full object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="absolute bottom-4 left-4 flex gap-2 sm:bottom-6 sm:left-6">
            <span className="flex items-center gap-1.5 rounded-full bg-overlay px-3 py-1.5 text-xs font-medium text-on-overlay">
              <Images className="size-3.5" />
              {property.photos.length} Photos
            </span>
            {property.videos.length > 0 && (
              <span className="flex items-center gap-1.5 rounded-full bg-brass px-3 py-1.5 text-xs font-semibold text-brass-foreground">
                <PlayCircle className="size-3.5" />
                {property.videos.length} Videos
              </span>
            )}
          </div>
        </div>
      </button>
    </section>
  );
}

function Spec({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BedDouble;
  label: string;
  value: string | number;
}) {
  return (
            <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-card">
      <Icon className="size-4 text-primary" />
      <p className="mt-2 text-sm font-semibold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
