export const species = [
  "dog",
  "cat",
  "bird",
  "rabbit",
  "hamster",
  "other",
  "",
] as const;

export type Species = (typeof species)[number];

export interface INotification {
  id: string;
  title: string;
  important: boolean;
  date: string;
  body: string;
}
export interface IAnimal {
  name: string;
  id: string;
  age: number;
  species: Species;
  description: string;
  adopted: boolean;
  chipped: boolean;
  lastCheck: string;
  imageUrl: string;
}
