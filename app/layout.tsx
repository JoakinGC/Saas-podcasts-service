import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ConvexClerkProvider  from "@/providers/ConvexClerkProvider";
import AudioProvider  from "@/providers/AudioProvider";
import ThemeLightOrDarkProvider from "@/providers/ThemeProvider";


const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Podcast",
  description: "Generated your podcasts using IA",
  icons:{
    icon:'/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en">
        <AudioProvider>
          <body className={`${manrope.className}`}>
            <ThemeLightOrDarkProvider>
              {children}
            </ThemeLightOrDarkProvider>
            </body>
          </AudioProvider>
      </html>
    </ConvexClerkProvider>
  );
}
