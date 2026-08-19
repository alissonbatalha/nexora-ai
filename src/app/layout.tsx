import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "NEXORA — Intelligence, Engineered.",
    template: "%s | NEXORA",
  },

  description:
    "NEXORA engineers intelligent systems, automation, data infrastructure and AI solutions for businesses building what comes next.",

  keywords: [
    "artificial intelligence",
    "AI systems",
    "automation",
    "data intelligence",
    "cloud infrastructure",
    "AI automation",
    "NEXORA",
  ],

  authors: [
    {
      name: "NEXORA Systems",
    },
  ],

  creator: "NEXORA Systems",

  applicationName: "NEXORA",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "NEXORA — Intelligence, Engineered.",
    description:
      "Build intelligent systems that move your business beyond what software alone can do.",
    type: "website",
    siteName: "NEXORA",
  },

  twitter: {
    card: "summary_large_image",
    title: "NEXORA — Intelligence, Engineered.",
    description:
      "Intelligence infrastructure for the systems that shape what comes next.",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}