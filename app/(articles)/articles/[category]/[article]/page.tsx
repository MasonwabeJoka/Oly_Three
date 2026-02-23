
import Article from "@/app/(articles)/components/Article";
import { articles } from "@/data/articles";
import { articleCategories } from "@/data/articlesCategories";
import { socialMediaData } from "@/data/socialMediaData";



const Page = () => {
  return (
    <Article
      socialMediaData={socialMediaData}
      articleCategories={articleCategories}
      articles={articles}
    />
  );
};

export default Page;
