import { useState } from "react";
import { format, subDays, startOfMonth, endOfMonth, subMonths } from "date-fns";
import type { DateRange } from "../types";

type Preset = "last_7_days" | "last_14_days" | "last_30_days" | "this_month" | "last_month" | "custom";

function presetToRange(preset: Preset): DateRange {
  const today = new Date();
  switch (preset) {
    case "last_7_days":
      return { date_from: format(subDays(today, 6), "yyyy-MM-dd"), date_to: format(today, "yyyy-MM-dd") };
    case "last_14_days":
      return { date_from: format(subDays(today, 13), "yyyy-MM-dd"), date_to: format(today, "yyyy-MM-dd") };
    case "last_30_days":
      return { date_from: format(subDays(today, 29), "yyyy-MM-dd"), date_to: format(today, "yyyy-MM-dd") };
    case "this_month":
      return { date_from: format(startOfMonth(today), "yyyy-MM-dd"), date_to: format(today, "yyyy-MM-dd") };
    case "last_month": {
      const lastMonth = subMonths(today, 1);
      return {
        date_from: format(startOfMonth(lastMonth), "yyyy-MM-dd"),
        date_to: format(endOfMonth(lastMonth), "yyyy-MM-dd"),
      };
    }
    default:
      return { date_from: format(subDays(today, 29), "yyyy-MM-dd"), date_to: format(today, "yyyy-MM-dd") };
  }
}

export function useDateRange(defaultPreset: Preset = "last_30_days") {
  const [preset, setPreset] = useState<Preset>(defaultPreset);
  const [customRange, setCustomRange] = useState<DateRange>(presetToRange(defaultPreset));

  const range = preset === "custom" ? customRange : presetToRange(preset);

  const setPresetOrRange = (p: Preset, custom?: DateRange) => {
    setPreset(p);
    if (p === "custom" && custom) setCustomRange(custom);
  };

  return { preset, range, setPreset: setPresetOrRange };
}
