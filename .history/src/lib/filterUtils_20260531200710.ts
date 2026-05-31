import Fuse from 'fuse.js';
import type { Internship, FilterState } from '@/types/internship';

function getPostedAgeDays(label: string): number | null {
  const normalized = label.trim().toLowerCase();

  if (!normalized) return null;
  if (normalized === 'today') return 0;

  const dayMatch = normalized.match(/^(\d+)\s+day(?:s)?\s+ago$/);
  if (dayMatch) return Number(dayMatch[1]);

  const weekMatch = normalized.match(/^(\d+)\s+week(?:s)?\s+ago$/);
  if (weekMatch) return Number(weekMatch[1]) * 7;

  const monthMatch = normalized.match(/^(\d+)\s+month(?:s)?\s+ago$/);
  if (monthMatch) return Number(monthMatch[1]) * 30;

  return null;
}

export function filterInternships(internships: Internship[], filters: FilterState): Internship[] {
  let result = internships;

  if (filters.profile.trim()) {
    const fuse = new Fuse(result, {
      keys: ['title'],
      threshold: 0.35,
      minMatchCharLength: 2,
      ignoreLocation: true,
    });
    result = fuse.search(filters.profile).map((r) => r.item);
  }

  if (filters.location.trim()) {
    const fuse = new Fuse(result, {
      keys: ['location'],
      threshold: 0.2,
      minMatchCharLength: 2,
      ignoreLocation: true,
    });
    result = fuse.search(filters.location).map((r) => r.item);
  }

  if (filters.minStipend > 0) {
    result = result.filter((item) => item.stipend.min >= filters.minStipend);
  }

  if (filters.isWorkFromHome) {
    result = result.filter((item) => item.isWorkFromHome);
  }

  if (filters.isPartTime) {
    result = result.filter((item) => item.isPartTime);
  }

  if (filters.maxDurationMonths !== null) {
    result = result.filter((item) => item.durationMonths <= filters.maxDurationMonths!);
  }

  if (filters.startingFrom) {
    const fromDate = new Date(filters.startingFrom);
    result = result.filter((item) => {
      if (!item.startDate) return true;
      return new Date(item.startDate) >= fromDate;
    });
  }

  if (filters.hasJobOffer) {
    result = result.filter((item) => item.hasJobOffer);
  }

  if (filters.isFastResponse) {
    result = result.filter((item) => item.isFastResponse);
  }

  if (filters.datePosted !== 'any') {
    const maxAgeDays: Record<string, number> = {
      today: 0,
      '3days': 3,
      '7days': 7,
      '30days': 30,
    };
    const maxDays = maxAgeDays[filters.datePosted];
    result = result.filter((item) => {
      const ageDays = getPostedAgeDays(item.postedAt);

      if (ageDays === null) return false;

      return ageDays <= maxDays;
    });
  }

  if (filters.isForWomen) {
    result = result.filter((item) => item.isForWomen);
  }

  return result;
}