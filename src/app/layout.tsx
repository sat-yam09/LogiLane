import type { Metadata } from 'next';
import { JetBrains_Mono, Anton, DM_Sans } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import GlobalTextReveal from '@/components/GlobalTextReveal';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Logilane — Autonomous Freight Corridors & Heavy Transport Architecture',
  description: 'Flagship enterprise digital platform for Logilane autonomous Class-8 freight corridors, Level 4 heavy-duty commercial logistics, and precision intermodal supply chains.',
  keywords: ['autonomous freight', 'Class-8 semi truck', 'logistics corridor', 'Level 4 trucking', 'intermodal supply chain', 'Logilane'],
  authors: [{ name: 'Logilane Engineering' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${anton.variable} ${dmSans.variable} light`}>
      <body className="bg-[#F8FAFC] text-[#0F172A] antialiased selection:bg-[#2563EB] selection:text-white min-h-screen">
        <Preloader />
        <CustomCursor />
        <GlobalTextReveal />
        <SmoothScroll>
          <Navigation />
          <main className="relative z-10">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
