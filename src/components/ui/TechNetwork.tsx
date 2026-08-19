"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { MouseEvent } from "react";

const nodes = [
  {
    name: "AI",
    x: 50,
    y: 8,
  },
  {
    name: "CLOUD",
    x: 82,
    y: 30,
  },
  {
    name: "DATA",
    x: 76,
    y: 72,
  },
  {
    name: "AUTOMATION",
    x: 50,
    y: 91,
  },
  {
    name: "APIs",
    x: 24,
    y: 72,
  },
  {
    name: "INFRA",
    x: 18,
    y: 30,
  },
];

export default function TechNetwork() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 20,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 20,
  });

  const rotateX = useTransform(
    smoothY,
    [-500, 500],
    [5, -5]
  );

  const rotateY = useTransform(
    smoothX,
    [-500, 500],
    [-5, 5]
  );

  const handleMouseMove = (
    event: MouseEvent<HTMLDivElement>
  ) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    mouseX.set(
      event.clientX -
        rect.left -
        rect.width / 2
    );

    mouseY.set(
      event.clientY -
        rect.top -
        rect.height / 2
    );
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
      }}
      className="relative mx-auto h-[460px] w-full max-w-5xl [perspective:1200px]"
    >
      {/* Rings */}

      <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

      <div className="absolute left-1/2 top-1/2 h-[370px] w-[370px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]" />

      <div className="absolute left-1/2 top-1/2 h-[490px] w-[490px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035]" />

      {/* Connection lines */}

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {nodes.map((node, index) => (
          <motion.line
            key={node.name}
            x1="50"
            y1="50"
            x2={node.x}
            y2={node.y}
            stroke="white"
            strokeOpacity="0.12"
            strokeWidth="0.12"
            initial={{
              pathLength: 0,
            }}
            whileInView={{
              pathLength: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1.2,
              delay: index * 0.12,
            }}
          />
        ))}
      </svg>

      {/* Central node */}

      <motion.div
        animate={{
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] shadow-[0_0_80px_rgba(160,165,255,0.08)] backdrop-blur-xl"
      >
        <div className="text-center">
          <div className="text-[9px] uppercase tracking-[0.25em] text-white/30">
            Core
          </div>

          <div className="mt-1 text-xs font-medium">
            NEXORA
          </div>
        </div>
      </motion.div>

      {/* Nodes */}

      {nodes.map((node, index) => (
        <motion.div
          key={node.name}
          initial={{
            opacity: 0,
            scale: 0.7,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
            delay: 0.35 + index * 0.1,
          }}
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative flex items-center justify-center rounded-full border border-white/10 bg-[#080808]/90 px-5 py-3 backdrop-blur-xl">
            <span className="text-[9px] uppercase tracking-[0.18em] text-white/50">
              {node.name}
            </span>

            <span className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-white/60" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}