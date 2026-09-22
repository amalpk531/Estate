import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Building2, Search, ShieldCheck, Sparkles } from "lucide-react";

import { PropertyCard } from "@/components/property/PropertyCard";
import { properties, PROPERTY_TYPES } from "@/lib/properties";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Estate — Find Your Next Home in Kerala & South India" },
      {
        name: "description",
        content:
          "Browse handpicked apartments, villas, houses and land for sale or rent. Photos, video walkthroughs and instant enquiry.",
      },
      { property: "og:title", content: "Estate — Find Your Next Home" },
      {
        property: "og:description",
        content: "Handpicked apartments, villas, houses and land for sale or rent.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const featured = properties.filter((p) => p.featured).slice(0, 6);

  const stats = [
    { target: 500, suffix: "+", label: "Active listings" },
    { target: 4.9, suffix: "/5", decimals: 1, label: "Buyer rating" },
    { target: 2, suffix: " min", label: "Avg. response time" },
    { target: 15, suffix: "+", label: "Cities covered" },
  ];

  const categories = [
    {
      title: "Apartments",
      description: "Modern homes in growing urban hubs and smart communities.",
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Villas",
      description: "Private spaces with open layouts, gardens and scenic views.",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Plots & Land",
      description: "Find the right location to build your dream home or investment.",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const reasons = [
    {
      icon: ShieldCheck,
      title: "Verified listings",
      text: "Every property is screened for accuracy, location and value before going live.",
    },
    {
      icon: Building2,
      title: "Virtual tours",
      text: "Explore homes through video walkthroughs and image-rich detail pages.",
    },
    {
      icon: Sparkles,
      title: "Zero brokerage",
      text: "Connect directly with owners and save on hidden fees.",
    },
  ];

  const testimonials = [
    {
      quote:
        "The process felt effortless. We found a beautiful family home within a week and the walkthroughs made every decision easier.",
      name: "Ananya S.",
      role: "Home buyer",
    },
    {
      quote:
        "The filters and listing quality saved us hours. It was easy to compare options and contact owners directly.",
      name: "Rahul M.",
      role: "Investor",
    },
    {
      quote:
        "The video walkthrough gave us confidence before visiting. The home looked exactly like the listing photos.",
      name: "Meera K.",
      role: "First-time buyer",
    },
  ];

  return (
    <div>
      <section className="relative isolate min-h-screen overflow-hidden">
        <img
          src="/home.jpg"
          alt="Modern home exterior"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="hero-overlay absolute inset-0 -z-10" />

        <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 py-28 text-center sm:px-6 sm:py-36">
          <div className="w-full">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-on-overlay/15 px-4 py-1.5 text-xs font-medium text-on-overlay backdrop-blur">
            <Sparkles className="size-3.5" />
            {properties.length} handpicked listings
          </span>
          <h1 className="mt-5 text-4xl leading-tight text-on-overlay sm:text-6xl">
            Find a place that feels like home
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-on-overlay/85">
            Apartments, villas, houses and land across Kerala, Karnataka and Tamil Nadu — with real
            photos and video walkthroughs.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({
                to: "/properties",
                search: { q: query.trim() || undefined },
              });
            }}
            className="mx-auto mt-8 flex max-w-2xl flex-col gap-2 rounded-2xl border border-on-overlay/25 bg-on-overlay/8 p-2 shadow-float backdrop-blur-md sm:flex-row"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-on-overlay/75" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by city or locality — e.g. Calicut"
                className="w-full rounded-xl bg-transparent py-3 pl-9 pr-3 text-sm text-on-overlay outline-none placeholder:text-on-overlay/70"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Search
            </button>
          </form>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {PROPERTY_TYPES.map((t) => (
              <Link
                key={t}
                to="/properties"
                search={{ type: t }}
                className="rounded-full border border-on-overlay/30 px-4 py-1.5 text-sm text-on-overlay transition-colors hover:bg-on-overlay/15"
              >
                {t}
              </Link>
            ))}
          </div>
          </div>
        </div>
      </section>

      <section className="bg-card py-8 shadow-[inset_0_1px_0_hsl(var(--border))]">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 text-center sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-background/80 p-5">
              <CountUpStat
                target={stat.target}
                suffix={stat.suffix}
                {...(stat.decimals !== undefined && { decimals: stat.decimals })}
              />
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Explore by type</p>
            <h2 className="mt-2 text-3xl font-semibold">Find the right lifestyle</h2>
          </div>
          <Link
            to="/properties"
            className="hidden rounded-lg border border-input px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary sm:inline-block"
          >
            View all properties
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.title}
              to="/properties"
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-overlay to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-2xl text-on-overlay">{category.title}</h3>
                </div>
              </div>
              <div className="p-5 text-sm text-muted-foreground">{category.description}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Why Estate</p>
            <h2 className="mt-2 text-3xl font-semibold">A smarter way to discover property</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {reasons.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Featured homes</p>
            <h2 className="mt-2 text-3xl font-semibold">Most loved properties</h2>
          </div>
          <Link
            to="/properties"
            className="rounded-lg border border-input px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
          >
            View all properties
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Testimonials</p>
            <h2 className="mt-2 text-3xl font-semibold">People love the experience</h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.name} className="rounded-2xl border border-border bg-background p-6 shadow-card">
                <div className="mb-4 text-primary">★★★★★</div>
                <p className="text-base leading-7 text-foreground">“{item.quote}”</p>
                <div className="mt-5 border-t border-border pt-4">
                  <div className="font-semibold text-foreground">{item.name}</div>
                  <div className="text-sm text-muted-foreground">{item.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-linear-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary-foreground/80">
                Ready to move?
              </p>
              <h2 className="mt-2 text-4xl font-semibold sm:text-5xl">Let’s find your next address.</h2>
              <p className="mt-3 max-w-xl text-base text-primary-foreground/80">
                Browse verified listings, compare options, and connect with owners directly.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/properties"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-primary transition-opacity hover:opacity-90"
              >
                Explore listings
              </Link>
              <a
                href="https://wa.me/919947809632?text=Hi%2C%20I%27m%20interested%20in%20finding%20a%20property."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/35 bg-transparent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Talk on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CountUpStat({
  target,
  suffix,
  decimals = 0,
}: {
  target: number;
  suffix: string;
  decimals?: number;
}) {
  const [value, setValue] = useState(0);
  const statRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const element = statRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasStarted.current) return;
        hasStarted.current = true;
        const start = performance.now();
        const duration = 1200;

        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(target * eased);
          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={statRef} className="text-3xl font-semibold text-foreground">
      {value.toFixed(decimals)}
      {suffix}
    </div>
  );
}
