"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import styles from "./ShopsLayoutWrapper.module.scss";
import { Toaster } from "sonner";
import useBreakpointStore from "@/store/useBreakpointStore";
import { ImageKitProvider } from "@imagekit/next";
import BackButton from "@/components/BackButton";

interface ShopsLayoutWrapperProps {
  children: React.ReactNode;
  currentUser?: any;
  sidebarItems?: any;
}

export default function ShopsLayoutWrapper({
  currentUser,
  children,
  sidebarItems,
}: ShopsLayoutWrapperProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ImageKitProvider
        urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
      >
        {children}
      </ImageKitProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
