import ArticleContent from "../../components/ArticleContent";

const ArticleCategory = async ({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { category } = await params;
  const searchParamsResolved = await searchParams;
  const nextPageNumber = (searchParamsResolved?.nextpage as string) || null;

  return <ArticleContent category={category} nextPage={nextPageNumber} />;
};

export default ArticleCategory;
