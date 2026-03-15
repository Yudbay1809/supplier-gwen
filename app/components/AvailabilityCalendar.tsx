"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AvailabilityCalendarProps {
  bookedDates?: string[];
  onDateSelect?: (date: Date) => void;
}

export default function AvailabilityCalendar({
  bookedDates = [],
  onDateSelect,
}: AvailabilityCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  const isDateBooked = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(
      currentMonth.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return bookedDates.includes(dateStr);
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(date);
    onDateSelect?.(date);
  };

  return (
    <div className="rounded-xl bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h4 className="text-ink font-poppins">
          Ketersediaan
        </h4>
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setCurrentMonth(
                new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
              )
            }
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span
            className="min-w-[140px] text-center text-sm font-inter"
          >
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <button
            onClick={() =>
              setCurrentMonth(
                new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
              )
            }
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-2">
        {days.map((day) => (
          <div
            key={day}
            className="p-2 text-center text-xs text-muted-foreground font-inter"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const isBooked = isDateBooked(day);
          const isPast =
            new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day) <
            new Date();

          const isSelected =
            selectedDate?.getDate() === day &&
            selectedDate?.getMonth() === currentMonth.getMonth();

          const buttonStateClass = isBooked
            ? "bg-danger-soft text-red-500 cursor-not-allowed"
            : isPast
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : isSelected
            ? "bg-brand text-white cursor-pointer"
            : "bg-white text-ink cursor-pointer hover:bg-[#F3FFFC]";

          return (
            <button
              key={day}
              onClick={() => !isBooked && !isPast && handleDateClick(day)}
              disabled={isBooked || isPast}
              className={`flex aspect-square items-center justify-center rounded-lg border border-gray-200 text-sm font-inter transition-all ${buttonStateClass}`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center gap-4 text-xs font-inter">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-brand" />
          <span>Dipilih</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-danger-soft" />
          <span>Dibooking</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border border-gray-200 bg-white" />
          <span>Tersedia</span>
        </div>
      </div>
    </div>
  );
}

