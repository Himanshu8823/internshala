import type { FilterState } from '@/types/internship';

export const STIPEND_STEP_LABELS = ['0', '2K', '4K', '6K', '8K', '10K'] as const;

export const DURATION_OPTIONS = [1, 2, 3, 4, 6, 12, 24, 36] as const;

export const DATE_POSTED_OPTIONS = [
  { value: 'any', label: 'Any time' },
  { value: 'today', label: 'Today' },
  { value: '3days', label: 'Last 3 days' },
  { value: '7days', label: 'Last 7 days' },
  { value: '30days', label: 'Last 30 days' },
] as const;

export const DEFAULT_FILTERS: FilterState = {
  profile: '',
  location: '',
  minStipend: 0,
  isWorkFromHome: false,
  isPartTime: false,
  maxDurationMonths: null,
  startingFrom: null,
  hasJobOffer: false,
  isFastResponse: false,
  isForWomen: false,
  datePosted: 'any',
};