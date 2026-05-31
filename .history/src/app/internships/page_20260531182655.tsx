import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { InternshipsPageClient } from './InternshipsPageClient';

export const metadata: Metadata = {
  title: 'Internships in India — Internshala',
  description: 'Apply to the latest internships across India',
};

export default function InternshipsPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 pb-12">
        <Breadcrumb />
        <InternshipsPageClient />
      </main>
    </>
  );
}