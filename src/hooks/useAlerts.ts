import type { WeatherData } from "../utils/weather";
import { crops } from "../data/crops";
import type { Crop } from "../data/crops";
import { isInRange } from "../utils/dates";

export interface Alert {
  type: "frost" | "water" | "sow";
  severity: "red" | "blue" | "green";
  message: string;
  crop?: Crop;
  days?: number;
}

export function useAlerts(weather: WeatherData | null, today: Date): Alert[] {
  if (!weather) return [];
  const alerts: Alert[] = [];

  // Frost: check next 24h hourly temps
  const next24h = weather.hourlyTemps.slice(0, 24);
  const minTemp = Math.min(...next24h);
  if (minTemp < 2) {
    alerts.push({
      type: "frost",
      severity: "red",
      message: `Hallavaroitus tänä yönä (${minTemp.toFixed(0)}°C)`,
    });
  }

  // Watering: count leading dry days
  let dryDays = 0;
  for (const p of weather.dailyPrecipitation) {
    if (p < 1) dryDays++;
    else break;
  }
  if (dryDays >= 3) {
    alerts.push({
      type: "water",
      severity: "blue",
      message: `Kastele penkit — ei sadetta ${dryDays} päivään`,
      days: dryDays,
    });
  }

  // Sowing readiness
  for (const crop of crops) {
    const sowPhases = crop.phases.filter((p) => p.type === "sow");
    for (const phase of sowPhases) {
      if (isInRange(today, phase.start, phase.end) && weather.current.soilTemp >= crop.soilTempMin) {
        alerts.push({
          type: "sow",
          severity: "green",
          message: `${crop.name}: maa tarpeeksi lämmin (${weather.current.soilTemp.toFixed(0)}°C ≥ ${crop.soilTempMin}°C)`,
          crop,
        });
      }
    }
  }

  return alerts;
}
