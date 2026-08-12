import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "Instagram", href: "https://instagram.com/koesnandaa" },
  { label: "WhatsApp", href: "https://wa.me/6285804286029" },
  { label: "Maps", href: "https://maps.app.goo.gl/geArLXQcgm2VQk9y7" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-12 py-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <a
              href="#home"
              className="text-lg font-semibold tracking-[0.25em] text-white"
            >
              GANK
            </a>

            <p className="mt-4 max-w-xs text-sm leading-6 text-white/30">
              Professional device repair with a modern experience.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group flex items-center gap-2 text-sm text-white/40 transition-colors duration-300 hover:text-white"
              >
                {link.label}

                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-white/20 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} GANK OFFICIAL</span>

          <span>Built with precision.</span>
        </div>
      </div>
    </footer>
  );
}