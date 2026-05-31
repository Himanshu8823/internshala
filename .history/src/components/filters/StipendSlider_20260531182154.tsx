'use client';

import { Slider } from '@/components/ui/slider';
import { STIPEND_STEP_LABELS } from '@/lib/constants';

interface StipendSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function StipendSlider({ value, onChange }: StipendSliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-[#1A1A1A]">
          Desired minimum monthly stipend (₹)
        </label>
        <span className="text-sm font-semibold text-[#006BFF] ml-2 whitespace-nowrap">
          {value === 0 ? 'Any' : `₹ ${value.toLocaleString('en-IN')} / mo`}
        </span>
      </div>
      <Slider
        min={0}
        max={10000}
        step={2000}
        value={[value]}
        onValueChange={([val]) => onChange(val)}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-[#6B7280] px-1">
        {STIPEND_STEP_LABELS.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}