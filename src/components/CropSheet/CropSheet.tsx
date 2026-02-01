import type { Crop } from "../../data/crops";
import { getCurrentPhase, getPhaseLabel } from "../../utils/dates";
import styles from "./CropSheet.module.css";

interface Props {
  crop: Crop;
  today: Date;
  onClose: () => void;
}

const phaseColors = { sow: "#D69E2E", grow: "#38A169", harvest: "#ED8936" };

export function CropSheet({ crop, today, onClose }: Props) {
  const phase = getCurrentPhase(crop, today);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.colorBar} style={{ background: crop.color }} />
          <span className={styles.name}>{crop.name}</span>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>
        <div className={styles.dim}>{crop.dimensions}</div>
        {phase && (
          <span className={styles.phase} style={{ background: phaseColors[phase.type] }}>
            {phase.label ?? getPhaseLabel(phase.type)}
          </span>
        )}
        <dl className={styles.dl}>
          <dt>Kylvösyvyys</dt><dd>{crop.care.sowDepth}</dd>
          <dt>Välistys</dt><dd>{crop.care.spacing}</dd>
          <dt>Kastelu</dt><dd>{crop.care.watering}</dd>
          <dt>Tuholaiset</dt><dd>{crop.care.pests}</dd>
          <dt>Satovinkit</dt><dd>{crop.care.harvestTip}</dd>
        </dl>
      </div>
    </div>
  );
}
