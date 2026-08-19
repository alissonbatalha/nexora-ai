"use client";

import {
  ReactNode,
  useRef,
  useState,
} from "react";

import { motion } from "framer-motion";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

export default function SpotlightCard({
  children,
  className = "",
}: SpotlightCardProps) {
  const cardRef =
    useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({
    x: 50,
    y: 50,
  });

  const [hovered, setHovered] =
    useState(false);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!cardRef.current) return;

    const rect =
      cardRef.current.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) /
        rect.width) *
      100;

    const y =
      ((event.clientY - rect.top) /
        rect.height) *
      100;

    setPosition({
      x,
      y,
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);

    setPosition({
      x: 50,
      y: 50,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        y: -5,
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 30,
      }}
      className={`group relative overflow-hidden rounded-[2px] border border-white/[0.08] bg-white/[0.025] ${className}`}
    >
      {/* Cursor spotlight */}

      <motion.div
        animate={{
          opacity: hovered ? 1 : 0,
        }}
        transition={{
          duration: 0.25,
        }}
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(
            500px circle at ${position.x}% ${position.y}%,
            rgba(255,255,255,0.075),
            transparent 45%
          )`,
        }}
      />

      {/* Moving border */}

      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(
            260px circle at ${position.x}% ${position.y}%,
            rgba(255,255,255,0.28),
            transparent 42%
          )`,
        }}
      />

      {/* Top highlight */}

      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Content */}

      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}