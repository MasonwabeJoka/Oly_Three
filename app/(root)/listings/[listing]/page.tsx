import Listing from "./components/Listing";

type ParamsProp = {
  params: {
    listing: string;
  };
};

const Page = ({ params }: ParamsProp) => {
  
  return <Listing params={params} />;
};

export default Page;
