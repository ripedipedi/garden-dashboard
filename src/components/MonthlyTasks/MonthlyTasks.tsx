import { useState } from "react";
import { monthlyTasks } from "../../data/monthlyTasks";
import styles from "./MonthlyTasks.module.css";

interface Props {
  today: Date;
}

export function MonthlyTasks({ today }: Props) {
  const currentMonth = today.getMonth() + 1;
  const [openMonth, setOpenMonth] = useState<number>(currentMonth);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Kuukausitehtävät</h2>
      {monthlyTasks.map((mt) => {
        const isOpen = openMonth === mt.month;
        return (
          <div key={mt.month} className={styles.card}>
            <div
              className={`${styles.header} ${styles[mt.season]}`}
              onClick={() => setOpenMonth(isOpen ? 0 : mt.month)}
            >
              {mt.label}
              <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}>▼</span>
            </div>
            {isOpen && (
              <div className={styles.body}>
                <ul className={styles.list}>
                  {mt.tasks.map((task, i) => (
                    <li key={i} className={styles.item}>{task}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
