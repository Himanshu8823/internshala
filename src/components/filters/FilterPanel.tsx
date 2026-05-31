'use client';

import { useState } from 'react';
import { SlidersHorizontal, ChevronDown, ChevronUp, Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AutocompleteInput } from './AutocompleteInput';
import { StipendSlider } from './StipendSlider';
import { DurationFilter } from './DurationFilter';
import { CheckboxFilter } from './CheckboxFilter';
import { DATE_POSTED_OPTIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { FilterState, DatePostedOption } from '@/types/internship';

function formatDateLabel(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  profileSuggestions: string[];
  locationSuggestions: string[];
}

export function FilterPanel({
  filters,
  onFiltersChange,
  profileSuggestions,
  locationSuggestions,
}: FilterPanelProps) {
  const [showMore, setShowMore] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  function update<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    onFiltersChange({ ...filters, [key]: value });
  }

  const selectedDate = filters.startingFrom ? new Date(filters.startingFrom) : undefined;

  return (
    <aside className="bg-white rounded-lg border border-[#E0E0E0] shadow-sm p-5 space-y-5 sticky top-[72px] self-start">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-[#006BFF]" />
        <span className="font-semibold text-[#1A1A1A]">Filters</span>
      </div>

      <Separator />

      <AutocompleteInput
        label="Profile"
        placeholder="e.g. Marketing, Finance"
        suggestions={profileSuggestions}
        value={filters.profile}
        onChange={(val) => update('profile', val)}
      />

      <AutocompleteInput
        label="Location"
        placeholder="e.g. Delhi, Mumbai"
        suggestions={locationSuggestions}
        value={filters.location}
        onChange={(val) => update('location', val)}
      />

      <Separator />

      <div className="space-y-3">
        <CheckboxFilter
          id="wfh"
          label="Work from home"
          checked={filters.isWorkFromHome}
          onCheckedChange={(val) => update('isWorkFromHome', val)}
        />
        <CheckboxFilter
          id="part-time"
          label="Part-time"
          checked={filters.isPartTime}
          onCheckedChange={(val) => update('isPartTime', val)}
        />
      </div>

      <Separator />

      <StipendSlider value={filters.minStipend} onChange={(val) => update('minStipend', val)} />

      <button
        onClick={() => setShowMore((prev) => !prev)}
        className="flex items-center gap-1 text-sm font-medium text-[#006BFF] hover:underline"
      >
        {showMore ? (
          <>
            View less filters <ChevronUp className="h-4 w-4" />
          </>
        ) : (
          <>
            View more filters <ChevronDown className="h-4 w-4" />
          </>
        )}
      </button>

      {showMore && (
        <div className="space-y-5">
          <Separator />

          <div className="space-y-1">
            <label className="text-sm font-medium text-[#1A1A1A] block">
              Starting from (or after)
            </label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal border-[#E0E0E0] text-sm',
                    !selectedDate && 'text-[#6B7280]'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? formatDateLabel(selectedDate) : 'Choose date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date: Date | undefined) => {
                    update('startingFrom', date ? date.toISOString() : null);
                    setCalendarOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <DurationFilter
            value={filters.maxDurationMonths}
            onChange={(val) => update('maxDurationMonths', val)}
          />

          <Separator />

          <div className="space-y-3">
            <CheckboxFilter
              id="job-offer"
              label="Internships with job offer"
              checked={filters.hasJobOffer}
              onCheckedChange={(val) => update('hasJobOffer', val)}
            />
            <CheckboxFilter
              id="fast-response"
              label="Fast response"
              checked={filters.isFastResponse}
              onCheckedChange={(val) => update('isFastResponse', val)}
            />
            <CheckboxFilter
              id="for-women"
              label="Internships for women"
              checked={filters.isForWomen}
              onCheckedChange={(val) => update('isForWomen', val)}
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#1A1A1A] block">Date Posted</label>
            <div className="flex flex-wrap gap-2">
              {DATE_POSTED_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => update('datePosted', value as DatePostedOption)}
                  className={cn(
                    'px-3 py-1 rounded-full text-sm border transition-colors',
                    filters.datePosted === value
                      ? 'bg-[#006BFF] text-white border-[#006BFF]'
                      : 'bg-white text-[#1A1A1A] border-[#E0E0E0] hover:border-[#006BFF] hover:text-[#006BFF]'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}