import type { TodayTask } from "../../hooks/useTodayTasks";
import styles from "./TodaySection.module.css";

interface Props {
  tasks: TodayTask[];
}

export function TodaySection({ tasks }: Props) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Tänään</h2>
      {tasks.length === 0 ? (
        <p className={styles.empty}>Ei tehtäviä tänään</p>
      ) : (
        <ul className={styles.list}>
          {tasks.map((t, i) => (
            <li key={i} className={styles.item}>
              <span
                className={styles.dot}
                style={{ background: t.cropColor ?? "var(--text-light)" }}
              />
              {t.text}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
