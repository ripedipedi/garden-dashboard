import { useState, useMemo } from "react";
import { useWeather } from "./hooks/useWeather";
import { useAlerts } from "./hooks/useAlerts";
import { useTodayTasks } from "./hooks/useTodayTasks";
import type { Crop } from "./data/crops";
import { WeatherBar } from "./components/WeatherBar/WeatherBar";
import { TodaySection } from "./components/TodaySection/TodaySection";
import { PlotMap } from "./components/PlotMap/PlotMap";
import { CropSheet } from "./components/CropSheet/CropSheet";
import { CropCards } from "./components/CropCards/CropCards";
import { Timeline } from "./components/Timeline/Timeline";
import { MonthlyTasks } from "./components/MonthlyTasks/MonthlyTasks";

export default function App() {
  const today = useMemo(() => new Date(), []);
  const { weather, loading, error } = useWeather();
  const alerts = useAlerts(weather, today);
  const tasks = useTodayTasks(today, alerts);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);

  return (
    <div style={{ maxWidth: 480, margin: "0 auto" }}>
      <WeatherBar weather={weather} alerts={alerts} loading={loading} error={error} />
      <TodaySection tasks={tasks} />
      <PlotMap today={today} onCropTap={setSelectedCrop} />
      <CropCards today={today} />
      <Timeline today={today} />
      <MonthlyTasks today={today} />
      <footer style={{
        textAlign: "center",
        fontSize: "0.8rem",
        color: "#999",
        padding: "1rem",
      }}>
        Espoo · Kasvuvyöhyke II · Viimeinen halla ~toukokuun puoliväli
      </footer>
      {selectedCrop && (
        <CropSheet crop={selectedCrop} today={today} onClose={() => setSelectedCrop(null)} />
      )}
    </div>
  );
}
