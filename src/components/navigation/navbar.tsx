"use client";

import { motion } from "framer-motion";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Service", href: "#service" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <a
          href="#home"
          className="text-sm font-semibold tracking-[0.25em] text-white"
        >
          GANK
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-white/50 transition-colors duration-300 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition-all duration-300 hover:border-white/30 hover:bg-white/10"
        >
          Get Started
        </a>
      </div>
    </motion.header>
  );
}