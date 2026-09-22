import { Github, Phone } from "lucide-react";

import { CONTACT_PHONE } from "@/lib/properties";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 text-sm text-muted-foreground sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-base text-foreground">Estate</p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`tel:${CONTACT_PHONE}`}
              className="inline-flex items-center gap-1.5 text-foreground transition-opacity hover:opacity-70"
            >
              <Phone className="size-4" />
              {CONTACT_PHONE.replace("+91", "+91 ")}
            </a>
            <a
              href="https://github.com/amalpk531"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-foreground transition-opacity hover:opacity-70"
            >
              <Github className="size-4" />
              GitHub
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-1 border-t border-border/70 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p>Mini real estate demo · Mock data only</p>
          <p>© {new Date().getFullYear()} Estate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
