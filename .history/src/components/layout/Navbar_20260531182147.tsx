import { MessageCircle, ChevronDown, User } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-white border-b border-[#E0E0E0] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-[#006BFF]">
            <path
              d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
              stroke="#006BFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-lg font-bold tracking-wide">
            <span className="text-[#006BFF]">INTERN</span>
            <span className="text-[#00A699]">SHALA</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[#1A1A1A]">
          <a
            href="/internships"
            className="flex items-center gap-1 pb-1 border-b-2 border-[#00A699] text-[#00A699]"
          >
            Internships <ChevronDown className="h-3.5 w-3.5" />
          </a>
          <a href="#" className="flex items-center gap-1 text-[#1A1A1A] hover:text-[#006BFF]">
            Courses{' '}
            <span className="text-[10px] font-bold bg-orange-400 text-white px-1 rounded ml-0.5">
              OFFER
            </span>
            <ChevronDown className="h-3.5 w-3.5" />
          </a>
          <a href="#" className="flex items-center gap-1 text-[#1A1A1A] hover:text-[#006BFF]">
            Jobs <ChevronDown className="h-3.5 w-3.5" />
          </a>
          <button className="text-[#6B7280] hover:text-[#006BFF]">
            <MessageCircle className="h-5 w-5" />
          </button>
          <button className="w-8 h-8 rounded-full bg-[#006BFF] text-white flex items-center justify-center">
            <User className="h-4 w-4" />
          </button>
        </div>
      </div>
    </nav>
  );
}