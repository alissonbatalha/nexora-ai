"use client";

import {
  ReactNode,
  useRef,
} from "react";

import { motion, useMotionValue } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
}

export default function MagneticButton({
  children,
  href = "#",
  className = "",
}: MagneticButtonProps) {
  const ref =
    useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (!ref.current) return;

    const rect =
      ref.current.getBoundingClientRect();

    const relativeX =
      event.clientX -
      (rect.left + rect.width / 2);

    const relativeY =
      event.clientY -
      (rect.top + rect.height / 2);

    x.set(relativeX * 0.12);
    y.set(relativeY * 0.12);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      data-cursor
      style={{
        x,
        y,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className={`inline-flex ${className}`}
      whileTap={{
        scale: 0.97,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
    >
      {children}
    </motion.a>
  );
}