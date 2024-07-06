

import { create } from "zustand";
import { fetchImages } from "../lib/unsplash";
import { fetchAvatars } from "../lib/unsplash";
import { blogData } from "@/data/BlogData";

interface ArticleData {
  id: number;
  images: string[];
  avatars: string[];
  author: string;
  title: string;
  description: string;
  price: string;
}

interface State {
  title: string[];
  setTitle: () => void;
  description: string;
  setDescription: (newDescription: string) => void;
  author: string;
  setAuthor: (newAuthor: string) => void;
  images: string[];
  getImages: () => void;
  avatars: string[];
  getAvatars: () => void;
  price: string;
  setPrice: (newPrice: string) => void;
  data: ArticleData[];
  setData: (data: ArticleData[]) => void;
}

const useArticlesStore = create<State>((set) => ({
  images: [""],
  getImages: async () => {
    try {
      const images = await fetchImages();
      set({ images });
    } catch (error) {
      console.error(error);
    }
  },
  avatars: [""],
  getAvatars: async () => {
    try {
      const avatars = await fetchAvatars();
      set({ avatars });
    } catch (error) {
      console.error(error);
    }
  },
  data: [
    {
      id: 0,
      images: [],
      avatars: [],
      author: "",
      title: "",
      description: "",
      price: "",
    },
  ],
  setData: (data: ArticleData[]) => set({ data }),
  title: [""],
  setTitle: () => set({ title: blogData.map((element) => element.title) }),
  description: "",
  setDescription: (description) => set({ description }),
  author: "",
  setAuthor: (author) => set({ author }),
  price: "",
  setPrice: (price) => set({ price }),
}));

export default useArticlesStore;
