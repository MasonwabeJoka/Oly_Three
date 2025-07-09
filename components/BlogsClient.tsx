"use client";
import ArticlesSlider from "@/components/ArticlesSlider";

const BlogsClient = ({ images, avatars, author, title, description, price, data }) => {
  return (
    <ArticlesSlider
      images={images.length ? images : data[0].images}
      avatars={avatars.length ? avatars : [""]}
      author={author}
      title={title}
      description={description}
      price={price}
      data={data}
    />
  );
};

export default BlogsClient;