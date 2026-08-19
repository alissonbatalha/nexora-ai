"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import { useRef } from "react";

interface ScrollTextProps {
  text: string;
  className?: string;
  muted?: boolean;
}

export default function ScrollText({
  text,
  className = "",
  muted = false,
}: ScrollTextProps) {
  const ref =
    useRef<HTMLDivElement>(null);

  const { scrollYProgress } =
    useScroll({
      target: ref,
      offset: [
        "start 90%",
        "end 30%",
      ],
    });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.75, 1],
    [0.05, 0.55, 1, 0.8]
  );

  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    muted
      ? ["-3%", "0%", "1%"]
      : ["3%", "0%", "-1%"]
  );

  const blur = useTransform(
    scrollYProgress,
    [0, 0.35],
    [8, 0]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        x,
        filter: blur.get()
          ? undefined
          : undefined,
      }}
      className={`overflow-hidden ${className}`}
    >
      {text}
    </motion.div>
  );
}