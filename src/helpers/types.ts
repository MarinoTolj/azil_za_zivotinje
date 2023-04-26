export const species = ["dog", "cat", "other", ""] as const;

export type Species = (typeof species)[number];

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
