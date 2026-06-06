import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface HeroesPaginationProps {
  currentPage: number;
  totalPages: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
}

export function HeroesPagination({
  currentPage,
  totalPages,
  isLoading = false,
  onPageChange,
}: HeroesPaginationProps) {
  const getPageNumbers = () => {
    const pageNumbers: number[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let page = 1; page <= totalPages; page++) {
        pageNumbers.push(page);
      }

      return pageNumbers;
    }

    pageNumbers.push(1);

    let start = Math.max(currentPage - 1, 2);
    const end = Math.min(start + 2, totalPages - 1);

    if (end === totalPages - 1) {
      start = end - 2;
    }

    if (start > 2) {
      pageNumbers.push(-1);
    }

    for (let page = start; page <= end; page++) {
      pageNumbers.push(page);
    }

    if (end < totalPages - 1) {
      pageNumbers.push(-1);
    }

    pageNumbers.push(totalPages);

    return pageNumbers;
  };

  return (
    <nav className="mt-auto flex items-center justify-end gap-1.5 pt-12">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={isLoading || currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="size-8 cursor-pointer rounded-md text-[#d5d8df] hover:bg-white hover:text-[#123bcc] disabled:cursor-not-allowed"
      >
        <ChevronLeft className="size-[18px]" />
      </Button>

      {getPageNumbers().map((pageNumber, index) =>
        pageNumber === -1 ? (
          <span
            key={`ellipsis-${index}`}
            className="flex size-8 items-center justify-center text-sm text-[#a8afbd]"
          >
            ...
          </span>
        ) : (
          <Button
            type="button"
            key={pageNumber}
            variant="ghost"
            size="icon"
            disabled={isLoading}
            aria-current={currentPage === pageNumber ? "page" : undefined}
            onClick={() => onPageChange(pageNumber)}
            className={`size-8 cursor-pointer rounded-md text-sm font-medium shadow-none disabled:cursor-not-allowed ${
              currentPage === pageNumber
                ? "bg-[#dce7ff] text-[#123bcc] hover:bg-[#dce7ff]"
                : "text-[#b7bdca] hover:bg-white hover:text-[#123bcc]"
            }`}
          >
            {pageNumber}
          </Button>
        ),
      )}

      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={isLoading || currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="size-8 cursor-pointer rounded-md text-[#d5d8df] hover:bg-white hover:text-[#123bcc] disabled:cursor-not-allowed"
      >
        <ChevronRight className="size-[18px]" />
      </Button>
    </nav>
  );
}
