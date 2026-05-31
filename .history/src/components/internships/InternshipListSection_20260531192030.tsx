'use client';

import { useMemo } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InternshipCard } from './InternshipCard';
import { InternshipSkeleton } from './InternshipSkeleton';
import { EmptyState } from './EmptyState';
import { filterInternships } from '@/lib/filterUtils';
import type { Internship, FilterState } from '@/types/internship';

interface InternshipListSectionProps {
  filters: FilterState;
  data: Internship[] | undefined;
  isLoading: boolean;
  isError: boolean;
  onClearFilters: () => void;
}

export function InternshipListSection({
  filters,
  data,
  isLoading,
  isError,
  onClearFilters,
}: InternshipListSectionProps) {
  const sortedFiltered = useMemo(() => {
    const filtered = filterInternships(data ?? [], filters);
    return [...filtered].sort((a, b) => b.postedOnTimestamp - a.postedOnTimestamp);
  }, [data, filters]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <InternshipSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <AlertCircle className="h-12 w-12 text-red-400 mb-4" />
        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">Failed to load internships</h3>
        <p className="text-[#6B7280] text-sm mb-6">Something went wrong. Please try again.</p>
        <Button onClick={() => window.location.reload()} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  if (!sortedFiltered.length) {
    return <EmptyState onClearFilters={onClearFilters} />;
  }

  return (
    <div className="space-y-4">
      {sortedFiltered.map((internship) => (
        <InternshipCard key={internship.id} internship={internship} />
      ))}
    </div>
  );
}