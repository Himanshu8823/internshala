'use client';

import { Checkbox } from '@/components/ui/checkbox';

interface CheckboxFilterProps {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function CheckboxFilter({ id, label, checked, onCheckedChange }: CheckboxFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(val) => onCheckedChange(val === true)}
        className="border-[#E0E0E0] data-[state=checked]:bg-[#006BFF] data-[state=checked]:border-[#006BFF]"
      />
      <label htmlFor={id} className="text-sm text-[#1A1A1A] cursor-pointer select-none">
        {label}
      </label>
    </div>
  );
}