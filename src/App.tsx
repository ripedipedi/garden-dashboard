import { useState, useEffect, useRef } from "react";
import { useWeather } from "./hooks/useWeather";
import { useAlerts } from "./hooks/useAlerts";
import { useTodayTasks } from "./hooks/useTodayTasks";
import { WeatherBar } from "./components/WeatherBar/WeatherBar";
import { TodaySection } from "./components/TodaySection/TodaySection";
import { PlotMap } from "./components/PlotMap/PlotMap";
import { CropCards } from "./components/CropCards/CropCards";
import { Timeline } from "./components/Timeline/Timeline";
import { MonthlyTasks } from "./components/MonthlyTasks/MonthlyTasks";

const NAV_ITEMS = [
  { id: "today", label: "Tänään" },
  { id: "plot", label: "Palsta" },
  { id: "crops", label: "Kasvit" },
  { id: "timeline", label: "Aikataulu" },
  { id: "tasks", label: "Tehtävät" },
] as const;

function useSeasonProgress(today: Date): { week: number; total: number } {
  const year = today.getFullYear();
  const seasonStart = new Date(year, 4, 1); // May 1
  const seasonEnd = new Date(year, 9, 31);   // Oct 31
  const totalWeeks = 26;
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const elapsed = today.getTime() - seasonStart.getTime();
  const week = Math.max(0, Math.min(totalWeeks, Math.ceil(elapsed / msPerWeek)));
  return { week: today >= seasonStart && today <= seasonEnd ? week : 0, total: totalWeeks };
}

export default function App() {
  const [today, setToday] = useState(() => new Date());
  const { weather, loading, error } = useWeather();
  const alerts = useAlerts(weather, today);
  const tasks = useTodayTasks(today, alerts);
  const [expandedCropId, setExpandedCropId] = useState<string | null>(null);
  const cropCardsRef = useRef<HTMLDivElement>(null);
  const season = useSeasonProgress(today);

  // Midnight timer — update date at midnight
  useEffect(() => {
    const now = new Date();
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();
    const timer = setTimeout(() => setToday(new Date()), msUntilMidnight);
    return () => clearTimeout(timer);
  }, [today]);

  function handleCropTap(cropId: string) {
    setExpandedCropId(cropId);
    // Scroll to CropCards section and expand the tapped crop
    setTimeout(() => {
      cropCardsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <WeatherBar weather={weather} alerts={alerts} loading={loading} error={error} />

      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 99,
        background: "var(--bg)",
        display: "flex",
        gap: "0.25rem",
        padding: "0.35rem 0.5rem",
        overflowX: "auto",
        borderBottom: "1px solid #ddd",
      }}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            style={{
              background: "var(--bg-card)",
              border: "1px solid #ddd",
              borderRadius: "99px",
              padding: "0.2rem 0.65rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--text)",
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div id="today">
        <TodaySection tasks={tasks} />
      </div>
      <div id="plot">
        <PlotMap today={today} onCropTap={handleCropTap} />
      </div>
      <div id="crops" ref={cropCardsRef}>
        <CropCards today={today} expandedCropId={expandedCropId} onExpandChange={setExpandedCropId} />
      </div>
      <div id="timeline">
        <Timeline today={today} />
      </div>
      <div id="tasks">
        <MonthlyTasks today={today} />
      </div>

      <footer style={{
        textAlign: "center",
        fontSize: "0.8rem",
        color: "#999",
        padding: "1rem",
      }}>
        {season.week > 0 && (
          <div style={{ marginBottom: "0.5rem" }}>
            <div style={{ fontSize: "0.75rem", marginBottom: "0.25rem" }}>
              Kasvukausi: viikko {season.week}/{season.total}
            </div>
            <div style={{
              height: 4,
              background: "#e0ddd5",
              borderRadius: 2,
              overflow: "hidden",
              maxWidth: 200,
              margin: "0 auto",
            }}>
              <div style={{
                height: "100%",
                width: `${(season.week / season.total) * 100}%`,
                background: "var(--alert-sow)",
                borderRadius: 2,
              }} />
            </div>
          </div>
        )}
        Espoo · Kasvuvyöhyke II · Viimeinen halla ~toukokuun puoliväli
      </footer>
    </div>
  );
}
