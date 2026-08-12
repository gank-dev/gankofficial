"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(circle at center, black 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 0%, transparent 75%)",
        }}
      />

      {/* Ambient glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-[120px] sm:h-[34rem] sm:w-[34rem]"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.45, 0.7, 0.45],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-32 sm:px-8 sm:pb-24 lg:px-8 lg:pt-40">
        <div className="max-w-6xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mb-8 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-white/30" />

            <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/35">
              GANK OFFICIAL
            </span>
          </motion.div>

          {/* Heading */}
          <h1 className="max-w-5xl text-[clamp(3.5rem,11vw,9rem)] font-medium leading-[0.88] tracking-[-0.065em] text-white">
            <motion.span
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.1,
                ease,
              }}
              className="block"
            >
              Repair.
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.18,
                ease,
              }}
              className="block text-white/45"
            >
              Reimagined.
            </motion.span>
          </h1>

          {/* Bottom content */}
          <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-[1fr_auto] lg:items-end">
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.35,
                ease,
              }}
              className="max-w-xl text-base leading-7 text-white/40 sm:text-lg sm:leading-8"
            >
              GANK OFFICIAL menghadirkan pengalaman servis perangkat yang
              modern, transparan, dan dibuat untuk bergerak lebih cepat.
            </motion.p>

            <motion.a
              href="#service"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.45,
                ease,
              }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex w-fit items-center gap-3 text-sm text-white"
            >
              <span className="border-b border-white/30 pb-1 transition-colors duration-300 group-hover:border-white">
                Explore
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-white/40 group-hover:bg-white group-hover:text-black">
                <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </span>
            </motion.a>
          </div>
        </div>

        {/* Bottom metadata */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.8,
          }}
          className="mt-20 flex items-center justify-between border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.25em] text-white/20 sm:mt-28"
        >
          <span>Professional Device Repair</span>

          <span className="hidden sm:block">Scroll to explore</span>

          <span>01 / 05</span>
        </motion.div>
      </div>
    </section>
  );
}