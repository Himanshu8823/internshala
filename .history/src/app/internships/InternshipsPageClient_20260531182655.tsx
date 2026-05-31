'use client';

import { useState, useMemo } from 'react';
import { useInternships } from '@/hooks/useInternships';
import { FilterPanel } from '@/components/filters/FilterPanel';
import { InternshipListSection } from '@/components/internships/InternshipListSection';
import { filterInternships } from '@/lib/filterUtils';
import { DEFAULT_FILTERS } from '@/lib/constants';
import type { FilterState } from '@/types/internship';

export function InternshipsPageClient() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const { data, isLoading, isError } = useInternships();

  const profileSuggestions = useMemo(() => {
    if (!data) return [];
    return [...new Set(data.map((i) => i.title))].sort();
  }, [data]);

  const locationSuggestions = useMemo(() => {
    if (!data) return [];
    const locs = data.flatMap((i) => i.location);
    return [...new Set(locs)]
      .filter((l) => !l.toLowerCase().includes('work from home'))
      .sort();
  }, [data]);

  const filteredCount = useMemo(() => {
    if (!data) return 0;
    return filterInternships(data, filters).length;
  }, [data, filters]);

  return (
    <>
      <div className="text-center py-6">
        <h1 className="text-2xl font-bold text-[#1A1A1A] font-heading">
          {isLoading ? '...' : `${filteredCount.toLocaleString()} Total Internships`}
        </h1>
        <p className="text-[#6B7280] mt-1 text-sm">Latest Summer Internships in India</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        <FilterPanel
          filters={filters}
          onFiltersChange={setFilters}
          profileSuggestions={profileSuggestions}
          locationSuggestions={locationSuggestions}
        />
        <InternshipListSection
          filters={filters}
          data={data}
          isLoading={isLoading}
          isError={isError}
          onClearFilters={() => setFilters(DEFAULT_FILTERS)}
        />
      </div>
    </>
  );
}