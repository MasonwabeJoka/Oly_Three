"use client";

import useBreakpointStore from "@/store/useBreakpointStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ImageKitProvider } from "@imagekit/next";
import { useState } from "react";


interface ListingsLayoutWrapperProps {
  children: React.ReactNode;
  currentUser?: any;
}

const ListingsLayoutWrapper = ({ children }: ListingsLayoutWrapperProps) => {
  const [queryClient] = useState(() => new QueryClient());
  return (

    <QueryClientProvider client={queryClient}>
      <ImageKitProvider urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}>
         {children}
      </ImageKitProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ListingsLayoutWrapper;
