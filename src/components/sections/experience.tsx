"use client";

import { motion } from "framer-motion";

const process = [
  {
    number: "01",
    title: "Diagnose",
    description: "Kami mencari akar masalah sebelum menentukan tindakan.",
  },
  {
    number: "02",
    title: "Repair",
    description: "Perangkat ditangani dengan proses yang terukur dan transparan.",
  },
  {
    number: "03",
    title: "Return",
    description: "Perangkat kembali siap digunakan dengan informasi yang jelas.",
  },
];

export function Experience() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-white/10 bg-black"
    >
      <div className="mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-48">
        <div className="grid gap-20 lg:grid-cols-2 lg:gap-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-white/30">
              The GANK Experience
            </p>

            <h2 className="mt-8 max-w-xl text-5xl font-medium leading-[0.95] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
              Less waiting.
              <br />
              More certainty.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex items-end"
          >
            <p className="max-w-lg text-base leading-8 text-white/40">
              Kami percaya servis perangkat tidak harus terasa rumit. Setiap
              tahap dibuat lebih mudah dipahami, dari perangkat masuk sampai
              perangkat kembali ke tangan pelanggan.
            </p>
          </motion.div>
        </div>

        <div className="mt-32 grid border-y border-white/10 md:grid-cols-3">
          {process.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
              }}
              className="group border-b border-white/10 p-8 last:border-b-0 md:border-b-0 md:border-r md:p-10 md:last:border-r-0 lg:p-12"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/25">
                  {item.number}
                </span>

                <span className="h-px w-8 bg-white/10 transition-all duration-500 group-hover:w-16 group-hover:bg-white/40" />
              </div>

              <h3 className="mt-20 text-2xl font-medium tracking-tight text-white">
                {item.title}
              </h3>

              <p className="mt-4 max-w-xs text-sm leading-7 text-white/35">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}