"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/10 bg-black"
    >
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "100px 100px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
        }}
      />

      {/* Ambient glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-[160px]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-32 sm:px-8 sm:py-40 lg:px-8 lg:py-52">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-8 bg-white/40" />

          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/35">
            Start a repair
          </span>
        </motion.div>

        {/* Main statement */}
        <div className="mt-12 sm:mt-16">
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease }}
            className="max-w-6xl text-[clamp(3.5rem,10vw,9rem)] font-medium leading-[0.84] tracking-[-0.07em] text-white"
          >
            Let&apos;s fix
            <br />
            <span className="text-white/30">what&apos;s broken.</span>
          </motion.h2>
        </div>

        {/* CTA row */}
        <div className="mt-20 border-t border-white/10 sm:mt-28">
          <div className="grid lg:grid-cols-[1fr_auto] lg:items-center">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease,
              }}
              className="py-8 lg:py-10"
            >
              <p className="max-w-xl text-base leading-7 text-white/40 sm:text-lg sm:leading-8">
                Ceritakan masalah perangkatmu. Kami mulai dari diagnosis,
                menjelaskan kondisinya, lalu menentukan langkah terbaik untuk
                perbaikannya.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.a
              href="https://wa.me/6285804286029"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                delay: 0.25,
                ease,
              }}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              className="group relative flex min-h-24 items-center justify-between gap-12 overflow-hidden border-t border-white/10 py-6 text-white transition-colors duration-500 lg:min-w-[360px] lg:border-l lg:border-t-0 lg:pl-10"
            >
              {/* Hover fill */}
              <motion.span
                variants={{
                  hover: {
                    scaleX: 1,
                  },
                }}
                initial={{ scaleX: 0 }}
                transition={{ duration: 0.5, ease }}
                className="absolute inset-0 origin-left bg-white"
              />

              <span className="relative z-10 text-lg font-medium tracking-tight transition-colors duration-500 group-hover:text-black">
                Chat with GANK
              </span>

              <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 transition-all duration-500 group-hover:border-black group-hover:bg-black group-hover:text-white">
                <motion.span
                  variants={{
                    hover: {
                      x: 3,
                      y: -3,
                    },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight className="h-5 w-5" />
                </motion.span>
              </span>
            </motion.a>
          </div>
        </div>

        {/* Information */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
          className="mt-20 grid border-t border-white/10 sm:grid-cols-3"
        >
          <div className="border-b border-white/10 py-6 sm:border-b-0 sm:border-r sm:py-8 sm:pr-8">
            <span className="block text-[10px] uppercase tracking-[0.25em] text-white/20">
              Contact
            </span>

            <span className="mt-3 block text-sm text-white/50">
              WhatsApp GANK SERVICE
            </span>
          </div>

          <div className="border-b border-white/10 py-6 sm:border-b-0 sm:border-r sm:px-8 sm:py-8">
            <span className="block text-[10px] uppercase tracking-[0.25em] text-white/20">
              Service
            </span>

            <span className="mt-3 block text-sm text-white/50">
              Smartphone &amp; Device Repair
            </span>
          </div>

          <div className="py-6 sm:py-8 sm:pl-8">
            <span className="block text-[10px] uppercase tracking-[0.25em] text-white/20">
              Location
            </span>

            <span className="mt-3 block text-sm text-white/50">
              Indonesia
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}