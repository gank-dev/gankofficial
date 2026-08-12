"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Service", href: "#service" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <a
            href="#home"
            onClick={closeMenu}
            className="group relative z-50 text-sm font-semibold tracking-[0.25em] text-white"
          >
            GANK
            <span className="ml-1 inline-block h-1 w-1 rounded-full bg-white align-middle transition-transform duration-300 group-hover:scale-150" />
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative text-sm text-white/40 transition-colors duration-300 hover:text-white"
              >
                {item.label}

                <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="relative z-50 flex items-center gap-3">
            <a
              href="#contact"
              className="hidden rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition-all duration-300 hover:border-white/30 hover:bg-white/10 sm:block"
            >
              Get Started
            </a>

            <button
              type="button"
              aria-label={isOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((value) => !value)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black text-white transition-colors duration-300 hover:border-white/30 md:hidden"
            >
              {isOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.35 }}
              className="flex h-full flex-col justify-center px-6"
            >
              <div className="mx-auto w-full max-w-7xl">
                <p className="mb-8 text-xs uppercase tracking-[0.35em] text-white/25">
                  Navigation
                </p>

                <div className="divide-y divide-white/10 border-y border-white/10">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={closeMenu}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.06,
                      }}
                      className="flex items-center justify-between py-6 text-3xl font-medium tracking-tight text-white"
                    >
                      <span>{item.label}</span>

                      <span className="text-sm text-white/20">
                        0{index + 1}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}