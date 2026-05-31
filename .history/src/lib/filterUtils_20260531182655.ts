import Fuse from 'fuse.js';
import type { Internship, FilterState } from '@/types/internship';

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
    const now = new Date();
    const cutoffMs: Record<string, number> = {
      today: 24 * 60 * 60 * 1000,
      '3days': 3 * 24 * 60 * 60 * 1000,
      '7days': 7 * 24 * 60 * 60 * 1000,
      '30days': 30 * 24 * 60 * 60 * 1000,
    };
    const cutoff = new Date(now.getTime() - cutoffMs[filters.datePosted]);
    result = result.filter((item) => {
      const d = new Date(item.postedAt);
      return !isNaN(d.getTime()) && d >= cutoff;
    });
  }

  if (filters.isForWomen) {
    result = result.filter((item) => item.isForWomen);
  }

  return result;
}