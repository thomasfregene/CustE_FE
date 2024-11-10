import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

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
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center mt-4 space-x-4">
      <button
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        className="flex items-center px-4 py-2 text-white bg-primary rounded disabled:opacity-50"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        className="flex items-center px-4 py-2 text-white bg-primary rounded disabled:opacity-50"
      >
        <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
      </button>
    </div>
  );
};

export default Pagination;
