export const species = [
  "dog",
  "cat",
  "bird",
  "rabbit",
  "hamster",
  "other",
  "",
] as const;
export type UserRole = "user" | "admin";
export interface User {
  username: string;
  email: string;
  password: string;
  type: UserRole;
}

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
export type GenderType = "male" | "female";
export interface IAnimal {
  name: string;
  id: string;
  age: number;
  gender: GenderType;
  species: Species;
  description: string;
  adopted: AdoptedStatus;
  chipped: boolean;
  lastCheck: string;
  imageUrl: string;
}

export type InputType = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

export type FormType = React.ChangeEvent<HTMLFormElement>;
