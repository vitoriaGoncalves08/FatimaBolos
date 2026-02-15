export type OrderItem = {
  id: string;
  name: string;
  price: number;
  unit?: string;
};

export type ProductColumn = {
  title: string;
  description?: string;
  highlight?: string;
  items: OrderItem[];
};

export const ORDER_STEPS = [
  { id: 0, iconKey: 'calendar', label: 'Data e Hora' },
  { id: 1, iconKey: 'delicias', label: 'Delícias' },
  { id: 2, iconKey: 'salgados', label: 'Salgados' },
  { id: 3, iconKey: 'base', label: 'Base do bolo' },
  { id: 4, iconKey: 'recheio', label: 'Recheio' },
  { id: 5, iconKey: 'adicionais', label: 'Adicionais' },
] as const;

export const TIME_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
] as const;

export const DELICIAS_COLUMNS: ProductColumn[] = [
  {
    title: 'Tortas doces',
    items: [
      { id: 'delicia-b1', name: 'Banoffe ou Limão P', price: 25.0, unit: 'R$ 25,00' },
      { id: 'delicia-b2', name: 'Banoffe ou Limão G', price: 35.0, unit: 'R$ 35,00' },
    ],
  },
  {
    title: 'Torta de Frango',
    description: 'Torta de frango com milho, ervilha, azeitona, tomate',
    highlight: '1Kg',
    items: [{ id: 'delicia-fr1', name: '', price: 50.0, unit: 'R$ 50,00/Cento' }],
  },
  {
    title: 'Pudim',
    description: 'Pudim cremoso de leite condensado com calda',
    items: [
      { id: 'delicia-pud-p', name: 'Pudim P', price: 25.0, unit: 'R$ 25,00' },
      { id: 'delicia-pud-m', name: 'Pudim M', price: 35.0, unit: 'R$ 35,00' },
      { id: 'delicia-pud-g', name: 'Pudim G', price: 50.0, unit: 'R$ 50,00' },
    ],
  },
  {
    title: 'Bolo de Pote',
    description: 'Bolo de pote de chocolate com cobertura de chocolate e granulado',
    highlight: '400g',
    items: [{ id: 'delicia-bp1', name: '', price: 7.0, unit: 'R$ 7,00/Cada' }],
  },
];

export const SALGADOS_COLUMNS: ProductColumn[] = [
  {
    title: 'Salgados de festa',
    items: [
      { id: 'sal-mini-cox', name: 'Coxinha de frango', price: 70.0, unit: 'R$ 70,00/Cento' },
      { id: 'sal-mini-bol', name: 'Bolinho de queijo', price: 70.0, unit: 'R$ 70,00/Cento' },
      { id: 'sal-mini-pas', name: 'Pastel', price: 70.0, unit: 'R$ 70,00/Cento' },
      { id: 'sal-mini-kib', name: 'Kibe', price: 70.0, unit: 'R$ 70,00/Cento' },
      { id: 'sal-mini-ris', name: 'Risole', price: 70.0, unit: 'R$ 70,00/Cento' },
      { id: 'sal-mini-enr', name: 'Enrolado de salsicha', price: 70.0, unit: 'R$ 70,00/Cento' },
    ],
  },
  {
    title: 'Salgados tamanho padrão',
    items: [
      { id: 'sal-pad-cox', name: 'Coxinha de frango', price: 4.0, unit: 'R$ 4,00/Uni.' },
      { id: 'sal-pad-bol', name: 'Bolinho de queijo', price: 4.0, unit: 'R$ 4,00/Uni.' },
      { id: 'sal-pad-pas', name: 'Pastel', price: 4.0, unit: 'R$ 4,00/Uni.' },
      { id: 'sal-pad-kib', name: 'Kibe', price: 4.0, unit: 'R$ 4,00/Uni.' },
      { id: 'sal-pad-ris', name: 'Risole', price: 4.0, unit: 'R$ 4,00/Uni.' },
      { id: 'sal-pad-enr', name: 'Enrolado de salsicha', price: 4.0, unit: 'R$ 4,00/Uni.' },
    ],
  },
];

export const PASTEL_OPTIONS = [
  { id: 'sal-mini-pas', label: 'Pastel (Cento)' },
  { id: 'sal-pad-pas', label: 'Pastel (Uni.)' },
] as const;

export const PASTEL_FLAVORS = ['Queijo', 'Carne', 'Frango', 'Frango com catupiry'] as const;

export const FILLING_COMBOS = [
  'Abacaxi + Doce de leite',
  'Creme de confeiteiro + Pêssego',
  'Creme de confeiteiro + Morango',
  'Creme de leite + ameixa',
  'Morango + Leite ninho',
] as const;

export const FILLING_BUILD = [
  'Chocolate',
  'Coco',
  'Musse de Maracujá',
  'Leite ninho',
  'Morango',
  'Creme de confeiteiro',
  'Pêssego',
  'Abacaxi',
  'Ameixa',
] as const;

export const PRICES = {
  fillingsPerKg: 50,
  topper: 20,
} as const;
