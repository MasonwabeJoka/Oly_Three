export interface Subcategory {
  name: string;
  slug: string;
}

export interface Category {
  id: number;
  category: string;
  subcategories: string[];
  image: string;
}

export interface SelectACategoryProps {
  goTo: (index: number) => void;
  setCategory: (category: string) => void;
}