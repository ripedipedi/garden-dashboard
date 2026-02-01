import { useState } from "react";
import { crops } from "../../data/crops";
import { getCurrentPhase, getPhaseLabel } from "../../utils/dates";
import styles from "./CropCards.module.css";

const phaseColors = { sow: "#D69E2E", grow: "#38A169", harvest: "#ED8936" };

interface Props {
  today: Date;
}

export function CropCards({ today }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Kasvit</h2>
      <div className={styles.grid}>
        {crops.map((crop) => {
          const phase = getCurrentPhase(crop, today);
          const isExpanded = expanded === crop.id;
          return (
            <div
              key={crop.id}
              className={styles.card}
              style={{ borderColor: crop.color }}
              onClick={() => setExpanded(isExpanded ? null : crop.id)}
            >
              <div className={styles.cardHeader}>
                <div>
                  <div className={styles.name}>{crop.name}</div>
                  <div className={styles.dim}>{crop.dimensions}</div>
                </div>
                {phase && (
                  <span className={styles.phase} style={{ background: phaseColors[phase.type] }}>
                    {phase.label ?? getPhaseLabel(phase.type)}
                  </span>
                )}
              </div>
              {isExpanded && (
                <dl className={styles.details}>
                  <dt>Kylvösyvyys</dt><dd>{crop.care.sowDepth}</dd>
                  <dt>Välistys</dt><dd>{crop.care.spacing}</dd>
                  <dt>Kastelu</dt><dd>{crop.care.watering}</dd>
                  <dt>Tuholaiset</dt><dd>{crop.care.pests}</dd>
                  <dt>Satovinkit</dt><dd>{crop.care.harvestTip}</dd>
                </dl>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
