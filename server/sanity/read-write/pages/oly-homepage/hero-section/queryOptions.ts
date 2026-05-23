import { queryOptions } from "@tanstack/react-query";
import { getHeroSectionData } from "./read";


export const heroSectionQueryOptions = queryOptions({
    queryKey: ["heroSectionData"],
    queryFn: getHeroSectionData,
})