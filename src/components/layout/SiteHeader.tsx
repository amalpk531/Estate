import { Link, useLocation } from "@tanstack/react-router";
import { Home } from "lucide-react";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setScrolled(false);
      return;
    }

    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <header
      className={
        isHome
          ? `fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color,backdrop-filter,color] duration-500 ease-out ${
              scrolled
                ? "border-b border-white/40 bg-white/55 shadow-sm backdrop-blur-md"
                : "bg-transparent"
            }`
          : "sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur"
      }
    >
      <div
        className={
          isHome
            ? "mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6"
            : "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6"
        }
      >
        <Link
          to="/"
          className={
            isHome
              ? `flex items-center gap-2 transition-[color,transform] duration-500 ease-out ${
                  scrolled ? "text-slate-900" : "text-white drop-shadow-sm"
                }`
              : "flex items-center gap-2 text-foreground"
          }
        >
          <span
            className={
              isHome
                ? `flex size-9 items-center justify-center rounded-lg transition-[background-color,color,box-shadow] duration-500 ease-out ${
                    scrolled
                      ? "bg-slate-900 text-white"
                      : "bg-white/12 text-white ring-1 ring-white/20 backdrop-blur-sm"
                  }`
                : "flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground"
            }
          >
            <Home className="size-4.5" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">Estate</span>
        </Link>

        <nav className="flex items-center gap-1 text-sm font-medium">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{
              className: isHome
                ? scrolled
                  ? "bg-slate-900/6 text-slate-900"
                  : "bg-white/12 text-white"
                : "bg-secondary text-foreground",
            }}
            className={
              isHome
                ? `rounded-full px-4 py-2.5 transition-colors ${
                    scrolled ? "text-slate-700 hover:text-slate-900" : "text-white/80 hover:text-white"
                  }`
                : "rounded-full px-4 py-2.5 text-muted-foreground transition-colors hover:text-foreground"
            }
          >
            Home
          </Link>
          <Link
            to="/properties"
            activeProps={{
              className: isHome
                ? scrolled
                  ? "bg-slate-900/6 text-slate-900"
                  : "bg-white/12 text-white"
                : "bg-secondary text-foreground",
            }}
            className={
              isHome
                ? `rounded-full px-4 py-2.5 transition-colors ${
                    scrolled ? "text-slate-700 hover:text-slate-900" : "text-white/80 hover:text-white"
                  }`
                : "rounded-full px-4 py-2.5 text-muted-foreground transition-colors hover:text-foreground"
            }
          >
            Properties
          </Link>
          <Link
            to="/properties"
            search={{ listing: "Rent" }}
            className={
              isHome
                ? `ml-2 hidden rounded-md px-4 py-2 text-sm font-semibold transition-[background-color,color,opacity,transform] duration-500 ease-out sm:inline-block ${
                    scrolled
                      ? "bg-slate-900 text-white hover:opacity-90"
                      : "bg-white text-slate-900 hover:opacity-90"
                  }`
                : "ml-2 hidden rounded-md bg-primary px-4 py-2 text-primary-foreground transition-opacity hover:opacity-90 sm:inline-block"
            }
          >
            Rentals
          </Link>
        </nav>
      </div>
    </header>
  );
}
