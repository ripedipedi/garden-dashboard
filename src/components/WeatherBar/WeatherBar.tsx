import { useState } from "react";
import type { WeatherData } from "../../utils/weather";
import type { Alert } from "../../hooks/useAlerts";
import { AlertBadge } from "../AlertBadge/AlertBadge";
import styles from "./WeatherBar.module.css";

interface Props {
  weather: WeatherData | null;
  alerts: Alert[];
  loading: boolean;
  error: string | null;
}

const WEEKDAYS_FI = ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"];

function weatherIcon(precip: number, minTemp: number): string {
  if (minTemp < 0 && precip > 1) return "🌨";
  if (precip > 5) return "🌧";
  if (precip > 1) return "🌦";
  if (minTemp < 0) return "❄";
  return "☀";
}

export function WeatherBar({ weather, alerts, loading, error }: Props) {
  const [forecastOpen, setForecastOpen] = useState(true);

  const forecastDays = weather
    ? Array.from({ length: 5 }, (_, i) => {
        const day = new Date();
        day.setDate(day.getDate() + i + 1);
        return {
          weekday: WEEKDAYS_FI[day.getDay()],
          high: weather.dailyMaxTemps[i + 1],
          precip: weather.dailyPrecipitation[i + 1],
          minTemp: weather.dailyMinTemps[i + 1],
        };
      })
    : [];

  return (
    <div className={styles.bar}>
      {loading && <span className={styles.loading}>Ladataan...</span>}
      {error && <span className={styles.loading}>Sää ei saatavilla</span>}
      {weather && (
        <>
          <span className={styles.temp}>{weather.current.temperature.toFixed(0)}°C</span>
          <div className={styles.meta}>
            <span className={styles.soil}>Maa 6cm: {weather.current.soilTemp.toFixed(0)}°C</span>
            <span className={styles.wind}>Tuuli: {weather.current.windSpeed.toFixed(0)} m/s</span>
          </div>
          <div className={styles.alerts}>
            {alerts.map((a, i) => (
              <AlertBadge key={i} alert={a} />
            ))}
          </div>
          <button
            className={styles.forecastToggle}
            onClick={() => setForecastOpen(!forecastOpen)}
            aria-label={forecastOpen ? "Piilota ennuste" : "Näytä ennuste"}
          >
            <span className={`${styles.chevron} ${forecastOpen ? styles.chevronOpen : ""}`}>▾</span>
          </button>
          {forecastOpen && (
            <div className={styles.forecast}>
              {forecastDays.map((d) => (
                <div key={d.weekday} className={styles.forecastDay}>
                  <span>{d.weekday}</span>
                  <span>{weatherIcon(d.precip, d.minTemp)} {d.high?.toFixed(0)}°</span>
                  {d.precip > 0 && (
                    <span className={styles.forecastPrecip}>{d.precip.toFixed(0)}mm</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
