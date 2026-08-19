"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] =
    useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 1250);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{
        opacity: 1,
      }}
      animate={{
        opacity: 0,
      }}
      transition={{
        delay: 0.9,
        duration: 0.55,
        ease: [0.76, 0, 0.24, 1],
      }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050505]"
    >
      <div className="relative">
        <motion.div
          initial={{
            scaleX: 0,
          }}
          animate={{
            scaleX: 1,
          }}
          transition={{
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="absolute -bottom-3 left-0 h-px w-full origin-left bg-white/20"
        />

        <motion.div
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-xl font-medium tracking-[0.35em]"
        >
          NEXORA
        </motion.div>
      </div>

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.4,
        }}
        className="absolute bottom-8 left-8 text-[9px] uppercase tracking-[0.25em] text-white/20"
      >
        Intelligence / Engineered
      </motion.div>
    </motion.div>
  );
}