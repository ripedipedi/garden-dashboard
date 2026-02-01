export interface MonthlyTask {
  month: number;
  label: string;
  season: "spring" | "summer" | "autumn";
  tasks: string[];
}

export const monthlyTasks: MonthlyTask[] = [
  {
    month: 5,
    label: "Toukokuu",
    season: "spring",
    tasks: [
      "Maan valmistelu: kuohkeuta, lisää kompostia",
      "Kylvä: herneet, pinaatti, porkkanat, punajuuret, salaatti, retiisit, kesäsipuli, tilli",
      "Kastele kylvöalueet kevyesti",
    ],
  },
  {
    month: 6,
    label: "Kesäkuu",
    season: "summer",
    tasks: [
      "Kylvä: kesäkurpitsa, pensaspavut",
      "Salaatin jatkokylvö",
      "Harvenna porkkanat (5 cm välein), punajuuret (10 cm)",
      "Herneille tukiverkko/risut",
      "Kesäkurpitsalle harsosuoja",
      "Ensimmäinen retiisisato!",
      "Pinaatin 1. sato + 2. kylvö",
    ],
  },
  {
    month: 7,
    label: "Heinäkuu",
    season: "summer",
    tasks: [
      "Kastelu säännöllisesti (etenkin kuivana)",
      "Kylvä kiinankaali suoraan maahan",
      "Herneiden sato alkaa",
      "Pensaspapujen sato alkaa",
      "Salaatin sato jatkuu",
    ],
  },
  {
    month: 8,
    label: "Elokuu",
    season: "summer",
    tasks: [
      "Pääsatokausi: porkkanat, punajuuret, kesäkurpitsa",
      "Harvenna kiinankaali (25 cm välein)",
      "Herneet, pavut, salaatti jatkuvat",
      "Pinaatin 2. sato",
    ],
  },
  {
    month: 9,
    label: "Syyskuu",
    season: "autumn",
    tasks: [
      "Porkkanat ja punajuuret: viimeinen nosto",
      "Kesäkurpitsa: viimeinen sato",
      "Kiinankaali: ensimmäinen sato",
    ],
  },
  {
    month: 10,
    label: "Lokakuu",
    season: "autumn",
    tasks: [
      "Kiinankaali: viimeinen sato ennen pakkasia",
      "Palstan siivous, kasvijätteet kompostiin",
    ],
  },
];
