
import { articles } from "@/data/articles";
import Article from "../../components/Article";
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

