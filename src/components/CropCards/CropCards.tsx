import { crops } from "../../data/crops";
import { getCurrentPhase, getPhaseLabel } from "../../utils/dates";
import styles from "./CropCards.module.css";

const phaseColors = { sow: "#D69E2E", grow: "#38A169", harvest: "#ED8936" };

interface Props {
  today: Date;
  expandedCropId: string | null;
  onExpandChange: (id: string | null) => void;
}

export function CropCards({ today, expandedCropId, onExpandChange }: Props) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Kasvit</h2>
      <div className={styles.grid}>
        {crops.map((crop) => {
          const phase = getCurrentPhase(crop, today);
          const isExpanded = expandedCropId === crop.id;
          return (
            <div key={crop.id} className={styles.card} style={{ borderColor: crop.color }}>
              <button
                className={styles.cardHeader}
                onClick={() => onExpandChange(isExpanded ? null : crop.id)}
                aria-expanded={isExpanded}
                aria-label={`${crop.name} — ${isExpanded ? "sulje" : "näytä"} tiedot`}
              >
                <div>
                  <div className={styles.name}>{crop.name}</div>
                  <div className={styles.dim}>{crop.dimensions}</div>
                </div>
                {phase && (
                  <span className={styles.phase} style={{ background: phaseColors[phase.type] }}>
                    {phase.label ?? getPhaseLabel(phase.type)}
                  </span>
                )}
              </button>
              {isExpanded && (
                <dl className={styles.details}>
                  <dt>Kylvösyvyys</dt><dd>{crop.care.sowDepth}</dd>
                  <dt>Välistys</dt><dd>{crop.care.spacing}</dd>
                  <dt>Kastelu</dt><dd>{crop.care.watering}</dd>
                  <dt>Lannoitus</dt><dd>{crop.care.fertilization}</dd>
                  <dt>Tuholaiset</dt><dd>{crop.care.pests}</dd>
                  <dt>Satovinkit</dt><dd>{crop.care.harvestTip}</dd>
                  {crop.varieties && (
                    <><dt>Lajikkeet</dt><dd>{crop.varieties}</dd></>
                  )}
                  {crop.companions && (crop.companions.good.length > 0 || crop.companions.bad.length > 0) && (
                    <>
                      <dt>Kumppanit</dt>
                      <dd>
                        {crop.companions.good.length > 0 && (
                          <span className={styles.good}>+ {crop.companions.good.join(", ")}</span>
                        )}
                        {crop.companions.bad.length > 0 && (
                          <span className={styles.bad}> − {crop.companions.bad.join(", ")}</span>
                        )}
                      </dd>
                    </>
                  )}
                </dl>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
