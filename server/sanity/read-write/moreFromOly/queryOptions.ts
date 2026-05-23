import {queryOptions} from "@tanstack/react-query";
import { getMoreFromOly } from "./read";

export const moreFromOlyQueryOptions = queryOptions({
    queryKey: ["moreFromOly"],
    queryFn: getMoreFromOly,
  });
  