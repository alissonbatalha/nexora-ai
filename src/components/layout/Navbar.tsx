"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  {
    label: "Platform",
    href: "#platform",
  },
  {
    label: "Capabilities",
    href: "#capabilities",
  },
  {
    label: "Technology",
    href: "#technology",
  },
  {
    label: "About",
    href: "#problem",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1.15,
          duration: 0.8,
        }}
        className={`fixed left-0 right-0 top-0 z-[100] px-4 py-4 transition-all duration-500 md:px-8 ${
          scrolled
            ? "bg-[#050505]/70 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav
          className={`mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full px-5 transition-all duration-500 ${
            scrolled
              ? "border border-white/10 bg-white/[0.035]"
              : "border border-transparent"
          }`}
        >
          {/* Logo */}

          <a
            href="#top"
            onClick={closeMenu}
            className="group flex items-center gap-3"
            aria-label="NEXORA home"
          >
            <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-white/25">
              <span className="h-2 w-2 rounded-full bg-white transition-transform duration-500 group-hover:scale-[1.7]" />

              <span className="absolute inset-0 rounded-full border border-white/10" />
            </span>

            <span className="text-sm font-medium tracking-[0.2em]">
              NEXORA
            </span>
          </a>

          {/* Desktop navigation */}

          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-cursor
                className="relative text-[10px] uppercase tracking-[0.18em] text-white/45 transition-colors duration-300 hover:text-white"
              >
                {link.label}

                <span className="absolute -bottom-2 left-0 h-px w-0 bg-white transition-all duration-300 hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}

          <a
            href="#contact"
            data-cursor
            className="hidden rounded-full border border-white/15 bg-white px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.15em] text-black transition-all duration-300 hover:scale-[1.03] hover:bg-white/90 md:block"
          >
            Get started
          </a>

          {/* Mobile menu button */}

          <button
            type="button"
            aria-label={
              menuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={menuOpen}
            onClick={() =>
              setMenuOpen((value) => !value)
            }
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 md:hidden"
          >
            <span
              className={`absolute h-px w-4 bg-white transition-transform duration-300 ${
                menuOpen
                  ? "rotate-45"
                  : "-translate-y-1"
              }`}
            />

            <span
              className={`absolute h-px w-4 bg-white transition-transform duration-300 ${
                menuOpen
                  ? "-rotate-45"
                  : "translate-y-1"
              }`}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile navigation */}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[90] bg-[#050505]"
          >
            <div className="flex h-full flex-col px-7 pb-10 pt-32">
              <div className="mb-10 text-[9px] uppercase tracking-[0.3em] text-white/25">
                Navigation
              </div>

              <div className="flex flex-col">
                {links.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={closeMenu}
                    initial={{
                      opacity: 0,
                      x: -30,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.06,
                    }}
                    className="border-b border-white/[0.08] py-5 text-4xl font-medium tracking-[-0.05em] text-white/75 transition-colors hover:text-white"
                  >
                    <span className="mr-4 text-[10px] text-white/20">
                      0{index + 1}
                    </span>

                    {link.label}
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto">
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="flex items-center justify-between rounded-full bg-white px-6 py-4 text-sm font-medium text-black"
                >
                  Get started

                  <span>→</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}