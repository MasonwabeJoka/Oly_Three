import {queryOptions} from "@tanstack/react-query";
import  { getFeaturedServicesSection } from "./read";

export const featuredServicesSectionQueryOptions = queryOptions({
    queryKey: ["featuredServicesSection"],
    queryFn: getFeaturedServicesSection,
})