"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Smartphone, Cpu, Settings2 } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Screen Repair",
    description:
      "Penggantian layar dengan proses diagnosis dan pengerjaan yang terukur.",
    icon: Smartphone,
  },
  {
    number: "02",
    title: "Hardware Repair",
    description:
      "Penanganan masalah komponen perangkat dengan pemeriksaan yang menyeluruh.",
    icon: Cpu,
  },
  {
    number: "03",
    title: "Software Service",
    description:
      "Solusi untuk masalah sistem, software, dan performa perangkat.",
    icon: Settings2,
  },
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function Service() {
  return (
    <section
      id="service"
      className="relative border-t border-white/10 bg-black"
    >
      <div className="mx-auto max-w-7xl px-6 py-28 sm:px-8 sm:py-36 lg:px-8 lg:py-44">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.5fr] lg:gap-24">
          {/* Section intro */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-white/30" />

                <span className="text-[11px] uppercase tracking-[0.3em] text-white/30">
                  What We Do
                </span>
              </div>

              <h2 className="mt-8 max-w-md text-4xl font-medium leading-[0.95] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
                Service built around your device.
              </h2>

              <p className="mt-8 max-w-sm text-sm leading-7 text-white/35 sm:text-base">
                Dari diagnosis sampai perangkat kembali digunakan. Kami fokus
                pada proses yang jelas, pengerjaan yang rapi, dan pengalaman
                pelanggan yang lebih baik.
              </p>
            </motion.div>
          </div>

          {/* Service list */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: "-100px",
            }}
            className="border-t border-white/10"
          >
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <motion.a
                  key={service.number}
                  href="#contact"
                  variants={item}
                  className="group relative grid gap-6 border-b border-white/10 py-8 sm:grid-cols-[72px_1fr_auto] sm:items-center sm:gap-8 sm:py-10"
                >
                  {/* Hover background */}
                  <span className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-full origin-left scale-x-0 bg-white/[0.025] transition-transform duration-500 ease-out group-hover:scale-x-100" />

                  {/* Number */}
                  <span className="relative z-10 font-mono text-xs text-white/25 transition-colors duration-300 group-hover:text-white/60">
                    {service.number}
                  </span>

                  {/* Content */}
                  <div className="relative z-10 flex gap-5">
                    <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/35 transition-all duration-500 group-hover:border-white/30 group-hover:bg-white group-hover:text-black sm:flex">
                      <Icon className="h-4 w-4 transition-transform duration-500 group-hover:rotate-[-8deg]" />
                    </div>

                    <div>
                      <h3 className="text-xl font-medium tracking-tight text-white transition-transform duration-500 group-hover:translate-x-1 sm:text-2xl">
                        {service.title}
                      </h3>

                      <p className="mt-2 max-w-md text-sm leading-6 text-white/30 transition-colors duration-300 group-hover:text-white/50">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/30 transition-all duration-500 group-hover:border-white/40 group-hover:bg-white group-hover:text-black">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}