import { create } from "zustand";
import { fetchImages } from "../lib/unsplash";
import { fetchAvatars } from "../lib/unsplash";

interface State {
  title: string;
  description: string;
  author: string;
  images: Promise<any[]>;
  setImages: string[];
  avatars: Promise<any[]>;
  setAvatars: string[];
  price: string;
}

const useArticlesStore = create<State>((set) => ({
  title: "",
  description: "",
  author: "",
  images: fetchImages(),
  setImages: [],
  avatars: fetchAvatars(),
  setAvatars: [],
  price: "",
}));

export default useArticlesStore;
