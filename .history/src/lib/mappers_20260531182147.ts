import type { Internship } from '@/types/internship';

function parseDurationToMonths(duration: string): number {
  const match = duration?.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

function parseStipend(stipendRaw: unknown): { min: number; max: number; label: string } {
  if (!stipendRaw || typeof stipendRaw !== 'object') {
    return { min: 0, max: 0, label: 'Unpaid' };
  }
  const s = stipendRaw as Record<string, unknown>;
  const min = typeof s.salary === 'number' ? s.salary : parseInt(String(s.salary ?? '0'), 10) || 0;
  const max =
    typeof s.salaryValue2 === 'number'
      ? s.salaryValue2
      : parseInt(String(s.salaryValue2 ?? '0'), 10) || 0;
  const label = typeof s.salaryValue1 === 'string' ? s.salaryValue1 : 'Unpaid';
  return { min, max, label };
}

export function mapApiResponseToInternships(raw: Record<string, unknown>): Internship[] {
  const meta = (raw.internship_meta ?? raw.internships ?? {}) as Record<string, unknown>;
  const entries = Object.values(meta);
  if (!entries.length) return [];

  return entries.map((item): Internship => {
    const i = item as Record<string, unknown>;

    const locations: string[] = Array.isArray(i.location_names)
      ? (i.location_names as string[])
      : typeof i.location_names === 'string'
        ? [i.location_names]
        : [];

    const skills: string[] = i.skill_set
      ? typeof i.skill_set === 'string'
        ? i.skill_set
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean)
        : Array.isArray(i.skill_set)
          ? (i.skill_set as string[])
          : []
      : [];

    const postedAt =
      (i.start_date as string | undefined) ??
      (i.posted_on as string | undefined) ??
      (i.created_at as string | undefined) ??
      new Date().toISOString();

    return {
      id: (i.id as string | number) ?? String(Math.random()),
      title: (i.profile_name ?? i.title ?? 'Internship') as string,
      companyName: (i.company_name ?? 'Company') as string,
      location: locations,
      stipend: parseStipend(i.stipend),
      duration: (i.duration ?? '1 Month') as string,
      durationMonths: parseDurationToMonths((i.duration ?? '') as string),
      startDate: (i.start_date ?? null) as string | null,
      skills,
      description: (i.other_detail ?? i.description ?? '') as string,
      postedAt,
      isPartTime: i.part_time === 'Yes' || i.part_time === true,
      isWorkFromHome:
        i.work_from_home === true ||
        i.work_from_home === 'Yes' ||
        locations.some((l) => l.toLowerCase().includes('work from home')),
      isActivelyHiring:
        i.label_successor_id !== null && i.label_successor_id !== undefined,
      hasJobOffer: i.ppo === true || i.ppo === 'Yes',
      isFastResponse: i.fast_response === true || i.fast_response === 'Yes',
      isForWomen: i.is_exclusively_for_women === true,
      logoUrl: (i.company_logo ?? null) as string | null,
    };
  });
}