"use client";
import ProductOfferFrontend from "@/components/ProductOfferFrontend";
import ProductOfferBackend from "@/components/ProductOfferBackend";
import useFeatureInfo from "@/store/featuresInfo";

type Props = {
  layout: "textLeft" | "textRight";
  path: string;
  image: string;
  title: string;
  description: string;
  cta: string;
  features: {
    id: number;
    feature: string;
  }[];
  content: JSX.Element
 
};
const ProductOffer = ({
  layout,
  path,
  image,
  title,
  description,
  cta,
  features,
  content,
 
}: Props) => {
  const { isMoreInfo } = useFeatureInfo();

  return (
    <>
      {isMoreInfo === false ? (
        <ProductOfferFrontend
          layout={layout}
          path={path}
          image={image}
          title={title}
          description={description}
          cta={cta}
          features={features}
        
        />
      ) : (
        <ProductOfferBackend content={content} />
      )}
    </>
  );
};

export default ProductOffer;
