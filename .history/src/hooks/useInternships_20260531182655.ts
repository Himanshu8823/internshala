import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/axios';
import { mapApiResponseToInternships } from '@/lib/mappers';
import type { Internship } from '@/types/internship';

async function fetchInternships(): Promise<Internship[]> {
  const { data } = await apiClient.get('/hiring/search');
  return mapApiResponseToInternships(data);
}

export function useInternships() {
  return useQuery<Internship[], Error>({
    queryKey: ['internships'],
    queryFn: fetchInternships,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}