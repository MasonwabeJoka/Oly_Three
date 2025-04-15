"use client";

import React, { useState, useEffect, useCallback } from "react";
import styles from "./Pagination.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import NavButtonLeft from "./navButtonLeft";
import NavButtonRight from "./navButtonRight";
import Button from "./Buttons";

interface PaginationProps {
  totalPages: number;
  onPageChange?: (page: number) => void; // Callback to notify parent of page changes
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  onPageChange,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);

    const pageFromParams = searchParams
      ? Number(searchParams.get("page")) || 1
      : 1;
    const validPage = Math.max(1, Math.min(pageFromParams, totalPages));
    setCurrentPage(validPage);

    if (pageFromParams !== validPage) {
      const params = new URLSearchParams(searchParams?.toString() || "");
      params.set("page", validPage.toString());
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    // Notify parent of the initial page
    if (onPageChange) {
      onPageChange(validPage);
    }
  }, [searchParams, totalPages, router, pathname, onPageChange]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        const params = new URLSearchParams(searchParams?.toString() || "");
        params.set("page", page.toString());
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
        setCurrentPage(page);

        // Notify parent of the page change
        if (onPageChange) {
          onPageChange(page);
        }
      }
    },
    [currentPage, totalPages, router, pathname, searchParams, onPageChange]
  );

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPageButtons = 5; // Exactly 5 numeric page buttons
    const ellipsis = "•••";

    if (totalPages <= maxPageButtons) {
      // Show all pages if totalPages <= 5
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include the first page
      pages.push(1);

      if (currentPage <= 2) {
        // Show 1, 2, 3, 4, ..., totalPages
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push(ellipsis);
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 1) {
        // Show 1, ..., totalPages-3, totalPages-2, totalPages-1, totalPages
        pages.push(ellipsis);
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Middle case: Adjust range to ensure exactly 5 numeric buttons
        if (currentPage <= 4) {
          // Closer to start: show 1, 2, 3, 4, ..., totalPages
          for (let i = 2; i <= 4; i++) {
            pages.push(i);
          }
          pages.push(ellipsis);
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 3) {
          // Closer to end: show 1, 2, ..., totalPages-2, totalPages-1, totalPages
          pages.push(2);
          pages.push(ellipsis);
          for (let i = totalPages - 2; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          // Middle: show 1, 2, ..., currentPage, currentPage+1
          pages.push(2);
          pages.push(ellipsis);
          for (let i = currentPage; i <= currentPage + 1; i++) {
            pages.push(i);
          }
          pages.push(totalPages);
        }
      }
    }

    return pages.map((page, index) => (
      <div key={`${page}-${index}`}>
        <Button
          className={`${styles.pageButton} ${
            page === currentPage ? styles.active : ""
          } ${page === ellipsis ? styles.ellipsis : ""}`}
          fontSize={typeof page === "number" && page >= 1000 ? "12px" : "unset"}
          buttonChildren={page}
          buttonType="round"
          buttonSize="medium"
          name="pageButton"
          type="button"
          ariaLabel="Page Button"
          autoFocus={false}
          // disabled={page === ellipsis}
          onClick={() => typeof page === "number" && handlePageChange(page)}
        />
      </div>
    ));
  };

  if (!isMounted) {
    return <div>Loading pagination...</div>;
  }

  return (
    <div className={styles.pagination}>
      <div style={{ opacity: currentPage === 1 ? 0 : 1 }}>
        <NavButtonLeft
          className={`${styles.arrowButton} ${styles.leftArrow}`}
          size="standard"
          onClick={() => handlePageChange(currentPage - 1)}
          // disabled={currentPage === 1}
        />
      </div>

      {renderPageNumbers()}
      <div style={{ opacity: currentPage === totalPages ? 0 : 1 }}>
        <NavButtonRight
          className={`${styles.arrowButton} ${styles.rightArrow}`}
          size="standard"
          onClick={() => handlePageChange(currentPage + 1)}
          // disabled={currentPage === totalPages}
        />
      </div>
    </div>
  );
};

export default Pagination;
