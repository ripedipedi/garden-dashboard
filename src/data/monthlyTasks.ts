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
      "Maan valmistelu: kuohkeuta, lisää kompostia — ravinteet kasvuun",
      "Aikaisin kylvö (maa +5°C): herneet, pinaatti, salaatti, retiisit, tilli",
      "Kylvä: porkkanat, punajuuret, kesäsipuli, persilja",
      "Kastele kylvöalueet kevyesti — siemenet tarvitsevat kosteutta itääkseen",
      "Ruohosipuli herää — leikkaa kuivat varret pois",
    ],
  },
  {
    month: 6,
    label: "Kesäkuu",
    season: "summer",
    tasks: [
      "Kylvä: kesäkurpitsa, pensaspavut (maa +12°C)",
      "Salaatin jatkokylvö — 2 vk välein tasainen sato",
      "Harvenna porkkanat (5 cm välein) — tilaa juurelle kasvaa",
      "Harvenna punajuuret (10 cm välein)",
      "Herneille tukiverkko/risut — herneet kiipeävät ja tuottavat enemmän",
      "Kesäkurpitsalle harsosuoja — suojaa kylmiltä öiltä",
      "Ensimmäinen retiisisato!",
      "Pinaatin 1. sato + 2. kylvö",
      "Persiljan satokausi alkaa — leikkaa uloimmat varret",
    ],
  },
  {
    month: 7,
    label: "Heinäkuu",
    season: "summer",
    tasks: [
      "Kastelu säännöllisesti — etenkin kuivana, aamuisin juurelle",
      "Kylvä kiinankaali suoraan maahan",
      "Retiisipenkkiin syyskylvö: pinaatti (heinäkuun alussa)",
      "Herneiden sato alkaa — poimi säännöllisesti, tuottaa lisää",
      "Pensaspapujen sato alkaa",
      "Salaatin sato jatkuu",
      "Ruohosipulin satokausi parhaimmillaan",
    ],
  },
  {
    month: 8,
    label: "Elokuu",
    season: "summer",
    tasks: [
      "Pääsatokausi: porkkanat, punajuuret, kesäkurpitsa",
      "Harvenna kiinankaali (25 cm välein) — tarvitsee tilaa",
      "Herneet, pavut, salaatti jatkuvat",
      "Pinaatin 2. sato",
      "Syyspinaatti retiisipenkissä alkaa valmistua",
      "Nokkosliuoslannoitus kiinankaali + kesäkurpitsa",
    ],
  },
  {
    month: 9,
    label: "Syyskuu",
    season: "autumn",
    tasks: [
      "Porkkanat ja punajuuret: viimeinen nosto ennen yöpakkasia",
      "Kesäkurpitsa: viimeinen sato",
      "Kiinankaali: ensimmäinen sato",
      "Syyspinaatti retiisipenkistä: viimeiset sadot",
      "Persiljan viimeiset sadot — voi kuivata talveksi",
    ],
  },
  {
    month: 10,
    label: "Lokakuu",
    season: "autumn",
    tasks: [
      "Kiinankaali: viimeinen sato ennen pakkasia",
      "Palstan siivous, kasvijätteet kompostiin — ehkäisee tauteja",
      "Merkitse ruohosipulin paikka — monivuotinen, nousee keväällä",
      "Levitä kompostia tyhjille penkeille — maanparannus talven yli",
    ],
  },
];
