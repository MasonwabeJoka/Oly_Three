import ArticleContent from "../components/ArticleContent";

const ArticleCategory = async ({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const resolvedSearchParams = await searchParams;
  const nextPageNumber = (resolvedSearchParams?.nextpage as string) || null;

  return <ArticleContent category="" nextPage={nextPageNumber} />;
};

export default ArticleCategory;
