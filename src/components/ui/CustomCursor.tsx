"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({
    x: -100,
    y: -100,
  });

  const [hovering, setHovering] =
    useState(false);

  useEffect(() => {
    let frame = 0;

    let latestX = -100;
    let latestY = -100;

    const move = (event: MouseEvent) => {
      latestX = event.clientX;
      latestY = event.clientY;

      if (frame) return;

      frame = requestAnimationFrame(() => {
        setPosition({
          x: latestX,
          y: latestY,
        });

        frame = 0;
      });
    };

    const enter = () => {
      setHovering(true);
    };

    const leave = () => {
      setHovering(false);
    };

    window.addEventListener(
      "mousemove",
      move,
      { passive: true }
    );

    const interactive =
      document.querySelectorAll(
        "a, button, [data-cursor]"
      );

    interactive.forEach((element) => {
      element.addEventListener(
        "mouseenter",
        enter
      );

      element.addEventListener(
        "mouseleave",
        leave
      );
    });

    return () => {
      window.removeEventListener(
        "mousemove",
        move
      );

      if (frame) {
        cancelAnimationFrame(frame);
      }

      interactive.forEach((element) => {
        element.removeEventListener(
          "mouseenter",
          enter
        );

        element.removeEventListener(
          "mouseleave",
          leave
        );
      });
    };
  }, []);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[120] hidden h-1.5 w-1.5 rounded-full bg-white md:block"
        animate={{
          x: position.x - 3,
          y: position.y - 3,
          scale: hovering ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 900,
          damping: 40,
        }}
      />

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[119] hidden rounded-full border border-white/40 md:block"
        animate={{
          x:
            position.x -
            (hovering ? 22 : 14),

          y:
            position.y -
            (hovering ? 22 : 14),

          width: hovering ? 44 : 28,
          height: hovering ? 44 : 28,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
        }}
      />
    </>
  );
}