"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 py-32 lg:px-8">
        <div className="max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-8 text-xs font-medium uppercase tracking-[0.35em] text-white/40"
          >
            GANK OFFICIAL
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="max-w-5xl text-[clamp(3.5rem,12vw,9rem)] font-medium leading-[0.9] tracking-[-0.06em] text-white"
          >
            Repair.
            <br />
            <span className="text-white/35">Reimagined.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
          >
            <p className="max-w-md text-base leading-7 text-white/45">
              GANK OFFICIAL menghadirkan pengalaman servis perangkat yang
              modern, transparan, dan dibuat untuk bergerak lebih cepat.
            </p>

            <a
              href="#service"
              className="group flex w-fit items-center gap-3 text-sm text-white"
            >
              Explore
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-white/40 group-hover:bg-white group-hover:text-black">
                <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-white/10"
      />
    </section>
  );
}