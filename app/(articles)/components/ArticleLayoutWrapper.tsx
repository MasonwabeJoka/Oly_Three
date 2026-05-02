"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ImageKitProvider } from "@imagekit/next";
import { useState } from "react";
import { AuthKitProvider } from "@workos-inc/authkit-nextjs/components";


interface ArticleLayoutWrapperProps {
  children: React.ReactNode;
  currentUser?: any;
  initialAuth?: any;
}

const ArticleLayoutWrapper = ({ children, initialAuth }: ArticleLayoutWrapperProps) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <AuthKitProvider initialAuth={initialAuth}>
      <QueryClientProvider client={queryClient}>
        <ImageKitProvider
          urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
        >
          {children}
        </ImageKitProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthKitProvider>
  );
};

export default ArticleLayoutWrapper;