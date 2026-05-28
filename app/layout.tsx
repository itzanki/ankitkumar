import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "From Bihar to Building the Internet | Developer Portfolio",
  description:
    "A cinematic journey through the life and work of a software engineer. Rooted in Bihar, building for the world.",
  keywords: [
    "software engineer",
    "developer portfolio",
    "Bihar",
    "web development",
    "full stack",
  ],
  authors: [{ name: "Developer" }],
  openGraph: {
    title: "From Bihar to Building the Internet",
    description: "A cinematic developer portfolio experience",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1714",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} bg-background`}
    >
      <body className="font-sans antialiased overflow-x-hidden relative">
        {/* Left Madhubani Border */}
        <div 
          className="fixed inset-y-0 left-0 w-32 md:w-64 z-0 pointer-events-none opacity-[0.20] mix-blend-screen"
          style={{ 
            backgroundImage: "url('/madhubani-border.png')",
            backgroundSize: "contain",
            backgroundRepeat: "repeat-y",
            backgroundPosition: "left center",
            maskImage: "linear-gradient(to right, black, transparent)",
            WebkitMaskImage: "linear-gradient(to right, black, transparent)"
          }} 
        />
        {/* Right Madhubani Border */}
        <div 
          className="fixed inset-y-0 right-0 w-32 md:w-64 z-0 pointer-events-none opacity-[0.20] mix-blend-screen"
          style={{ 
            backgroundImage: "url('/madhubani-border.png')",
            backgroundSize: "contain",
            backgroundRepeat: "repeat-y",
            backgroundPosition: "right center",
            maskImage: "linear-gradient(to left, black, transparent)",
            WebkitMaskImage: "linear-gradient(to left, black, transparent)"
          }} 
        />
        <div className="relative z-10">
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </div>
      </body>
    </html>
  );
}
