import { crops } from "../../data/crops";
import { resolveDate } from "../../utils/dates";
import styles from "./Timeline.module.css";

const months = [
  { num: 5, label: "Touko" },
  { num: 6, label: "Kesä" },
  { num: 7, label: "Heinä" },
  { num: 8, label: "Elo" },
  { num: 9, label: "Syys" },
  { num: 10, label: "Loka" },
];

function getCellText(cropId: string, monthNum: number, year: number): string | null {
  const crop = crops.find((c) => c.id === cropId);
  if (!crop) return null;

  const monthStart = new Date(year, monthNum - 1, 1);
  const monthEnd = new Date(year, monthNum, 0);

  const types = new Set<string>();
  const labels: string[] = [];

  for (const phase of crop.phases) {
    const phaseStart = resolveDate(phase.start, year);
    const phaseEnd = resolveDate(phase.end, year);

    // Check if phase overlaps with this month
    if (phaseStart <= monthEnd && phaseEnd >= monthStart) {
      if (phase.label) {
        labels.push(phase.label);
      }
      types.add(phase.type);
    }
  }

  if (types.size === 0) return null;

  // Build display text
  const parts: string[] = [];

  if (labels.length > 0) {
    // Use specific labels when available (e.g., "2. kylvö", "Syyskylvö")
    for (const label of labels) {
      if (!parts.includes(label)) parts.push(label);
    }
    // Also add non-labeled phase types
    if (types.has("harvest") && !parts.some((p) => p.toLowerCase().includes("sato"))) {
      parts.push("Sato");
    }
    if (types.has("grow") && !parts.some((p) => p.includes("↗"))) {
      // Only show grow if it's the primary activity (no sow/harvest labels)
      if (!types.has("sow") && !types.has("harvest")) parts.push("↗");
    }
  } else {
    if (types.has("sow") && types.has("harvest")) {
      parts.push("Sato+kylvö");
    } else if (types.has("sow")) {
      parts.push("Kylvö");
    } else if (types.has("harvest")) {
      parts.push("Sato");
    } else if (types.has("grow")) {
      parts.push("↗");
    }
  }

  return parts.join(", ") || null;
}

function getCellClass(text: string | null): string {
  if (!text) return "";
  const t = text.toLowerCase();
  if (t.includes("kylvö") && !t.includes("sato")) return styles.sow;
  if (t.includes("sato")) return styles.harvest;
  if (t === "↗") return styles.grow;
  return "";
}

interface Props {
  today: Date;
}

export function Timeline({ today }: Props) {
  const year = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const dayOfMonth = today.getDate();
  const monthIndex = months.findIndex((m) => m.num === currentMonth);

  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const fraction = dayOfMonth / daysInMonth;

  // Filter out secondCrop entries that share a plot — show them as separate rows
  const displayCrops = crops;

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Aikataulu</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Kasvi</th>
            {months.map((m) => (
              <th key={m.num}>{m.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayCrops.map((crop) => {
            const cells = months.map((m) => getCellText(crop.id, m.num, year));
            // Skip crops that have no activity at all
            if (cells.every((c) => c === null)) return null;
            return (
              <tr key={crop.id}>
                <td>{crop.name}</td>
                {cells.map((cell, i) => (
                  <td key={i} className={getCellClass(cell)}>
                    {cell ?? ""}
                    {i === monthIndex && (
                      <div
                        className={styles.todayMarker}
                        style={{ left: `${fraction * 100}%` }}
                      />
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
