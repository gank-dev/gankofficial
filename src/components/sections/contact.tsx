"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/10 bg-black"
    >
      <div className="relative mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-48">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] px-8 py-16 sm:px-12 lg:px-20 lg:py-24"
        >
          <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-white/[0.04] blur-3xl" />

          <div className="relative max-w-4xl">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-white/30">
              Start a Repair
            </p>

            <h2 className="mt-8 text-5xl font-medium leading-[0.95] tracking-[-0.055em] text-white sm:text-6xl lg:text-8xl">
              Your device.
              <br />
              Let&apos;s fix it.
            </h2>

            <p className="mt-8 max-w-xl text-base leading-7 text-white/40">
              Ceritakan masalah perangkatmu. Kami bantu menentukan langkah
              berikutnya dengan proses yang sederhana dan transparan.
            </p>

            <motion.a
              href="https://wa.me/"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group mt-12 inline-flex items-center gap-4 rounded-full bg-white px-6 py-4 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90"
            >
              Contact GANK

              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}