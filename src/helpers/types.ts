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

export const donationCategory = ["looking", "offering", "donated"] as const;
export type DonationCategoryType = (typeof donationCategory)[number];

export const donationType = ["food", "medicine", "toys", "vet costs"] as const;

export type DonationType = (typeof donationType)[number];
export interface IDonation {
  id: string;
  category: DonationCategoryType;
  type: DonationType;
  amount: number;
  description: string;
}
export interface INotification {
  id: string;
  title: string;
  important: boolean;
  date: string;
  body: string;
}

export type AdoptedStatus = "adopted" | "not adopted" | "fostered";
export interface IAnimal {
  name: string;
  id: string;
  age: number;
  species: Species;
  description: string;
  adopted: AdoptedStatus;
  chipped: boolean;
  lastCheck: string;
  imageUrl: string;
}

export type InputType = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export type FormType = React.ChangeEvent<HTMLFormElement>;
