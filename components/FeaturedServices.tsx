"use client";
import FeaturedServicesFrontend from "@/components/FeaturedServicesFrontend";
import FeaturedServicesBackend from "@/components/FeaturedServicesBackend";
import useFeatureInfo from "@/store/featuresInfo";

type Props = {
  layout: "textLeft" | "textRight";
  path: string;
  image: string;
  title: string;
  description: string;
  cta: string;
  features: {
    id: string;
    feature: string;
  }[];
  content?: React.ReactElement;
  onClick?: () => void;
};
const FeaturedServices = ({
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
        <FeaturedServicesFrontend
          layout={layout}
          path={path}
          image={image}
          title={title}
          description={description}
          cta={cta}
          features={features}
        />
      ) : (
        <FeaturedServicesBackend content={content} />
      )}
    </>
  );
};

export default FeaturedServices;
