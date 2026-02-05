import { useState, useEffect } from "react";
import type { TodayTask } from "../../hooks/useTodayTasks";
import styles from "./TodaySection.module.css";

interface Props {
  tasks: TodayTask[];
}

function getTodayKey(): string {
  const d = new Date();
  return `garden-tasks-${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function loadCompleted(): Set<number> {
  try {
    const key = getTodayKey();
    const stored = localStorage.getItem(key);
    if (stored) return new Set(JSON.parse(stored));
  } catch { /* ignore */ }
  return new Set();
}

export function TodaySection({ tasks }: Props) {
  const [completed, setCompleted] = useState<Set<number>>(loadCompleted);

  useEffect(() => {
    localStorage.setItem(getTodayKey(), JSON.stringify([...completed]));
  }, [completed]);

  function toggle(index: number) {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Tänään</h2>
      {tasks.length === 0 ? (
        <p className={styles.empty}>Ei tehtäviä tänään</p>
      ) : (
        <ul className={styles.list}>
          {tasks.map((t, i) => {
            const done = completed.has(i);
            return (
              <li key={i} className={`${styles.item} ${done ? styles.done : ""}`}>
                <button
                  className={styles.checkbox}
                  onClick={() => toggle(i)}
                  aria-label={done ? "Merkitse keskeneräiseksi" : "Merkitse tehdyksi"}
                  style={{ borderColor: t.cropColor ?? "var(--text-light)" }}
                >
                  {done && <span className={styles.check}>✓</span>}
                </button>
                <span className={done ? styles.strikethrough : ""}>
                  {t.text}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
