import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Cal_Sans } from "next/font/google";
import { ToastProvider } from "@/components/Toast";
import { GlobalLoader } from "@/components/GlobalLoader";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const calSans = Cal_Sans({
  variable: "--font-cal-sans",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Developer Portfolio | Full-Stack Engineer",
    template: "%s | Developer Portfolio",
  },
  description:
    "Senior Full-Stack Developer specializing in React, Next.js, TypeScript, and cloud-native architectures. Building scalable web applications and APIs.",
  keywords: [
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Supabase",
    "AWS",
    "Web Development",
    "API Development",
  ],
  authors: [{ name: "Developer" }],
  creator: "Developer",
  publisher: "Developer Portfolio",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio.example.com",
    siteName: "Developer Portfolio",
    title: "Developer Portfolio | Full-Stack Engineer",
    description:
      "Senior Full-Stack Developer specializing in React, Next.js, TypeScript, and cloud-native architectures.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Portfolio | Full-Stack Engineer",
    description:
      "Senior Full-Stack Developer specializing in React, Next.js, TypeScript, and cloud-native architectures.",
    images: ["/og-default.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${calSans.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ToastProvider>{children}</ToastProvider>
        <GlobalLoader />
      </body>
    </html>
  );
}