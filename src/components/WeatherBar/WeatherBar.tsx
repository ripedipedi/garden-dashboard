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

export function WeatherBar({ weather, alerts, loading, error }: Props) {
  return (
    <div className={styles.bar}>
      {loading && <span className={styles.loading}>Ladataan...</span>}
      {error && <span className={styles.loading}>Sää ei saatavilla</span>}
      {weather && (
        <>
          <span className={styles.temp}>{weather.current.temperature.toFixed(0)}°C</span>
          <span className={styles.soil}>Maa: {weather.current.soilTemp.toFixed(0)}°C</span>
          <div className={styles.alerts}>
            {alerts.map((a, i) => (
              <AlertBadge key={i} alert={a} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
