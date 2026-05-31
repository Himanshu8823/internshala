export interface Internship {
  id: string | number;
  title: string;
  companyName: string;
  location: string[];
  stipend: {
    min: number;
    max: number;
    label: string;
  };
  duration: string;
  durationMonths: number;
  startDate: string | null;
  skills: string[];
  description: string;
  postedAt: string;
  isPartTime: boolean;
  isWorkFromHome: boolean;
  isActivelyHiring: boolean;
  hasJobOffer: boolean;
  isFastResponse: boolean;
  isForWomen: boolean;
  logoUrl: string | null;
}

export type DatePostedOption = 'any' | 'today' | '3days' | '7days' | '30days';

export interface FilterState {
  profile: string;
  location: string;
  minStipend: number;
  isWorkFromHome: boolean;
  isPartTime: boolean;
  maxDurationMonths: number | null;
  startingFrom: string | null;
  hasJobOffer: boolean;
  isFastResponse: boolean;
  isForWomen: boolean;
  datePosted: DatePostedOption;
}