"use client";
// TODO: Caching
import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

export const fetchImages = async () => {
  const results = await unsplash.search.getPhotos({
    query: "products",
    page: 1,
    perPage: 9,
    orientation: "landscape",
  });
  const resultsArray = results.response.results;
  const images = resultsArray.map((image) => image.urls.regular);
  return images;
};

export const fetchAvatars = async () => {
  const results = await unsplash.search.getPhotos({
    query: "avatar",
    page: 1,
    perPage: 9,
  });
  const resultsArray = results.response.results;
  const avatars = resultsArray.map((avatar) => avatar.urls.regular);
  return avatars;
};


