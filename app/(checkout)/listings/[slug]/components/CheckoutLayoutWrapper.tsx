"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ImageKitProvider } from "@imagekit/next";
import { useState } from "react";
import SellerDetails from "@/components/SellerDetails";
import styles from "./CheckoutLayoutWrapper.module.scss";
import Navbar from "@/components/layouts/Navbar";
import ExitButton from "@/components/ExitButton";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AuthKitProvider } from "@workos-inc/authkit-nextjs/components";
interface CheckoutLayoutWrapperProps {
  children: React.ReactNode;
  className?: string;
  currentUser?: any;
  initialAuth?: any;
}

const CheckoutLayoutWrapper = ({
  children,
  className,
  initialAuth,
}: CheckoutLayoutWrapperProps) => {
  const [queryClient] = useState(() => new QueryClient());
    const params = useParams<{slug: string}>();

  return (
    <AuthKitProvider initialAuth={initialAuth}>
      <QueryClientProvider client={queryClient}>
        <ImageKitProvider
          urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
        >
          <Link href={`/listings/${params.slug}`} className={styles.nav}>
            <Navbar rightButton={<ExitButton />} homeButton={false} />
          </Link>
          <div className={`${styles.container} ${className}`}>
            <div className={styles.form}>
              <div className={styles.sellerDetails}>
                <SellerDetails />
              </div>
              <div className={styles.content}>{children}</div>
            </div>
          </div>
        </ImageKitProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthKitProvider>
  );
};

export default CheckoutLayoutWrapper;
