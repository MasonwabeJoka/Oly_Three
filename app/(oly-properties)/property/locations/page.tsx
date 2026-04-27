import Locations from "../components/Locations";
import { locations } from "@/data/locations";

const Page = () => {
  return (
    <div>
      <h2>Locations</h2>
      <Locations locations={locations} />
    </div>
  );
};

export default Page;
