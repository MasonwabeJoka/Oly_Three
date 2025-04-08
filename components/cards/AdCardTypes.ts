import { PortableTextBlock } from "sanity";

export interface Ad {
  _id: string;
  images: string[];
  title: string;
  description?: string;
  // description?: PortableTextBlock[];
  postedOn?: string;
  price?: number;
  avatar?: string;
  suburb?: string;
  city?: string;
}

export type CardSize = "large" | "standard" | "small";
export type CardType = "box" | "expanded";