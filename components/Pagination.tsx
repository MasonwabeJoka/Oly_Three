// components/Pagination.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styles from './Pagination.module.scss';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
  onPageChange?: (page: number) => void; // Callback to notify parent of page changes
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, onPageChange }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);

    const pageFromParams = searchParams ? Number(searchParams.get('page')) || 1 : 1;
    const validPage = Math.max(1, Math.min(pageFromParams, totalPages));
    setCurrentPage(validPage);

    if (pageFromParams !== validPage) {
      const params = new URLSearchParams(searchParams?.toString() || '');
      params.set('page', validPage.toString());
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
        const params = new URLSearchParams(searchParams?.toString() || '');
        params.set('page', page.toString());
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
    const maxVisiblePages = 5;
    const ellipsis = '...';

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        start = 2;
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
        end = totalPages - 1;
      }

      if (start > 2) {
        pages.push(ellipsis);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push(ellipsis);
      }

      pages.push(totalPages);
    }

    return pages.map((page, index) => (
      <button
        key={`${page}-${index}`}
        className={`${styles.pageButton} ${
          page === currentPage ? styles.active : ''
        } ${page === ellipsis ? styles.ellipsis : ''}`}
        onClick={() => typeof page === 'number' && handlePageChange(page)}
        disabled={page === ellipsis}
      >
        {page}
      </button>
    ));
  };

  if (!isMounted) {
    return <div>Loading pagination...</div>;
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrowButton}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {'<'}
      </button>
      {renderPageNumbers()}
      <button
        className={styles.arrowButton}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;