import {Manrope} from 'next/font/google';
import './globals.css';
import type { Metadata } from "next";
import ConvexClerkProvider  from '@/providers/ConvexClerkProvider';
import AudioProvider        from '@/providers/AudioProvider';
import ThemeProvider        from '@/providers/ThemeProvider';

const manrope = Manrope({subsets: ['latin']});

export const metadata: Metadata = {
  title: "Podcast",
  description: "Generated your podcasts using IA",
  icons:{
    icon:'/icons/logo.svg'
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es">
      <body className={manrope.className}>
        <ConvexClerkProvider>
          <AudioProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </AudioProvider>
        </ConvexClerkProvider>
      </body>
    </html>
  );
}
