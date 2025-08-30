"use client";

import React, { useCallback } from "react";
import styles from "./Pagination.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import NavButtonLeft from "./navButtonLeft";
import NavButtonRight from "./navButtonRight";
import Button from "./Buttons";

interface PaginationProps {
  totalPages: number;
  currentPage: number; // ✅ get from server
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        const params = new URLSearchParams(searchParams?.toString() || "");
        params.set("page", page.toString());

        // ✅ preserves searchTerm & locationSearch
        router.push(`${pathname}?${params.toString()}`, { scroll: false });

        if (onPageChange) {
          onPageChange(page);
        }
      }
    },
    [currentPage, totalPages, router, pathname, searchParams, onPageChange]
  );

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPageButtons = 5;
    const ellipsis = "•••";

    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage <= 2) {
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push(ellipsis, totalPages);
      } else if (currentPage >= totalPages - 1) {
        pages.push(ellipsis);
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(
          ellipsis,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          ellipsis,
          totalPages
        );
      }
    }

    return pages.map((page, index) => (
      <div key={`${page}-${index}`}>
        <Button
          className={`${styles.pageButton} ${
            page === currentPage ? styles.active : ""
          } ${page === ellipsis ? styles.ellipsis : ""}`}
          buttonChildren={page}
          buttonType="round"
          buttonSize="medium"
          name="pageButton"
          type="button"
          ariaLabel={`Page ${page}`}
          disabled={page === ellipsis}
          onClick={() => typeof page === "number" && handlePageChange(page)}
          autoFocus={false}
        />
      </div>
    ));
  };

  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <div
        className={`${styles.arrowContainer} ${
          currentPage === 1 ? styles.hidden : styles.visible
        }`}
      >
        <NavButtonLeft
          className={`${styles.arrowButton} ${styles.leftArrow}`}
          size="medium"
          onClick={() => handlePageChange(currentPage - 1)}
        />
      </div>

      {renderPageNumbers()}

      <div
        className={`${styles.arrowContainer} ${
          currentPage === totalPages ? styles.hidden : styles.visible
        }`}
      >
        <NavButtonRight
          className={`${styles.arrowButton} ${styles.rightArrow}`}
          size="medium"
          onClick={() => handlePageChange(currentPage + 1)}
        />
      </div>
    </div>
  );
};

export default Pagination;
