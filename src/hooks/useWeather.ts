import { useState, useEffect } from "react";
import { fetchWeather } from "../utils/weather";
import type { WeatherData } from "../utils/weather";

const REFRESH_INTERVAL = 30 * 60 * 1000;

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await fetchWeather();
        if (mounted) {
          setWeather(data);
          setError(null);
        }
      } catch (e) {
        if (mounted) setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    const interval = setInterval(load, REFRESH_INTERVAL);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  return { weather, error, loading };
}
