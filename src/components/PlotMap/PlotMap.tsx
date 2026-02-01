import { crops } from "../../data/crops";
import type { Crop } from "../../data/crops";
import { getOverallProgress } from "../../utils/dates";
import styles from "./PlotMap.module.css";

interface Props {
  today: Date;
  onCropTap: (crop: Crop) => void;
}

export function PlotMap({ today, onCropTap }: Props) {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Palsta</h2>
      <div className={styles.compass}>N ↑</div>
      <div className={styles.plot}>
        {crops.map((crop) => {
          const progress = getOverallProgress(crop, today);
          return (
            <div
              key={crop.id}
              className={styles.cell}
              style={{
                gridColumn: `${crop.area.col[0]}/${crop.area.col[1]}`,
                gridRow: `${crop.area.row[0]}/${crop.area.row[1]}`,
                background: crop.color,
                color: crop.textColor ?? "#fff",
              }}
              onClick={() => onCropTap(crop)}
            >
              {crop.name}
              <div className={styles.progress} style={{ width: `${progress * 100}%` }} />
            </div>
          );
        })}
      </div>
      <div className={styles.compass} style={{ marginTop: "var(--space-xs)" }}>S ↓</div>
    </section>
  );
}
