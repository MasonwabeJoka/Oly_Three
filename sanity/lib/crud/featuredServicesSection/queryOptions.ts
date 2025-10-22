import {queryOptions} from "@tanstack/react-query";
import  { getFeaturedServicesSection } from "./data";

export const featuredServicesSectionQueryOptions = queryOptions({
    queryKey: ["featuredServicesSection"],
    queryFn: getFeaturedServicesSection,
})