const BASE = "https://api.open-meteo.com/v1/forecast";
const LAT = 60.2;
const LON = 24.66;

export interface WeatherData {
  current: {
    temperature: number;
    soilTemp: number;
  };
  hourlyTemps: number[];
  dailyPrecipitation: number[];
  dailyMinTemps: number[];
  dailyMaxTemps: number[];
  fetchedAt: number;
}

export async function fetchWeather(): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(LAT),
    longitude: String(LON),
    hourly: "temperature_2m,soil_temperature_6cm",
    daily: "temperature_2m_min,temperature_2m_max,precipitation_sum",
    forecast_days: "7",
    timezone: "Europe/Helsinki",
    current: "temperature_2m",
  });

  const res = await fetch(`${BASE}?${params}`);
  if (!res.ok) throw new Error(`Weather fetch failed: ${res.status}`);
  const data = await res.json();

  const nowHour = new Date().getHours();

  return {
    current: {
      temperature: data.current.temperature_2m,
      soilTemp: data.hourly.soil_temperature_6cm?.[nowHour] ?? 0,
    },
    hourlyTemps: data.hourly.temperature_2m ?? [],
    dailyPrecipitation: data.daily.precipitation_sum ?? [],
    dailyMinTemps: data.daily.temperature_2m_min ?? [],
    dailyMaxTemps: data.daily.temperature_2m_max ?? [],
    fetchedAt: Date.now(),
  };
}
