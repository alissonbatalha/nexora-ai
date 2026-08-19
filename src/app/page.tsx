"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";

import SpotlightCard from "@/components/ui/SpotlightCard";
import ScrollText from "@/components/animations/ScrollText";
import MagneticButton from "@/components/ui/MagneticButton";

import Navbar from "@/components/layout/Navbar";
import LoadingScreen from "@/components/ui/LoadingScreen";
import CustomCursor from "@/components/ui/CustomCursor";

const HeroScene = dynamic(
  () => import("@/components/3d/HeroScene"),
  {
    ssr: false,
  }
);

const CoreScene = dynamic(
  () => import("@/components/3d/CoreScene"),
  {
    ssr: false,
  }
);

const TechNetwork = dynamic(
  () => import("@/components/ui/TechNetwork"),
  {
    ssr: false,
  }
);

const capabilities = [
  {
    number: "01",
    title: "AI Systems",
    description:
      "Intelligent systems designed to reason through complexity, identify patterns and make decisions with precision.",
  },
  {
    number: "02",
    title: "Automation",
    description:
      "Autonomous workflows that remove repetitive work and allow teams to focus on higher-value decisions.",
  },
  {
    number: "03",
    title: "Data Intelligence",
    description:
      "Turn fragmented information into a living intelligence layer that continuously reveals what matters.",
  },
  {
    number: "04",
    title: "Cloud Infrastructure",
    description:
      "Scalable infrastructure engineered to support intelligent workloads without compromising reliability.",
  },
];

const useCases = [
  {
    number: "01",
    title: "Automate Operations",
    description:
      "Connect systems, orchestrate workflows and eliminate repetitive operational work.",
  },
  {
    number: "02",
    title: "Understand Data",
    description:
      "Transform complex information into decisions your teams can act on immediately.",
  },
  {
    number: "03",
    title: "Build Intelligent Products",
    description:
      "Create products that learn from context and become more useful with every interaction.",
  },
];

const technologies = [
  "AI",
  "Cloud",
  "Data",
  "Automation",
  "APIs",
  "Infrastructure",
];

