import {queryOptions} from "@tanstack/react-query";
import { getMoreFromOly } from "./data";

export const moreFromOlyQueryOptions = queryOptions({
    queryKey: ["moreFromOly"],
    queryFn: getMoreFromOly,
  });
  