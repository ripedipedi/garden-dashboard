import styles from "./Timeline.module.css";

const months = [
  { num: 5, label: "Touko" },
  { num: 6, label: "Kesä" },
  { num: 7, label: "Heinä" },
  { num: 8, label: "Elo" },
  { num: 9, label: "Syys" },
  { num: 10, label: "Loka" },
];

interface CropRow {
  name: string;
  cells: (string | null)[];
}

const rows: CropRow[] = [
  { name: "Herneet",       cells: ["Kylvö", "↗",          "Sato",    "Sato",    null,      null] },
  { name: "Pinaatti",      cells: ["Kylvö", "Sato",       "2. kylvö","Sato",    null,      null] },
  { name: "Porkkanat",     cells: ["Kylvö", "↗",          "↗",       "Sato",    "Sato",    null] },
  { name: "Punajuuret",    cells: ["Kylvö", "↗",          "↗",       "Sato",    "Sato",    null] },
  { name: "Kesäkurpitsa",  cells: [null,    "Kylvö",      "↗",       "Sato",    "Sato",    null] },
  { name: "Kesäsipuli",    cells: ["Kylvö", "Sato+kylvö", "Sato",    "Sato",    null,      null] },
  { name: "Pensaspavut",   cells: [null,    "Kylvö",      "Sato",    "Sato",    null,      null] },
  { name: "Salaatti",      cells: ["Kylvö", "Sato+kylvö", "Sato",    "Sato",    null,      null] },
  { name: "Retiisit",      cells: ["Kylvö", "Sato!",      null,      null,      null,      null] },
  { name: "Kiinankaali",   cells: [null,    null,          "Kylvö",   "↗",       "Sato",    "Sato"] },
  { name: "Tilli",         cells: ["Kylvö", "Sato",       "Sato",    "Sato",    null,      null] },
];

function getCellClass(text: string | null): string {
  if (!text) return "";
  const t = text.toLowerCase();
  if (t.includes("kylvö") && !t.includes("sato")) return styles.sow;
  if (t.includes("sato")) return styles.harvest;
  if (t === "↗") return styles.grow;
  return "";
}

interface Props {
  today: Date;
}

export function Timeline({ today }: Props) {
  const currentMonth = today.getMonth() + 1; // 1-indexed
  const dayOfMonth = today.getDate();
  const monthIndex = months.findIndex((m) => m.num === currentMonth);

  // Fraction through the current month
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const fraction = dayOfMonth / daysInMonth;

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Aikataulu</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Kasvi</th>
            {months.map((m) => (
              <th key={m.num}>{m.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td>{row.name}</td>
              {row.cells.map((cell, i) => (
                <td key={i} className={getCellClass(cell)}>
                  {cell ?? ""}
                  {i === monthIndex && (
                    <div
                      className={styles.todayMarker}
                      style={{ left: `${fraction * 100}%` }}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
