"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  Cpu,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    number: "01",
    icon: Smartphone,
    title: "Screen Repair",
    description:
      "Penggantian layar dengan proses diagnosis dan pengerjaan yang terukur.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "Hardware",
    description:
      "Diagnosis komponen dan perbaikan hardware untuk berbagai masalah perangkat.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Software",
    description:
      "Penanganan software, sistem, bootloop, error, dan berbagai masalah perangkat lunak.",
  },
];

export function Service() {
  return (
    <section
      id="service"
      className="relative overflow-hidden border-t border-white/10 bg-black"
    >
      <div className="mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-44">
        <div className="grid gap-20 lg:grid-cols-[0.7fr_1.3fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-white/35">
              What We Do
            </p>

            <h2 className="mt-8 max-w-md text-4xl font-medium tracking-[-0.04em] text-white sm:text-5xl">
              Service built around your device.
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/40">
              Dari diagnosis sampai perangkat kembali digunakan. Kami fokus
              pada proses yang jelas, pengerjaan yang rapi, dan pengalaman
              pelanggan yang lebih baik.
            </p>
          </motion.div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.a
                  key={service.number}
                  href="#contact"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                  }}
                  className="group grid gap-6 py-8 transition-colors duration-500 hover:bg-white/[0.025] sm:grid-cols-[60px_60px_1fr_40px] sm:items-center sm:gap-8 sm:py-10"
                >
                  <span className="text-xs text-white/25">
                    {service.number}
                  </span>

                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 transition-all duration-500 group-hover:border-white/30 group-hover:bg-white group-hover:text-black">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium tracking-tight text-white sm:text-xl">
                      {service.title}
                    </h3>

                    <p className="mt-2 max-w-lg text-sm leading-6 text-white/35">
                      {service.description}
                    </p>
                  </div>

                  <ArrowUpRight className="h-5 w-5 text-white/20 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}