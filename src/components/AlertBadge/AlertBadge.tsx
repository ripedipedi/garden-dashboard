import { useState } from "react";
import type { Alert } from "../../hooks/useAlerts";
import styles from "./AlertBadge.module.css";

const icons = { frost: "❄", water: "💧", sow: "🌱" };
const shortLabels = { frost: "Halla", water: "Kastelu", sow: "Kylvö" };

interface Props {
  alert: Alert;
}

export function AlertBadge({ alert }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <span
      className={`${styles.badge} ${styles[alert.severity]} ${expanded ? styles.expanded : ""}`}
      onClick={() => setExpanded(!expanded)}
    >
      {icons[alert.type]} {expanded ? alert.message : shortLabels[alert.type]}
    </span>
  );
}
