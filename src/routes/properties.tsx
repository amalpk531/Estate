import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";

import { PropertyCard } from "@/components/property/PropertyCard";
import {
  filterProperties,
  properties,
  PROPERTY_TYPES,
  type PropertyFilters,
} from "@/lib/properties";

type Search = PropertyFilters;

function num(value: unknown) {
  const n = Number(value);
  return Number.isFinite(n) && String(value ?? "").trim() !== "" ? n : undefined;
}

function str(value: unknown) {
  const s = typeof value === "string" ? value.trim() : "";
  return s === "" ? undefined : s;
}

export const Route = createFileRoute("/properties")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    q: str(search['q']),
    city: str(search['city']),
    listing: str(search['listing']),
    type: str(search['type']),
    min_price: num(search['min_price']),
    max_price: num(search['max_price']),
    beds: str(search['beds']),
    sort: str(search['sort']),
  }),
  head: () => ({
    meta: [
      { title: "Browse Properties — Estate" },
      {
        name: "description",
        content:
          "Search apartments, villas, houses and land for sale or rent. Filter by city, price, bedrooms and property type.",
      },
      { property: "og:title", content: "Browse Properties — Estate" },
      {
        property: "og:description",
        content: "Search apartments, villas, houses and land for sale or rent across India.",
      },
    ],
  }),
  component: PropertiesPage,
});

const selectClass =
  "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/25";

function PropertiesPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/properties" });
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = filterProperties(properties, search);
  const hasFilters = Object.values(search).some((v) => v !== undefined);

  const update = (patch: Partial<Search>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }) });

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
      <header className="mb-4">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">The collection</p>
        <h1 className="mt-1 text-3xl font-semibold sm:text-4xl">Find your next place</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Browse verified listings across Kerala, Karnataka and Tamil Nadu.
        </p>
      </header>

      <div className="space-y-6">
        <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-card px-4 py-3 shadow-card sm:px-5">
          <div>
            <p className="text-sm font-semibold">{results.length} properties found</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Refine your search when needed</p>
          </div>
          <button
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
            aria-expanded={filtersOpen}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <SlidersHorizontal className="size-4" />
            Filter{hasFilters ? ` (${Object.values(search).filter(Boolean).length})` : ""}
            <ChevronDown className={`size-4 transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
          </button>
        </div>

        {filtersOpen && (
        <aside className="grid gap-5 rounded-3xl border border-border/70 bg-card p-5 shadow-card md:grid-cols-2 lg:grid-cols-5 lg:p-6">
          <div className="flex items-center gap-2 text-sm font-semibold lg:col-span-5">
            <SlidersHorizontal className="size-4" />
            Filters
          </div>

          <label className="block space-y-1.5 lg:col-span-2">
            <span className="text-sm font-medium">Location</span>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                className={`${selectClass} pl-9`}
                placeholder="City or locality"
                value={search.q ?? ""}
                onChange={(e) => update({ q: e.target.value || undefined })}
              />
            </div>
          </label>

          <div className="space-y-1.5">
            <span className="text-sm font-medium">Listing</span>
            <div className="grid grid-cols-3 gap-2">
              {["Buy", "Rent"].map((option) => {
                const active = search.listing === option;
                return (
                  <button
                    key={option}
                    onClick={() => update({ listing: active ? undefined : option })}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input hover:bg-secondary"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Property type</span>
            <select
              className={selectClass}
              value={search.type ?? ""}
              onChange={(e) => update({ type: e.target.value || undefined })}
            >
              <option value="">All types</option>
              {PROPERTY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          <div className="space-y-1.5">
            <span className="text-sm font-medium">Price range (₹)</span>
            <div className="grid grid-cols-2 gap-2">
              <input
                className={selectClass}
                inputMode="numeric"
                placeholder="Min"
                value={search.min_price ?? ""}
                onChange={(e) => update({ min_price: num(e.target.value) })}
              />
              <input
                className={selectClass}
                inputMode="numeric"
                placeholder="Max"
                value={search.max_price ?? ""}
                onChange={(e) => update({ max_price: num(e.target.value) })}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-sm font-medium">Bedrooms</span>
            <div className="grid grid-cols-4 gap-2">
              {["1", "2", "3", "4+"].map((b) => {
                const active = search.beds === b;
                return (
                  <button
                    key={b}
                    onClick={() => update({ beds: active ? undefined : b })}
                    className={`rounded-lg border px-2 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input hover:bg-secondary"
                    }`}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
          </div>

          {hasFilters && (
            <button
              onClick={() => navigate({ search: {} })}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-input px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary lg:col-span-5"
            >
              <X className="size-4" />
              Clear filters
            </button>
          )}
        </aside>
        )}

        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">Browse the latest listings</p>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Sort by</span>
              <select
                className="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring"
                value={search.sort ?? "newest"}
                onChange={(e) =>
                  update({ sort: e.target.value === "newest" ? undefined : e.target.value })
                }
              >
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </label>
          </div>

          {results.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
              <h2 className="text-lg font-semibold">No properties found</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Try widening your price range or clearing a filter.
              </p>
              <button
                onClick={() => navigate({ search: {} })}
                className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
