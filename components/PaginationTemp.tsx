// components/Pagination.tsx
import React from "react";
import styles from "./Pagination.module.scss";
import NavButtonLeft from "./navButtonLeft";
import NavButtonRight from "./navButtonRight";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const maxPagesToShow = 5; // Maximum number of page buttons to show at once
  const pages: (number | string)[] = [];

  // Logic to determine which pages to show
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  // Adjust startPage if we're near the end
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  // Add page numbers and ellipsis
  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) pages.push("...");
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div className={styles.pagination}>
      <NavButtonLeft
        className={`${styles.arrows} ${styles.leftArrow}`}
        size={"standard" as any}
        onClick={() => onPageChange(currentPage - 1)}
      />

      {pages.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            className={`${styles.pageButton} ${
              page === currentPage ? styles.active : ""
            }`}
            onClick={() => onPageChange(page)}
          >
            {page === currentPage ? `Page ${page}` : page}
          </button>
        ) : (
          <span key={index} className={styles.ellipsis}>
            {page}
          </span>
        )
      )}

      <NavButtonRight
        className={`${styles.arrows} ${styles.rightArrow}`}
        size={"standard" as any}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </div>
  );
};

export default Pagination;
