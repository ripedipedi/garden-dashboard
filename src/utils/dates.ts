import type { Crop, Phase } from "../data/crops";

/** Resolve a "MM-DD" string to a Date in the given year (defaults to current year) */
export function resolveDate(mmdd: string, year?: number): Date {
  const y = year ?? new Date().getFullYear();
  const [month, day] = mmdd.split("-").map(Number);
  return new Date(y, month - 1, day);
}

export function isInRange(date: Date, start: string, end: string): boolean {
  const d = stripTime(date);
  const y = d.getFullYear();
  return d >= resolveDate(start, y) && d <= resolveDate(end, y);
}

export function stripTime(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getCurrentPhase(crop: Crop, today: Date): Phase | null {
  for (const phase of crop.phases) {
    if (isInRange(today, phase.start, phase.end)) return phase;
  }
  return null;
}

export function getOverallProgress(crop: Crop, today: Date): number {
  const y = today.getFullYear();
  const allStart = resolveDate(crop.phases[0].start, y);
  const allEnd = resolveDate(crop.phases[crop.phases.length - 1].end, y);
  const t = stripTime(today).getTime();
  if (t < allStart.getTime()) return 0;
  if (t > allEnd.getTime()) return 1;
  return (t - allStart.getTime()) / (allEnd.getTime() - allStart.getTime());
}

export function getPhaseLabel(type: Phase["type"]): string {
  switch (type) {
    case "sow": return "Kylvö";
    case "grow": return "Kasvu";
    case "harvest": return "Sato";
  }
}
