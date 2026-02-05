import { crops } from "../../data/crops";
import { getOverallProgress } from "../../utils/dates";
import styles from "./PlotMap.module.css";

interface Props {
  today: Date;
  onCropTap: (cropId: string) => void;
}

export function PlotMap({ today, onCropTap }: Props) {
  // Filter: don't show secondCrop entries that overlap with their parent during parent's active period
  const visibleCrops = crops.filter((crop) => {
    if (!crop.secondCrop) {
      // Check if this crop IS a secondCrop — find its parent
      const parent = crops.find((c) => c.secondCrop === crop.id);
      if (parent) {
        // Only show secondCrop when its phases are active (after parent harvests)
        const progress = getOverallProgress(crop, today);
        return progress > 0 && progress < 1;
      }
    }
    // For parent crops with secondCrop, hide when secondCrop is active
    if (crop.secondCrop) {
      const child = crops.find((c) => c.id === crop.secondCrop);
      if (child) {
        const childProgress = getOverallProgress(child, today);
        if (childProgress > 0 && childProgress < 1) return false;
      }
    }
    return true;
  });

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Palsta</h2>
      <div className={styles.compass}>N ↑</div>
      <div className={styles.plot}>
        {visibleCrops.map((crop) => {
          const progress = getOverallProgress(crop, today);
          return (
            <button
              key={crop.id}
              className={styles.cell}
              style={{
                gridColumn: `${crop.area.col[0]}/${crop.area.col[1]}`,
                gridRow: `${crop.area.row[0]}/${crop.area.row[1]}`,
                background: crop.color,
                color: crop.textColor ?? "#fff",
              }}
              onClick={() => onCropTap(crop.id)}
              aria-label={`${crop.name} — näytä tiedot`}
            >
              <span className={styles.cellName}>{crop.name}</span>
              <span className={styles.cellInitial}>{crop.initial}</span>
              <div className={styles.progress} style={{ width: `${progress * 100}%` }} />
            </button>
          );
        })}
      </div>
      <div className={styles.compass} style={{ marginTop: "var(--space-xs)" }}>S ↓</div>
      <div className={styles.legend}>
        <span className={styles.legendBar} /> = edistyminen
      </div>
    </section>
  );
}
