import { SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onClearFilters: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <SearchX className="h-12 w-12 text-[#6B7280] mb-4" />
      <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">No internships found</h3>
      <p className="text-[#6B7280] text-sm mb-6">
        Try adjusting your filters to find more opportunities.
      </p>
      <Button onClick={onClearFilters} className="bg-[#006BFF] hover:bg-blue-700 text-white">
        Clear Filters
      </Button>
    </div>
  );
}