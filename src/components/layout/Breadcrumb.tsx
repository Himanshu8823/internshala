import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export function Breadcrumb() {
  return (
    <nav className="flex items-center gap-1 text-sm text-[#6B7280] pt-4">
      <Link href="/" className="hover:text-[#006BFF]">
        Home
      </Link>
      <ChevronRight className="h-3.5 w-3.5" />
      <span className="text-[#1A1A1A] font-medium">Internships</span>
    </nav>
  );
}