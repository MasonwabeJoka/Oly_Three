

import Checkout from "@/app/(listings)/listings/[slug]/components/Checkout";

type PageProps = {
  params: {
    id: string;
  };
};
const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return <Checkout id={id} />;
};

export default Page;
