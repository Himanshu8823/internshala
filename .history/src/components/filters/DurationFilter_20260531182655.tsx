'use client';

import { cn } from '@/lib/utils';
import { DURATION_OPTIONS } from '@/lib/constants';

interface DurationFilterProps {
  value: number | null;
  onChange: (value: number | null) => void;
}

export function DurationFilter({ value, onChange }: DurationFilterProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[#1A1A1A] block">Max. duration (months)</label>
      <div className="flex flex-wrap gap-2">
        {DURATION_OPTIONS.map((months) => (
          <button
            key={months}
            onClick={() => onChange(value === months ? null : months)}
            className={cn(
              'px-3 py-1 rounded-full text-sm border transition-colors',
              value === months
                ? 'bg-[#006BFF] text-white border-[#006BFF]'
                : 'bg-white text-[#1A1A1A] border-[#E0E0E0] hover:border-[#006BFF] hover:text-[#006BFF]'
            )}
          >
            {months}
          </button>
        ))}
      </div>
    </div>
  );
}