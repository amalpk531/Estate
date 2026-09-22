import { Link } from "@tanstack/react-router";
import { Bath, BedDouble, MapPin, Maximize, PlayCircle } from "lucide-react";

import { coverPhoto, formatPrice, type Property } from "@/lib/properties";

export function PropertyCard({ property }: { property: Property }) {
  const { specs, location } = property;

  return (
    <Link
      to="/property/$slug"
      params={{ slug: property.slug }}
      className="group block overflow-hidden rounded-3xl border border-border/70 bg-card shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-float"
    >
      <div className="relative aspect-2/1 overflow-hidden bg-muted">
        <img
          src={coverPhoto(property)}
          alt={property.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/5 to-black/10" />
        <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
          <span className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm">
            For {property.listingType}
          </span>
          {property.videos.length > 0 && (
            <span className="flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
              <PlayCircle className="size-3.5" />
              Video tour
            </span>
          )}
        </div>
        <div className="absolute inset-x-4 bottom-4 text-white">
          <span className="text-xl font-semibold drop-shadow-sm">{formatPrice(property)}</span>
        </div>
      </div>

      <div className="space-y-4 p-6">
        <div className="min-w-0">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            {property.type}
          </p>
          <h3 className="truncate text-xl font-semibold">{property.title}</h3>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" />
            {location.locality}, {location.city}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {specs.bedrooms > 0 && (
            <span className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
              <BedDouble className="size-3.5" />
              {specs.bedrooms} beds
            </span>
          )}
          {specs.bathrooms > 0 && (
            <span className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
              <Bath className="size-3.5" />
              {specs.bathrooms} baths
            </span>
          )}
          <span className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
            <Maximize className="size-3.5" />
            {specs.area.toLocaleString("en-IN")} sq.ft
          </span>
        </div>
      </div>
    </Link>
  );
}
