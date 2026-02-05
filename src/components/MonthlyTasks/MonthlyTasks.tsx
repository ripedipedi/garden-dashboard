import { useState, useCallback } from "react";
import { monthlyTasks } from "../../data/monthlyTasks";
import styles from "./MonthlyTasks.module.css";

interface Props {
  today: Date;
}

function getMonthKey(year: number, month: number): string {
  return `garden-monthly-${year}-${String(month).padStart(2, "0")}`;
}

function loadMonthCompleted(year: number, month: number): Set<number> {
  try {
    const stored = localStorage.getItem(getMonthKey(year, month));
    if (stored) return new Set(JSON.parse(stored));
  } catch { /* ignore */ }
  return new Set();
}

function loadAllCompleted(year: number): Record<number, Set<number>> {
  const result: Record<number, Set<number>> = {};
  for (const mt of monthlyTasks) {
    result[mt.month] = loadMonthCompleted(year, mt.month);
  }
  return result;
}

export function MonthlyTasks({ today }: Props) {
  const currentMonth = today.getMonth() + 1;
  const year = today.getFullYear();
  const [openMonth, setOpenMonth] = useState<number>(currentMonth);
  const [completedMap, setCompletedMap] = useState<Record<number, Set<number>>>(() => loadAllCompleted(year));

  const toggle = useCallback((month: number, index: number) => {
    setCompletedMap((prev) => {
      const current = prev[month] ?? new Set<number>();
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      localStorage.setItem(getMonthKey(year, month), JSON.stringify([...next]));
      return { ...prev, [month]: next };
    });
  }, [year]);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Kuukausitehtävät</h2>
      {monthlyTasks.map((mt) => {
        const isOpen = openMonth === mt.month;
        const completed = completedMap[mt.month] ?? new Set<number>();
        return (
          <div key={mt.month} className={styles.card}>
            <button
              className={`${styles.header} ${styles[mt.season]}`}
              onClick={() => setOpenMonth(isOpen ? 0 : mt.month)}
              aria-expanded={isOpen}
              aria-label={`${mt.label} — ${isOpen ? "sulje" : "avaa"} tehtävät`}
            >
              {mt.label}
              <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}>▼</span>
            </button>
            {isOpen && (
              <div className={styles.body}>
                <ul className={styles.list}>
                  {mt.tasks.map((task, i) => {
                    const done = completed.has(i);
                    return (
                      <li key={i} className={`${styles.item} ${done ? styles.done : ""}`}>
                        <button
                          className={styles.checkbox}
                          onClick={() => toggle(mt.month, i)}
                          aria-label={done ? "Merkitse keskeneräiseksi" : "Merkitse tehdyksi"}
                        >
                          {done ? "☑" : "☐"}
                        </button>
                        <span className={done ? styles.strikethrough : ""}>{task}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
