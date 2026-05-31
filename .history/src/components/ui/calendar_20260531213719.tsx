import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { cn } from '@/lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row gap-4',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button:
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border border-[#E5E7EB] rounded-md',
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-[#6B7280] rounded-md w-8 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: 'h-8 w-8 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-[#EEF5FF] [&:has([aria-selected])]:rounded-md',
        day: 'h-8 w-8 p-0 font-normal aria-selected:opacity-100 rounded-md',
        day_selected: 'bg-[#006BFF] text-white hover:bg-[#006BFF] hover:text-white',
        day_today: 'bg-[#F3F4F6] text-[#1A1A1A]',
        day_outside: 'text-[#9CA3AF] opacity-50',
        day_disabled: 'text-[#D1D5DB] opacity-50',
        day_range_middle: 'aria-selected:bg-[#EEF5FF] aria-selected:text-[#1A1A1A]',
        day_hidden: 'invisible',
        ...classNames,
      }}
      {...props}
    />
  );
}

Calendar.displayName = 'Calendar';

export { Calendar };