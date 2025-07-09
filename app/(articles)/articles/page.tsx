import { articles } from "@/data/articles";
import { articleCategories } from "@/data/articlesCategories";
import Articles from "../components/Articles";


// export async function getServerSideProps() {
//   // Simulate fetching data from an API or database
//   return {
//     props: {
//       articles,
//       articleCategories,
//     },
//   };
// }

const Page =() => {
  return <Articles articles={articles} articleCategories={articleCategories} />;
}

export default Page;
