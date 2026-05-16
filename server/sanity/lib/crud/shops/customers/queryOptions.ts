import {queryOptions} from "@tanstack/react-query";
import { getCustomerByEmail, getCustomerByStripeId } from "./data";

export const getCustomerByEmailQueryOptions = (email: string) => queryOptions({
    queryKey: ["customerByEmail", email],
    queryFn: () => getCustomerByEmail(email),
});

export const getCustomerByStripeIdQueryOptions = (stripeCustomerId: string) => queryOptions({
    queryKey: ["customerByStripeId", stripeCustomerId],
    queryFn: () => getCustomerByStripeId(stripeCustomerId),
});