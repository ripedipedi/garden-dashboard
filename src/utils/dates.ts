import type { Crop, Phase } from "../data/crops";

export function isInRange(date: Date, start: string, end: string): boolean {
  const d = stripTime(date);
  return d >= new Date(start) && d <= new Date(end);
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
  const allStart = new Date(crop.phases[0].start);
  const allEnd = new Date(crop.phases[crop.phases.length - 1].end);
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
