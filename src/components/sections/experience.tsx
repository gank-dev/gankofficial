"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stats = [
  {
    value: "01",
    label: "Diagnosis",
    description: "Memahami masalah sebelum pengerjaan dimulai.",
  },
  {
    value: "02",
    label: "Repair",
    description: "Pengerjaan dilakukan dengan proses yang terukur.",
  },
  {
    value: "03",
    label: "Return",
    description: "Perangkat kembali siap digunakan.",
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const lineScale = useTransform(scrollYProgress, [0.15, 0.5], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden border-t border-white/10 bg-black"
    >
      <div className="mx-auto max-w-7xl px-6 py-32 sm:px-8 sm:py-40 lg:px-8 lg:py-52">
        {/* Intro */}
        <div className="grid gap-16 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-white/30" />

              <span className="text-[11px] uppercase tracking-[0.3em] text-white/30">
                The GANK Experience
              </span>
            </div>
          </motion.div>

          <motion.div style={{ y: headlineY }}>
            <h2 className="max-w-4xl text-[clamp(3rem,7vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.06em] text-white">
              Less waiting.
              <br />
              <span className="text-white/35">More certainty.</span>
            </h2>
          </motion.div>
        </div>

        {/* Description */}
        <div className="mt-24 grid gap-12 lg:mt-36 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="max-w-lg text-lg leading-8 text-white/40 sm:text-xl sm:leading-9">
              Kami percaya servis perangkat tidak harus terasa rumit. Setiap
              tahap dibuat lebih mudah dipahami, dari perangkat masuk sampai
              perangkat kembali ke tangan pelanggan.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.8,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-end lg:justify-end"
          >
            <span className="max-w-xs text-sm leading-7 text-white/25">
              Clear process.
              <br />
              Honest communication.
              <br />
              Better repair experience.
            </span>
          </motion.div>
        </div>

        {/* Process */}
        <div className="relative mt-32 sm:mt-44">
          <div className="absolute left-0 right-0 top-0 h-px bg-white/10" />

          <motion.div
            style={{ scaleX: lineScale }}
            className="absolute left-0 right-0 top-0 h-px origin-left bg-white"
          />

          <div className="grid sm:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  margin: "-80px",
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group border-b border-white/10 py-10 sm:border-b-0 sm:border-r sm:px-8 sm:py-12 first:sm:pl-0 last:sm:border-r-0"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-white/25">
                    {stat.value}
                  </span>

                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1 + 0.25,
                    }}
                    className="h-2 w-2 rounded-full bg-white/30 transition-all duration-500 group-hover:scale-150 group-hover:bg-white"
                  />
                </div>

                <h3 className="mt-12 text-2xl font-medium tracking-tight text-white">
                  {stat.label}
                </h3>

                <p className="mt-3 max-w-xs text-sm leading-6 text-white/30 transition-colors duration-300 group-hover:text-white/45">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            margin: "-100px",
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-32 border-t border-white/10 pt-10 sm:mt-44 sm:pt-12"
        >
          <p className="max-w-4xl text-2xl font-medium leading-tight tracking-[-0.03em] text-white/70 sm:text-4xl lg:text-5xl">
            Repair should feel{" "}
            <span className="text-white">simple, transparent,</span> and
            designed around people.
          </p>
        </motion.div>
      </div>
    </section>
  );
}