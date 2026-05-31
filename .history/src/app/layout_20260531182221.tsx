import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Plus_Jakarta_Sans, DM_Sans } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/providers/QueryProvider';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Internshala — Internships & Fresher Jobs',
  description: 'Find the best internships in India',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${dmSans.variable} font-body bg-[#F7F7F7]`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
