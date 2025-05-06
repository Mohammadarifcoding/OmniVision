"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const clients = [
  {
    id: 1,
    name: "Asai",
    subscribers: "4.24K",
    link: "https://youtube.com/@asai_bloxfruits?si=5HKVwKZc3-HT_8w6",
    logo: "https://res.cloudinary.com/dnjlwwcmo/image/upload/v1746549674/Asai_high_xqxksv.jpg",
  },
  {
    id: 2,
    name: "Oduck",
    subscribers: "17.7K",
    link: "https://youtube.com/@oduckyt?si=hqdU6NOwv-Vh_dlZ",
    logo: "https://res.cloudinary.com/dnjlwwcmo/image/upload/v1746549943/oduck_high_munyty.jpg",
  },
  {
    id: 3,
    name: "AminOnPC",
    subscribers: "562K",
    link: "https://youtube.com/@aminonpc?si=8wlJSXJPjHE3a2nV",
    logo: "https://res.cloudinary.com/dnjlwwcmo/image/upload/v1746549955/AminOnPC_high_wlf3j5.jpg",
  },
  {
    id: 4,
    name: "Graser",
    subscribers: "3.29M",
    link: "https://www.youtube.com/@Graser",
    logo: "https://res.cloudinary.com/dnjlwwcmo/image/upload/v1746549972/Graser_high_ax0dhe.jpg",
  },
  {
    id: 5,
    name: "LilyGumdrop",
    subscribers: "33.3k",
    link: "https://youtube.com/@lilygumdrop?si=tR_u2rGZgdfS-5yI",
    logo: "https://res.cloudinary.com/dnjlwwcmo/image/upload/v1746549963/LilyGumdrop_high_ynlbe9.jpg",
  },
];

export default function ClientsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const container = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };
  

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 16 },
    },
  };

  return (
    <section ref={ref} className="py-20 md:py-32 overflow-hidden">
    <div className="container mx-auto px-4 md:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 18 }}
        className="text-center mb-16"
      >
<h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center text-white">
  The clients I’ve{" "}
  <span className="relative inline-block text-red-500 hover:text-red-400 transition duration-300">
    worked with
    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-red-500 opacity-70 transform scale-x-0 origin-left transition-transform duration-300 hover:scale-x-100"></span>
  </span>
</h2>

        <motion.div
          className="w-24 h-1 bg-red-600 mx-auto"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </motion.div>

      {/* Client grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-wrap justify-center items-center gap-12 md:gap-16 max-w-3xl mx-auto"
      >
        {clients.map(c => (
          <motion.div
            key={c.id}
            variants={item}
            className="flex flex-col items-center cursor-pointer"
            whileHover={{
              scale: 1.12,
              rotate: 2,
              transition: { type: "spring", stiffness: 350, damping: 12 },
            }}
          >
            <motion.div
              className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center filter transition-all duration-300"
              whileHover={{
                boxShadow: "0 0 24px rgba(220,38,38,0.6)",
                backgroundColor: "rgba(127,29,29,0.25)",
              }}
            >
              <motion.img
                src={c.logo}
                alt={c.name}
                className="rounded-full max-w-full max-h-full"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <div className="mt-3 text-center">
              <h3 className="font-bold text-2xl">{c.name}</h3>
              <p className="text-sm">{c.subscribers} Subscribers</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
  );
}
