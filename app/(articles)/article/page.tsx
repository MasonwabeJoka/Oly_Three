
import { articles } from "@/data/articles";
import { articleCategories } from "@/data/articlesCategories";
import { socialMediaData } from "@/data/socialMediaData";
import Article from "../components/Article";

// export async function getServerSideProps() {
//   return {
//     props: {
//       socialMediaData,
//       articleCategories,
//       articles,
//     },
//   };
// }

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
