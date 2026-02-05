export interface Phase {
  type: "sow" | "grow" | "harvest";
  start: string; // MM-DD format
  end: string;   // MM-DD format
  label?: string;
}

export interface Crop {
  id: string;
  name: string;
  initial: string;
  color: string;
  textColor?: string;
  area: { col: [number, number]; row: [number, number] };
  dimensions: string;
  soilTempMin: number;
  phases: Phase[];
  care: {
    sowDepth: string;
    spacing: string;
    watering: string;
    fertilization: string;
    pests: string;
    harvestTip: string;
  };
  companions?: { good: string[]; bad: string[] };
  varieties?: string;
  secondCrop?: string;
}

export const crops: Crop[] = [
  {
    id: "herneet",
    name: "Herneet",
    initial: "H",
    color: "#6B8E23",
    area: { col: [1, 31], row: [1, 8] },
    dimensions: "3,0 m × 0,7 m",
    soilTempMin: 5,
    phases: [
      { type: "sow", start: "04-20", end: "05-05", label: "Aikaisin kylvö" },
      { type: "sow", start: "05-20", end: "05-31" },
      { type: "grow", start: "06-01", end: "07-14" },
      { type: "harvest", start: "07-15", end: "08-31" },
    ],
    care: {
      sowDepth: "3–5 cm",
      spacing: "Riviväli: 20 cm",
      watering: "Kohtuullinen, ei liikaa",
      fertilization: "Ei tarvetta — sitoo typpeä",
      pests: "Kirva → saippuavesiruiskutus, tarkista lehdet alta",
      harvestTip: "Poimi säännöllisesti, tuottaa lisää",
    },
    companions: {
      good: ["Porkkanat", "Salaatti", "Retiisit"],
      bad: ["Kesäsipuli"],
    },
    varieties: "'Kelvedon Wonder' tai 'Hurst Greenshaft'",
  },
  {
    id: "pinaatti",
    name: "Pinaatti",
    initial: "Pi",
    color: "#3B7A57",
    area: { col: [31, 41], row: [1, 8] },
    dimensions: "1,0 m × 0,7 m",
    soilTempMin: 5,
    phases: [
      { type: "sow", start: "04-20", end: "05-05", label: "Aikaisin kylvö" },
      { type: "sow", start: "05-15", end: "05-25" },
      { type: "grow", start: "05-26", end: "06-19" },
      { type: "harvest", start: "06-20", end: "07-10" },
      { type: "sow", start: "07-01", end: "07-10", label: "2. kylvö" },
      { type: "grow", start: "07-11", end: "08-09" },
      { type: "harvest", start: "08-10", end: "08-31" },
    ],
    care: {
      sowDepth: "1–2 cm",
      spacing: "Riviväli: 10 cm",
      watering: "Tasainen kosteus",
      fertilization: "Kompostia istutukseen, ei lisälannoitusta",
      pests: "Lehtiminääjä → poista lehdet",
      harvestTip: "Leikkaa ulkolehdet, sydän kasvaa",
    },
    companions: { good: ["Herneet", "Salaatti"], bad: [] },
    varieties: "'Matador' tai 'Bloomsdale'",
  },
  {
    id: "porkkanat",
    name: "Porkkanat",
    initial: "Po",
    color: "#ED8936",
    area: { col: [1, 19], row: [10, 20] },
    dimensions: "1,8 m × 1,0 m",
    soilTempMin: 7,
    phases: [
      { type: "sow", start: "05-15", end: "05-25" },
      { type: "grow", start: "05-26", end: "08-14" },
      { type: "harvest", start: "08-15", end: "09-30" },
    ],
    care: {
      sowDepth: "0,5–1 cm",
      spacing: "Riviväli: 5 cm",
      watering: "Tasainen, ei märkää",
      fertilization: "Kompostia keväällä, ei tuoretta lantaa (haaroittaa)",
      pests: "Porkkanakärpänen → harso, tilli viereen (karkottaa)",
      harvestTip: "Nosta kun latvus 1–2 cm",
    },
    companions: {
      good: ["Tilli", "Herneet", "Kesäsipuli"],
      bad: [],
    },
    varieties: "'Nantes'-tyyppi tai 'Berlicum'",
  },
  {
    id: "punajuuret",
    name: "Punajuuret",
    initial: "Pu",
    color: "#9B2335",
    area: { col: [22, 41], row: [10, 20] },
    dimensions: "1,9 m × 1,0 m",
    soilTempMin: 7,
    phases: [
      { type: "sow", start: "05-15", end: "05-25" },
      { type: "grow", start: "05-26", end: "08-14" },
      { type: "harvest", start: "08-15", end: "09-30" },
    ],
    care: {
      sowDepth: "2–3 cm",
      spacing: "Riviväli: 10 cm",
      watering: "Tasainen",
      fertilization: "Kompostia keväällä, puutarhan yleislannoite kesäkuussa",
      pests: "Harvoin ongelmia, tarkkaile lehtitauteja kostealla säällä",
      harvestTip: "Nosta kun 5–8 cm halkaisija",
    },
    companions: { good: ["Salaatti", "Kesäsipuli"], bad: [] },
    varieties: "'Detroit Dark Red' tai 'Cylindra'",
  },
  {
    id: "kiinankaali",
    name: "Kiinankaali",
    initial: "Kk",
    color: "#7BAE37",
    area: { col: [1, 19], row: [22, 32] },
    dimensions: "1,8 m × 1,0 m",
    soilTempMin: 10,
    phases: [
      { type: "sow", start: "07-01", end: "07-10" },
      { type: "grow", start: "07-11", end: "09-14" },
      { type: "harvest", start: "09-15", end: "10-15" },
    ],
    care: {
      sowDepth: "1–2 cm",
      spacing: "Väli: 30 cm",
      watering: "Runsas, tasainen",
      fertilization: "Runsaasti kompostia, nokkosliuos 2 vk välein",
      pests: "Kirppa → harso, etanat → oluansa",
      harvestTip: "Leikkaa koko kerä tyveltä",
    },
    companions: { good: ["Pinaatti"], bad: [] },
  },
  {
    id: "kesakurpitsa",
    name: "Kesäkurpitsa",
    initial: "Ku",
    color: "#2D6A4F",
    area: { col: [22, 32], row: [22, 32] },
    dimensions: "1,0 m × 1,0 m",
    soilTempMin: 12,
    phases: [
      { type: "sow", start: "06-01", end: "06-10" },
      { type: "grow", start: "06-11", end: "07-31" },
      { type: "harvest", start: "08-01", end: "09-15" },
    ],
    care: {
      sowDepth: "2–3 cm",
      spacing: "Väli: 80 cm",
      watering: "Runsas, juurelle",
      fertilization: "Runsaasti kompostia, nokkosliuos viikoittain kukinta-aikaan",
      pests: "Härmä → ilmankierto, vältä lehtien kastelua",
      harvestTip: "Kerää 15–20 cm kokoisena",
    },
    companions: { good: ["Herneet", "Tilli"], bad: [] },
    varieties: "'Black Beauty' tai 'Zucchini Elite'",
  },
  {
    id: "kesasipuli",
    name: "Kesäsipuli",
    initial: "Si",
    color: "#7CB342",
    textColor: "#2d4016",
    area: { col: [32, 41], row: [22, 32] },
    dimensions: "0,9 m × 1,0 m",
    soilTempMin: 7,
    phases: [
      { type: "sow", start: "05-15", end: "05-25" },
      { type: "grow", start: "05-26", end: "06-19" },
      { type: "harvest", start: "06-20", end: "08-15" },
    ],
    care: {
      sowDepth: "1 cm",
      spacing: "Riviväli: 5 cm",
      watering: "Kevyt",
      fertilization: "Kompostia keväällä riittää",
      pests: "Sipulikärpänen → harso, viljele tillin vieressä",
      harvestTip: "Nosta kun varsi kynän paksuinen",
    },
    companions: { good: ["Porkkanat", "Punajuuret"], bad: ["Herneet"] },
  },
  {
    id: "salaatti",
    name: "Salaatti",
    initial: "Sa",
    color: "#68D391",
    textColor: "#1a4731",
    area: { col: [1, 10], row: [34, 41] },
    dimensions: "0,9 m × 0,7 m",
    soilTempMin: 5,
    phases: [
      { type: "sow", start: "04-20", end: "05-05", label: "Aikaisin kylvö" },
      { type: "sow", start: "05-15", end: "08-01", label: "Jatkokylvö" },
      { type: "harvest", start: "06-15", end: "08-31" },
    ],
    care: {
      sowDepth: "0,5 cm",
      spacing: "Riviväli: 15 cm",
      watering: "Kevyt, usein",
      fertilization: "Kevästi kompostia, ei raskasta lannoitusta",
      pests: "Etanat → oluansa, tarkkaile lehtihometta",
      harvestTip: "Leikkaa aamuisin, rapein",
    },
    companions: { good: ["Retiisit", "Porkkanat", "Herneet"], bad: [] },
    varieties: "'Grand Rapids' tai 'Lollo Rossa'",
  },
  {
    id: "retiisit",
    name: "Retiisit",
    initial: "R",
    color: "#E53E3E",
    area: { col: [10, 19], row: [34, 41] },
    dimensions: "0,9 m × 0,7 m",
    soilTempMin: 5,
    phases: [
      { type: "sow", start: "04-20", end: "05-05", label: "Aikaisin kylvö" },
      { type: "sow", start: "05-15", end: "05-25" },
      { type: "grow", start: "05-26", end: "06-09" },
      { type: "harvest", start: "06-10", end: "06-30" },
    ],
    care: {
      sowDepth: "1–2 cm",
      spacing: "Riviväli: 3 cm",
      watering: "Tasainen",
      fertilization: "Ei tarvitse lisälannoitusta",
      pests: "Kirppa → harso, kastelulla ehkäistävän kuivuusstressin",
      harvestTip: "Nosta 3–4 vk jälkeen",
    },
    companions: { good: ["Salaatti", "Herneet"], bad: [] },
    secondCrop: "retiisi-syksy",
  },
  {
    id: "retiisi-syksy",
    name: "Retiisi → Pinaatti",
    initial: "R→P",
    color: "#3B7A57",
    area: { col: [10, 19], row: [34, 41] },
    dimensions: "0,9 m × 0,7 m (sama penkki)",
    soilTempMin: 5,
    phases: [
      { type: "sow", start: "07-01", end: "07-10", label: "Syyskylvö" },
      { type: "grow", start: "07-11", end: "08-20" },
      { type: "harvest", start: "08-21", end: "09-30" },
    ],
    care: {
      sowDepth: "1–2 cm",
      spacing: "Riviväli: 10 cm",
      watering: "Tasainen kosteus",
      fertilization: "Kompostia kylvöön",
      pests: "Harvoin ongelmia, tarkkaile lehtitauteja kostealla säällä",
      harvestTip: "Leikkaa ulkolehdet, sydän kasvaa",
    },
  },
  {
    id: "pensaspavut",
    name: "Pensaspavut",
    initial: "Pa",
    color: "#38A169",
    area: { col: [22, 36], row: [34, 41] },
    dimensions: "1,4 m × 0,7 m",
    soilTempMin: 12,
    phases: [
      { type: "sow", start: "06-01", end: "06-10" },
      { type: "grow", start: "06-11", end: "07-19" },
      { type: "harvest", start: "07-20", end: "08-31" },
    ],
    care: {
      sowDepth: "3–5 cm",
      spacing: "Riviväli: 15 cm",
      watering: "Kohtuullinen",
      fertilization: "Kuten herneet — sitoo typpeä, ei tarvetta",
      pests: "Kirva → saippuavesiruiskutus, tarkista lehdet alta",
      harvestTip: "Poimi ennen siementen pullistumista",
    },
    companions: { good: ["Kesäkurpitsa", "Porkkanat"], bad: ["Kesäsipuli"] },
    varieties: "'Provider' tai 'Contender'",
  },
  {
    id: "tilli",
    name: "Tilli",
    initial: "T",
    color: "#B7D96A",
    textColor: "#2d5016",
    area: { col: [36, 41], row: [34, 39] },
    dimensions: "0,5 m × 0,5 m",
    soilTempMin: 5,
    phases: [
      { type: "sow", start: "04-20", end: "05-05", label: "Aikaisin kylvö" },
      { type: "sow", start: "05-20", end: "05-31" },
      { type: "grow", start: "06-01", end: "06-19" },
      { type: "harvest", start: "06-20", end: "08-31" },
    ],
    care: {
      sowDepth: "0,5 cm",
      spacing: "Hajallaan",
      watering: "Kevyt",
      fertilization: "Ei tarvitse lannoitusta",
      pests: "Ei yleensä — karkottaa tuholaisia naapurikasveilta",
      harvestTip: "Leikkaa tarpeen mukaan, kukinto hyödyksi säilöntään",
    },
    companions: { good: ["Porkkanat", "Kesäkurpitsa"], bad: [] },
  },
  {
    id: "persilja",
    name: "Persilja",
    initial: "Pe",
    color: "#4A7C59",
    area: { col: [36, 39], row: [39, 41] },
    dimensions: "0,3 m × 0,2 m",
    soilTempMin: 5,
    phases: [
      { type: "sow", start: "05-10", end: "05-25" },
      { type: "grow", start: "05-26", end: "06-30" },
      { type: "harvest", start: "07-01", end: "09-30" },
    ],
    care: {
      sowDepth: "1 cm",
      spacing: "Väli: 15 cm",
      watering: "Tasainen kosteus",
      fertilization: "Kompostia istutukseen",
      pests: "Harvoin ongelmia",
      harvestTip: "Leikkaa uloimmat varret, sydän kasvaa",
    },
    companions: { good: ["Porkkanat", "Tilli"], bad: [] },
  },
  {
    id: "ruohosipuli",
    name: "Ruohosipuli",
    initial: "Rs",
    color: "#6B9E3A",
    area: { col: [39, 41], row: [39, 41] },
    dimensions: "0,2 m × 0,2 m",
    soilTempMin: 3,
    phases: [
      { type: "grow", start: "05-01", end: "05-14", label: "Herää kasvuun" },
      { type: "harvest", start: "05-15", end: "09-30" },
    ],
    care: {
      sowDepth: "Monivuotinen — ei kylvöä",
      spacing: "Jaa juurakko 3 v välein",
      watering: "Kevyt kastelu",
      fertilization: "Kompostia keväällä",
      pests: "Ei tuholaisia — karkottaa kiroja",
      harvestTip: "Leikkaa 3 cm maanpinnan yläpuolelta",
    },
    companions: { good: ["Porkkanat", "Salaatti"], bad: [] },
  },
];
