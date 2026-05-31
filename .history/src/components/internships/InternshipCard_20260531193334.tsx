import Image from 'next/image';
import { MapPin, IndianRupee, Clock, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Internship } from '@/types/internship';

interface InternshipCardProps {
  internship: Internship;
}

export function InternshipCard({ internship }: InternshipCardProps) {
  const displayedSkills = internship.skills.slice(0, 4);
  const extraSkills = internship.skills.length - 4;
  const isValidLogoSrc =
    !!internship.logoUrl && (internship.logoUrl.startsWith('http://') || internship.logoUrl.startsWith('https://') || internship.logoUrl.startsWith('/'));
  const logoSrc = isValidLogoSrc ? internship.logoUrl : null;

  return (
    <article className="bg-white rounded-xl border border-[#E0E0E0] shadow-sm hover:shadow-md transition-shadow duration-200 p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h2 className="text-[17px] font-bold text-[#1A1A1A] leading-snug truncate">
            {internship.title}
          </h2>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <span className="text-sm text-[#6B7280]">{internship.companyName}</span>
            {internship.isActivelyHiring && (
              <Badge className="bg-[#0BC56E]/10 text-[#0BC56E] border-[#0BC56E]/20 text-[11px] font-medium px-2 py-0">
                Actively hiring
              </Badge>
            )}
          </div>
        </div>

        <div className="w-12 h-12 rounded border border-[#E0E0E0] flex items-center justify-center bg-gray-50 flex-shrink-0 overflow-hidden">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt={`${internship.companyName} logo`}
              width={48}
              height={48}
              className="object-contain"
            />
          ) : (
            <Briefcase className="h-5 w-5 text-[#6B7280]" />
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#6B7280] mb-3">
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5 text-[#6B7280]" />
          {internship.location.join(', ') || 'Remote'}
        </span>
        <span className="flex items-center gap-1">
          <IndianRupee className="h-3.5 w-3.5 text-[#6B7280]" />
          {internship.stipend.label || 'Unpaid'}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5 text-[#6B7280]" />
          {internship.duration}
        </span>
      </div>

      {internship.description && (
        <p className="text-sm text-[#6B7280] line-clamp-2 mb-3">{internship.description}</p>
      )}

      {internship.skills.length > 0 && (
        <p className="text-sm text-[#6B7280] mb-4">
          {displayedSkills.join(' • ')}
          {extraSkills > 0 && <span className="text-[#006BFF] font-medium"> +{extraSkills} more</span>}
        </p>
      )}

      <div className="flex items-center gap-2 text-sm text-[#14B8A6]">
        <Clock className="h-3.5 w-3.5" />
        <span>{internship.postedAt}</span>
        {internship.isPartTime && <span className="text-[#6B7280]">• Part time</span>}
      </div>
    </article>
  );
}