import { ConditionsData } from "@/data/ConditionsData";
import { DetailsData } from "@/data/DetailsData";
import DetailsClient from "./DetailsClient";

const  Details = () => {
  const conditions = ConditionsData.map((detail) => detail.condition);
  const detailsTitles = DetailsData.map((detail) => detail.detail);

  return (
    <DetailsClient
      conditions={conditions}
      detailsTitles={detailsTitles}
      detailsData={DetailsData}
    />
  );
}

export default Details;