function RevealText({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function SectionDivider({
  duration = 1.6,
}: {
  duration?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className="relative h-px overflow-hidden bg-white/[0.04]"
    >
      <motion.div
        initial={{
          x: "-100%",
        }}
        whileInView={{
          x: "100%",
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration,
          ease: "easeInOut",
        }}
        className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />
    </div>
  );
}

function DashboardChart() {
  return (
    <div className="relative h-56 overflow-hidden border border-white/[0.06] md:h-80">
      <div
        aria-hidden="true"
        className="absolute inset-0 nexora-grid opacity-30"
      />

      <div className="absolute left-4 top-4 text-[9px] uppercase tracking-[0.2em] text-white/20">
        Neural throughput
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 flex h-[75%] items-end gap-[2px] px-2"
      >
        {Array.from({ length: 64 }).map((_, index) => {
          const height =
            20 + Math.abs(Math.sin(index * 0.37)) * 65;

          return (
            <motion.div
              key={index}
              initial={{
                height: 0,
              }}
              whileInView={{
                height: `${height}%`,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.008,
                duration: 0.5,
              }}
              className="flex-1 bg-white/[0.16]"
            />
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();

  const coreScale = useTransform(
    scrollYProgress,
    [0.1, 0.35],
    [0.8, 1.12]
  );

  const coreOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.18, 0.36],
    [0.2, 1, 0.65]
  );

  return (
    <>
      <LoadingScreen />

      <CustomCursor />

      <Navbar />

      <main
        id="top"
        className="nexora-noise overflow-x-clip bg-[#050505] text-white"
      >
        {/* HERO */}

        <section
          id="platform"
          aria-labelledby="hero-title"
          className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#050505]"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 nexora-grid opacity-40"
          />

          <div
            aria-hidden="true"
            className="hero-gradient absolute inset-0"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0"
          >
            <HeroScene />
          </div>

          <div
            aria-hidden="true"
            className="hero-vignette pointer-events-none absolute inset-0 z-10"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-8 left-6 z-20 hidden items-center gap-3 md:flex"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/60" />

            <span className="text-[8px] uppercase tracking-[0.25em] text-white/25">
              System online
            </span>

            <span className="h-px w-10 bg-white/10" />

            <span className="text-[8px] uppercase tracking-[0.25em] text-white/20">
              01 / 08
            </span>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-8 right-6 z-20 hidden text-right md:block"
          >
            <div className="text-[8px] uppercase tracking-[0.25em] text-white/20">
              Intelligence layer
            </div>

            <div className="mt-2 text-[8px] uppercase tracking-[0.25em] text-white/10">
              Nexora systems
            </div>
          </div>

          <div className="relative z-20 mx-auto w-full max-w-[1500px] px-6 pb-20 pt-32 md:px-10 lg:px-14">
            <div className="max-w-[820px]">
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 1.35,
                  duration: 0.7,
                }}
                className="mb-7 flex items-center gap-3"
              >
                <span className="h-px w-8 bg-white/40" />

                <span className="text-[10px] uppercase tracking-[0.28em] text-white/45">
                  Intelligence infrastructure
                </span>
              </motion.div>

              <div className="overflow-hidden">
                <motion.h1
                  id="hero-title"
                  initial={{
                    y: "105%",
                  }}
                  animate={{
                    y: 0,
                  }}
                  transition={{
                    delay: 1.25,
                    duration: 1,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  className="text-[clamp(3.5rem,9vw,9rem)] font-medium leading-[0.84] tracking-[-0.075em]"
                >
                  INTELLIGENCE,
                  <br />

                  <span className="text-white/45">
                    ENGINEERED.
                  </span>
                </motion.h1>
              </div>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 1.75,
                  duration: 0.7,
                }}
                className="mt-8 max-w-[510px] text-sm leading-7 text-white/50 md:text-base"
              >
                Build intelligent systems that move your
                business beyond what software alone can do.
              </motion.p>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 1.95,
                  duration: 0.7,
                }}
                className="mt-9 flex flex-wrap gap-3"
              >
                <MagneticButton
                  href="#core"
                  className="group items-center gap-5 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black hover:scale-[1.025]"
                >
                  Explore NEXORA

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </MagneticButton>

                <a
                  href="#problem"
                  data-cursor
                  className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm text-white/75 backdrop-blur-sm transition duration-300 hover:border-white/30 hover:bg-white/[0.07] hover:text-white"
                >
                  See how it works
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PROBLEM */}

        <section
          id="problem"
          aria-labelledby="problem-title"
          className="relative flex min-h-screen items-center overflow-hidden bg-[#050505] px-6 py-32"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 nexora-grid opacity-20"
          />

          <div className="relative z-10 mx-auto w-full max-w-7xl">
            <RevealText>
              <p className="mb-8 text-xs uppercase tracking-[0.3em] text-white/30">
                01 — The problem
              </p>

              <h2
                id="problem-title"
                className="max-w-5xl text-[clamp(3rem,7vw,7rem)] font-medium leading-[0.9] tracking-[-0.07em]"
              >
                Software executes.
                <br />

                <span className="text-white/25">
                  Intelligence decides.
                </span>
              </h2>

              <div className="mt-16 grid max-w-5xl gap-8 md:grid-cols-2">
                <p className="text-sm leading-7 text-white/45">
                  Traditional software waits for instructions.
                  It processes what already happened and
                  returns an expected result.
                </p>

                <p className="text-sm leading-7 text-white/45">
                  Intelligent systems observe, reason, adapt
                  and act — turning software from a passive
                  tool into an active layer of your business.
                </p>
              </div>
            </RevealText>
          </div>
        </section>

        {/* CORE */}

        <section
          id="core"
          aria-labelledby="core-title"
          className="relative min-h-[150vh] overflow-hidden bg-[#070707]"
        >
          <div className="sticky top-0 flex min-h-screen items-center justify-center">
            <motion.div
              aria-hidden="true"
              style={{
                scale: coreScale,
                opacity: coreOpacity,
              }}
              className="absolute inset-0"
            >
              <CoreScene />
            </motion.div>

            <div className="relative z-10 w-full px-6">
              <div className="mx-auto max-w-7xl">
                <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                  02 — The core
                </p>

                <h2
                  id="core-title"
                  className="mt-5 text-5xl font-medium tracking-[-0.06em] md:text-7xl"
                >
                  NEXORA CORE
                </h2>

                <div className="mt-6 flex items-center gap-3">
                  <span className="h-px w-12 bg-white/20" />

                  <span className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                    Neural architecture / Active
                  </span>
                </div>

                <p className="mt-5 max-w-md text-sm leading-7 text-white/35">
                  A unified intelligence layer designed to
                  reason, adapt, automate and scale.
                </p>

                <div className="mt-16 grid gap-5 md:grid-cols-4">
                  {[
                    ["01", "Reason"],
                    ["02", "Adapt"],
                    ["03", "Automate"],
                    ["04", "Scale"],
                  ].map(([number, title], index) => (
                    <motion.div
                      key={title}
                      initial={{
                        opacity: 0,
                        y: 25,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        delay: index * 0.08,
                        duration: 0.65,
                      }}
                      className="border-t border-white/15 pt-4"
                    >
                      <div className="text-[10px] text-white/25">
                        {number}
                      </div>

                      <div className="mt-2 text-sm font-medium text-white/70">
                        {title}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* CAPABILITIES */}

        <section
          id="capabilities"
          aria-labelledby="capabilities-title"
          className="bg-[#050505] px-6 py-32 md:py-44"
        >
          <div className="mx-auto max-w-7xl">
            <RevealText>
              <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                03 — Capabilities
              </p>

              <h2
                id="capabilities-title"
                className="mt-6 max-w-4xl text-[clamp(3rem,6vw,6rem)] font-medium leading-[0.9] tracking-[-0.07em]"
              >
                Intelligence across
                <span className="text-white/25">
                  {" "}
                  every layer.
                </span>
              </h2>
            </RevealText>

            <div className="mt-20 grid gap-4 md:grid-cols-2">
              {capabilities.map((capability) => (
                <SpotlightCard
                  key={capability.title}
                  className="min-h-[350px] p-7 md:min-h-[430px] md:p-9"
                >
                  <div className="flex h-full flex-col justify-between">
                    <div className="flex justify-between">
                      <span className="text-xs text-white/25">
                        {capability.number}
                      </span>

                      <span
                        aria-hidden="true"
                        className="text-white/20 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                      >
                        ↗
                      </span>
                    </div>

                    <div>
                      <h3 className="text-3xl font-medium tracking-[-0.05em] md:text-4xl">
                        {capability.title}
                      </h3>

                      <p className="mt-5 max-w-md text-sm leading-7 text-white/35 transition-colors duration-500 group-hover:text-white/55">
                        {capability.description}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* DASHBOARD */}

        <section
          aria-labelledby="dashboard-title"
          className="relative overflow-hidden bg-[#080808] px-6 py-32 md:py-44"
        >
          <div className="mx-auto max-w-7xl">
            <RevealText>
              <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                04 — Intelligence in motion
              </p>

              <h2
                id="dashboard-title"
                className="mt-6 max-w-4xl text-5xl font-medium tracking-[-0.065em] md:text-7xl"
              >
                Measurable intelligence.
                <br />

                <span className="text-white/25">
                  Operational impact.
                </span>
              </h2>
            </RevealText>

            <motion.div
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.9,
              }}
              className="mt-20 overflow-hidden border border-white/10 bg-[#0b0b0c]"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                  NEXORA / SYSTEM STATUS
                </span>

                <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-white/35">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-white/70"
                  />
                  Operational
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4">
                {[
                  ["98.7%", "Automation Rate"],
                  ["4.8x", "Operational Efficiency"],
                  ["12.4M", "Tasks Processed"],
                  ["24/7", "Intelligence"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="border-b border-r border-white/10 p-6 last:border-r-0 md:p-10"
                  >
                    <div className="text-[clamp(2rem,4vw,4rem)] font-medium tracking-[-0.07em]">
                      {value}
                    </div>

                    <div className="mt-3 text-[10px] uppercase tracking-[0.15em] text-white/30">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 md:p-10">
                <DashboardChart />
              </div>
            </motion.div>
          </div>
        </section>

        {/* FUTURE */}

        <section
          id="future"
          aria-labelledby="future-title"
          className="relative min-h-[140vh] overflow-hidden bg-[#050505]"
        >
          <div className="sticky top-0 flex min-h-screen items-center">
            <div
              aria-hidden="true"
              className="absolute inset-0"
            >
              <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.018] blur-3xl" />

              <div className="absolute inset-0 nexora-grid opacity-[0.12]" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
              <p
                id="future-title"
                className="mb-12 text-xs uppercase tracking-[0.3em] text-white/25"
              >
                05 — A different future
              </p>

              <div className="max-w-[1200px]">
                <ScrollText
                  text="THE FUTURE"
                  className="text-[clamp(4rem,10vw,10rem)] font-medium leading-[0.78] tracking-[-0.08em]"
                />

                <ScrollText
                  text="ISN'T AUTOMATED."
                  muted
                  className="mt-2 text-[clamp(4rem,10vw,10rem)] font-medium leading-[0.78] tracking-[-0.08em] text-white/30"
                />

                <ScrollText
                  text="IT'S INTELLIGENT."
                  className="mt-2 text-[clamp(4rem,10vw,10rem)] font-medium leading-[0.78] tracking-[-0.08em] text-white/65"
                />
              </div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.4,
                }}
                transition={{
                  duration: 0.8,
                }}
                className="mt-14 max-w-md"
              >
                <p className="text-sm leading-7 text-white/35">
                  Automation removes friction.
                  Intelligence creates possibility.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* USE CASES */}

        <section
          id="use-cases"
          aria-labelledby="use-cases-title"
          className="border-t border-white/[0.06] bg-[#080808] px-6 py-32 md:py-44"
        >
          <div className="mx-auto max-w-7xl">
            <RevealText>
              <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                06 — Use cases
              </p>

              <h2
                id="use-cases-title"
                className="mt-6 max-w-4xl text-5xl font-medium tracking-[-0.065em] md:text-7xl"
              >
                Built for problems
                <span className="text-white/25">
                  {" "}
                  worth solving.
                </span>
              </h2>
            </RevealText>

            <div className="mt-20 grid gap-4 md:grid-cols-3">
              {useCases.map((item) => (
                <SpotlightCard
                  key={item.title}
                  className="min-h-[420px] p-7 md:p-9"
                >
                  <div className="flex h-full flex-col">
                    <span className="text-xs text-white/25">
                      {item.number}
                    </span>

                    <div className="mt-auto">
                      <h3 className="text-2xl font-medium tracking-[-0.04em]">
                        {item.title}
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-white/35">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        {/* TECHNOLOGY */}

        <section
          id="technology"
          aria-labelledby="technology-title"
          className="relative overflow-hidden bg-[#050505] px-6 py-32 md:py-44"
        >
          <div className="mx-auto max-w-7xl">
            <RevealText>
              <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                07 — Technology
              </p>

              <h2
                id="technology-title"
                className="mt-6 max-w-4xl text-5xl font-medium tracking-[-0.065em] md:text-7xl"
              >
                One intelligence layer.
                <br />

                <span className="text-white/25">
                  Infinite possibilities.
                </span>
              </h2>
            </RevealText>

            <div className="mt-20">
              <TechNetwork />

              <div className="mx-auto mt-10 max-w-xl text-center">
                <p className="text-sm leading-7 text-white/35">
                  NEXORA connects intelligence, data,
                  infrastructure and automation into a
                  single adaptive system.
                </p>
              </div>
            </div>

            <div className="mt-20 flex flex-wrap justify-center gap-2">
              {technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-white/35"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}

        <section
          id="contact"
          aria-labelledby="contact-title"
          className="relative flex min-h-[90svh] items-center justify-center overflow-hidden bg-[#f2f2f0] px-6 py-32 text-black"
        >
          <div
            aria-hidden="true"
            className="absolute h-[500px] w-[500px] rounded-full bg-black/[0.035] blur-3xl"
          />

          <div className="relative z-10 max-w-5xl text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-black/35">
              08 — What&apos;s next
            </p>

            <h2
              id="contact-title"
              className="mt-8 text-[clamp(3.2rem,8vw,8rem)] font-medium leading-[0.85] tracking-[-0.075em]"
            >
              READY TO BUILD
              <br />
              WHAT&apos;S NEXT?
            </h2>

            <p className="mx-auto mt-8 max-w-lg text-sm leading-7 text-black/50">
              Let&apos;s engineer the systems that move
              your business forward.
            </p>

            <MagneticButton
              href="mailto:hello@nexora.ai"
              className="mt-10 rounded-full bg-black px-7 py-4 text-sm font-medium text-white hover:scale-[1.03]"
            >
              Start a conversation →
            </MagneticButton>
          </div>
        </section>
      </main>

      {/* FOOTER */}

      <footer className="border-t border-black/10 bg-[#f2f2f0] px-6 pb-8 pt-16 text-black">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <div className="text-lg font-medium tracking-[0.22em]">
                NEXORA
              </div>

              <p className="mt-5 max-w-xs text-sm leading-6 text-black/40">
                Intelligence infrastructure for the systems
                that shape what comes next.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 text-sm">
              <div>
                <p className="mb-4 text-[9px] uppercase tracking-[0.2em] text-black/30">
                  Explore
                </p>

                <div className="flex flex-col gap-3">
                  <a
                    href="#platform"
                    className="text-black/50 transition-colors hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                  >
                    Platform
                  </a>

                  <a
                    href="#capabilities"
                    className="text-black/50 transition-colors hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                  >
                    Capabilities
                  </a>

                  <a
                    href="#technology"
                    className="text-black/50 transition-colors hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                  >
                    Technology
                  </a>
                </div>
              </div>

              <div>
                <p className="mb-4 text-[9px] uppercase tracking-[0.2em] text-black/30">
                  Connect
                </p>

                <div className="flex flex-col gap-3">
                  <a
                    href="mailto:hello@nexora.ai"
                    className="text-black/50 transition-colors hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                  >
                    Email
                  </a>

                  <a
                    href="#contact"
                    className="text-black/50 transition-colors hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                  >
                    Start a project
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-start justify-start md:justify-end">
              <div className="max-w-[220px] text-sm leading-6 text-black/35 md:text-right">
                Building the intelligence layer for
                tomorrow&apos;s businesses.
              </div>
            </div>
          </div>

          <div className="mt-20 flex flex-col justify-between gap-4 border-t border-black/10 pt-6 text-[9px] uppercase tracking-[0.18em] text-black/30 md:flex-row">
            <span>
              © 2026 NEXORA SYSTEMS
            </span>

            <span>
              Intelligence / Engineered
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}