'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Fuse from 'fuse.js';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface AutocompleteInputProps {
  suggestions: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
}

export function AutocompleteInput({
  suggestions,
  value,
  onChange,
  placeholder,
  label,
}: AutocompleteInputProps) {
  const [inputVal, setInputVal] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(suggestions, {
        threshold: 0.35,
        minMatchCharLength: 1,
        ignoreLocation: true,
      }),
    [suggestions]
  );

  const matched = useMemo(() => {
    if (!inputVal.trim()) return suggestions.slice(0, 8);
    return fuse
      .search(inputVal)
      .map((r) => r.item)
      .slice(0, 8);
  }, [inputVal, fuse, suggestions]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(item: string) {
    setInputVal(item);
    onChange(item);
    setIsOpen(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setInputVal(val);
    onChange(val);
    setIsOpen(true);
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="text-sm font-medium text-[#1A1A1A] mb-1 block">{label}</label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
        <Input
          value={inputVal}
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="pl-9 border-[#E0E0E0] text-sm"
        />
      </div>
      {isOpen && matched.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-[#E0E0E0] rounded-lg shadow-lg max-h-52 overflow-y-auto">
          {matched.map((item) => (
            <li
              key={item}
              onMouseDown={() => handleSelect(item)}
              className="px-4 py-2 text-sm text-[#1A1A1A] hover:bg-blue-50 hover:text-[#006BFF] cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}