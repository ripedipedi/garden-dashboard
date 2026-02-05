import { crops } from "../data/crops";
import { monthlyTasks } from "../data/monthlyTasks";
import { getCurrentPhase, getPhaseLabel } from "../utils/dates";
import type { Alert } from "./useAlerts";

export interface TodayTask {
  text: string;
  cropColor?: string;
}

export function useTodayTasks(today: Date, alerts: Alert[]): TodayTask[] {
  const tasks: TodayTask[] = [];

  // Frost protection
  const frostAlert = alerts.find((a) => a.type === "frost");
  if (frostAlert) {
    tasks.push({ text: "Suojaa taimet — hallavaroitus yölle" });
  }

  // Watering
  const waterAlert = alerts.find((a) => a.type === "water");
  if (waterAlert) {
    tasks.push({ text: waterAlert.message });
  }

  // Crop phase tasks
  for (const crop of crops) {
    const phase = getCurrentPhase(crop, today);
    if (!phase) continue;

    if (phase.type === "sow") {
      const sowAlert = alerts.find((a) => a.type === "sow" && a.crop?.id === crop.id);
      if (sowAlert) {
        tasks.push({
          text: `Kylvä ${crop.name.toLowerCase()}`,
          cropColor: crop.color,
        });
      }
    } else if (phase.type === "harvest") {
      tasks.push({
        text: `${crop.name}: ${getPhaseLabel(phase.type).toLowerCase()}kausi`,
        cropColor: crop.color,
      });
    }
  }

  // Monthly tasks for current month
  const monthTask = monthlyTasks.find((m) => m.month === today.getMonth() + 1);
  if (monthTask && tasks.length < 5) {
    for (const t of monthTask.tasks.slice(0, 5 - tasks.length)) {
      tasks.push({ text: t });
    }
  }

  return tasks.slice(0, 5);
}
