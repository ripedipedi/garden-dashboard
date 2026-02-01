export interface Phase {
  type: "sow" | "grow" | "harvest";
  start: string;
  end: string;
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
    pests: string;
    harvestTip: string;
  };
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
      { type: "sow", start: "2026-05-20", end: "2026-05-31" },
      { type: "grow", start: "2026-06-01", end: "2026-07-14" },
      { type: "harvest", start: "2026-07-15", end: "2026-08-31" },
    ],
    care: {
      sowDepth: "3–5 cm",
      spacing: "Rivivali: 20 cm",
      watering: "Kohtuullinen, ei liikaa",
      pests: "Kirva → saippuavesi",
      harvestTip: "Poimi säännöllisesti, tuottaa lisää",
    },
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
      { type: "sow", start: "2026-05-15", end: "2026-05-25" },
      { type: "grow", start: "2026-05-26", end: "2026-06-19" },
      { type: "harvest", start: "2026-06-20", end: "2026-07-10" },
      { type: "sow", start: "2026-07-01", end: "2026-07-10", label: "2. kylvö" },
      { type: "grow", start: "2026-07-11", end: "2026-08-09" },
      { type: "harvest", start: "2026-08-10", end: "2026-08-31" },
    ],
    care: {
      sowDepth: "1–2 cm",
      spacing: "Rivivali: 10 cm",
      watering: "Tasainen kosteus",
      pests: "Lehtiminääjä → poista lehdet",
      harvestTip: "Leikkaa ulkolehdet, sydän kasvaa",
    },
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
      { type: "sow", start: "2026-05-15", end: "2026-05-25" },
      { type: "grow", start: "2026-05-26", end: "2026-08-14" },
      { type: "harvest", start: "2026-08-15", end: "2026-09-30" },
    ],
    care: {
      sowDepth: "0,5–1 cm",
      spacing: "Rivivali: 5 cm",
      watering: "Tasainen, ei märkää",
      pests: "Porkkanakärpänen → harso",
      harvestTip: "Nosta kun latvus 1–2 cm",
    },
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
      { type: "sow", start: "2026-05-15", end: "2026-05-25" },
      { type: "grow", start: "2026-05-26", end: "2026-08-14" },
      { type: "harvest", start: "2026-08-15", end: "2026-09-30" },
    ],
    care: {
      sowDepth: "2–3 cm",
      spacing: "Rivivali: 10 cm",
      watering: "Tasainen",
      pests: "Harvoin ongelmia",
      harvestTip: "Nosta kun 5–8 cm halkaisija",
    },
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
      { type: "sow", start: "2026-07-01", end: "2026-07-10" },
      { type: "grow", start: "2026-07-11", end: "2026-09-14" },
      { type: "harvest", start: "2026-09-15", end: "2026-10-15" },
    ],
    care: {
      sowDepth: "1–2 cm",
      spacing: "Väli: 30 cm",
      watering: "Runsas, tasainen",
      pests: "Kirppa → harso, etanat",
      harvestTip: "Leikkaa koko kerä tyveltä",
    },
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
      { type: "sow", start: "2026-06-01", end: "2026-06-10" },
      { type: "grow", start: "2026-06-11", end: "2026-07-31" },
      { type: "harvest", start: "2026-08-01", end: "2026-09-15" },
    ],
    care: {
      sowDepth: "2–3 cm",
      spacing: "Väli: 80 cm",
      watering: "Runsas, juurelle",
      pests: "Härmä → ilmankierto",
      harvestTip: "Kerää 15–20 cm kokoisena",
    },
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
      { type: "sow", start: "2026-05-15", end: "2026-05-25" },
      { type: "grow", start: "2026-05-26", end: "2026-06-19" },
      { type: "harvest", start: "2026-06-20", end: "2026-08-15" },
    ],
    care: {
      sowDepth: "1 cm",
      spacing: "Rivivali: 5 cm",
      watering: "Kevyt",
      pests: "Sipulikärpänen → harso",
      harvestTip: "Nosta kun varsi kynän paksuinen",
    },
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
      { type: "sow", start: "2026-05-15", end: "2026-08-01", label: "Jatkokylvö" },
      { type: "harvest", start: "2026-06-15", end: "2026-08-31" },
    ],
    care: {
      sowDepth: "0,5 cm",
      spacing: "Rivivali: 15 cm",
      watering: "Kevyt, usein",
      pests: "Etanat → oluansa",
      harvestTip: "Leikkaa aamuisin, rapein",
    },
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
      { type: "sow", start: "2026-05-15", end: "2026-05-25" },
      { type: "grow", start: "2026-05-26", end: "2026-06-09" },
      { type: "harvest", start: "2026-06-10", end: "2026-06-30" },
    ],
    care: {
      sowDepth: "1–2 cm",
      spacing: "Rivivali: 3 cm",
      watering: "Tasainen",
      pests: "Kirppa → harso",
      harvestTip: "Nosta 3–4 vk jälkeen",
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
      { type: "sow", start: "2026-06-01", end: "2026-06-10" },
      { type: "grow", start: "2026-06-11", end: "2026-07-19" },
      { type: "harvest", start: "2026-07-20", end: "2026-08-31" },
    ],
    care: {
      sowDepth: "3–5 cm",
      spacing: "Rivivali: 15 cm",
      watering: "Kohtuullinen",
      pests: "Kirva",
      harvestTip: "Poimi ennen siementen pullistumista",
    },
  },
  {
    id: "tilli",
    name: "Tilli",
    initial: "T",
    color: "#B7D96A",
    textColor: "#2d5016",
    area: { col: [36, 41], row: [34, 41] },
    dimensions: "0,5 m × 0,7 m",
    soilTempMin: 5,
    phases: [
      { type: "sow", start: "2026-05-20", end: "2026-05-31" },
      { type: "grow", start: "2026-06-01", end: "2026-06-19" },
      { type: "harvest", start: "2026-06-20", end: "2026-08-31" },
    ],
    care: {
      sowDepth: "0,5 cm",
      spacing: "Hajallaan",
      watering: "Kevyt",
      pests: "Ei yleensä",
      harvestTip: "Leikkaa tarpeen mukaan",
    },
  },
];
