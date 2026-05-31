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
import { DATE_POSTED_OPTIONS, DEFAULT_FILTERS } from '@/lib/constants';
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

  const isAnyFilterActive =
    filters.profile.length > 0 ||
    filters.location.length > 0 ||
    filters.minStipend !== 0 ||
    filters.isWorkFromHome ||
    filters.isPartTime ||
    filters.maxDurationMonths !== null ||
    filters.startingFrom !== null ||
    filters.hasJobOffer ||
    filters.isForWomen ||
    filters.datePosted !== 'any';

  return (
    <aside className="filter-scrollbar bg-white rounded-xl border border-[#EEF2F7] shadow-sm p-5 space-y-5 sticky top-[72px] self-start max-h-[calc(100vh-88px)] overflow-y-auto overflow-x-visible pr-2" style={{ overflowX: 'visible' }}>
      {/* Header */}
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

          {/* Starting from date picker */}
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
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
                side="bottom"
                avoidCollisions={false}
                style={{ zIndex: 9999 }}
              >
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  defaultMonth={selectedDate ?? new Date()}
                  captionLayout="dropdown"
                  fromYear={new Date().getFullYear()}
                  toYear={new Date().getFullYear() + 2}
                  onSelect={(date: Date | undefined) => {
                    update('startingFrom', date ? date.toISOString() : null);
                    setCalendarOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
            {/* Clear date button */}
            {selectedDate && (
              <button
                onClick={() => update('startingFrom', null)}
                className="text-xs text-[#006BFF] hover:underline mt-1"
              >
                Clear date
              </button>
            )}
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
              id="for-women"
              label="Internships for women"
              checked={filters.isForWomen}
              onCheckedChange={(val) => update('isForWomen', val)}
            />
          </div>

          <Separator />

          {/* Date Posted pill filter */}
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

      {/* Clear all — only shown when any filter is active, pinned to bottom right */}
      {isAnyFilterActive && (
        <div className="flex justify-end pt-3 border-t border-[#EEF2F7]">
          <button
            onClick={() => onFiltersChange(DEFAULT_FILTERS)}
            className="text-sm text-[#006BFF] hover:text-blue-800 font-medium transition-colors"
          >
            Clear all
          </button>
        </div>
      )}
    </aside>
  );
}