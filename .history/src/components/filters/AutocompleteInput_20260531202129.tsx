'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Fuse from 'fuse.js';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';

interface AutocompleteInputProps {
  suggestions: string[];
  value: string[];
  onChange: (value: string[]) => void;
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
  const [mounted, setMounted] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    const selectedSet = new Set(value.map((item) => item.toLowerCase()));

    if (!inputVal.trim()) {
      return suggestions
        .filter((item) => !selectedSet.has(item.toLowerCase()))
        .slice(0, 8);
    }
    return fuse
      .search(inputVal)
      .map((r) => r.item)
      .filter((item) => !selectedSet.has(item.toLowerCase()))
      .slice(0, 8);
  }, [inputVal, fuse, suggestions, value]);

  useEffect(() => {
    setActiveIndex(matched.length > 0 ? 0 : -1);
    optionRefs.current = optionRefs.current.slice(0, matched.length);
  }, [matched]);

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
    if (value.some((selected) => selected.toLowerCase() === item.toLowerCase())) {
      setInputVal('');
      setIsOpen(false);
      return;
    }

    onChange([...value, item]);
    setInputVal('');
    setIsOpen(false);
    setActiveIndex(-1);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setInputVal(val);
    setIsOpen(true);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || matched.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((current) => (current + 1) % matched.length);
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((current) => (current - 1 + matched.length) % matched.length);
    }

    if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(matched[activeIndex]);
    }

    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }

  function clearSelected(item: string) {
    onChange(value.filter((selected) => selected.toLowerCase() !== item.toLowerCase()));
  }

  const selectedValues = value;

  if (!mounted) {
    return (
      <div className="relative" ref={wrapperRef}>
        <label className="text-sm font-medium text-[#1A1A1A] mb-1 block">{label}</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
          <Input
            value={''}
            readOnly
            placeholder={placeholder}
            className="pl-9 border-[#E0E0E0] text-sm"
          />
        </div>
        {selectedValues.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedValues.map((selected) => (
              <Badge
                key={selected}
                className="inline-flex items-center gap-2 rounded-md bg-[#006BFF] px-3 py-1 text-sm font-medium text-white"
              >
                {selected}
                <button
                  type="button"
                  onClick={() => clearSelected(selected)}
                  className="rounded-full p-0.5 hover:bg-white/20"
                  aria-label={`Clear ${selected}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    );
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
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pl-9 border-[#E0E0E0] text-sm"
        />
      </div>
      {selectedValues.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedValues.map((selected) => (
            <Badge
              key={selected}
              className="inline-flex items-center gap-2 rounded-md bg-[#006BFF] px-3 py-1 text-sm font-medium text-white"
            >
              {selected}
              <button
                type="button"
                onClick={() => clearSelected(selected)}
                className="rounded-full p-0.5 hover:bg-white/20"
                aria-label={`Clear ${selected}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </Badge>
          ))}
        </div>
      )}
      {isOpen && matched.length > 0 && (
        <ul className="autocomplete-scrollbar absolute z-50 w-full mt-1 bg-white border border-[#E0E0E0] rounded-lg shadow-lg max-h-52 overflow-y-auto">
          {matched.map((item, index) => (
            <li
              key={item}
              ref={(node) => {
                optionRefs.current[index] = node;
              }}
              onMouseDown={() => handleSelect(item)}
              className={[
                'px-4 py-2 text-sm cursor-pointer',
                index === activeIndex
                  ? 'bg-blue-50 text-[#006BFF]'
                  : 'text-[#1A1A1A] hover:bg-blue-50 hover:text-[#006BFF]',
              ].join(' ')}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}