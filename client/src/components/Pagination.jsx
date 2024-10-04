import React, { useState, useEffect } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export const Pagination = ({ totalPosts, postsPerPage, setCurrentPage }) => {
  const [active, setActive] = useState(1);
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => {
      setActive(index);
      setCurrentPage(index);
    },
  });

  const next = () => {
    if (active < totalPages) {
      setActive(active + 1);
      setCurrentPage(active + 1);
    }
  };

  const prev = () => {
    if (active > 1) {
      setActive(active - 1);
      setCurrentPage(active - 1);
    }
  };

  useEffect(() => {
    setCurrentPage(active);
  }, [active, setCurrentPage]);

  const renderPageNumbers = () => {
    if (totalPages <= 10) {
      return Array.from({ length: totalPages }, (_, index) => (
        <IconButton key={index} {...getItemProps(index + 1)}>
          {index + 1}
        </IconButton>
      ));
    } else {
      const pages = [];
      pages.push(
        <IconButton key={1} {...getItemProps(1)}>
          1
        </IconButton>
      );

      if (active > 4) {
        pages.push(<span key="start-ellipsis" className="px-3 py-1 mx-1">...</span>);
      }

      const startPage = Math.max(2, active - 2);
      const endPage = Math.min(totalPages - 1, active + 2);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <IconButton key={i} {...getItemProps(i)}>
            {i}
          </IconButton>
        );
      }

      if (active < totalPages - 3) {
        pages.push(<span key="end-ellipsis" className="px-3 py-1 mx-1">...</span>);
      }

      pages.push(
        <IconButton key={totalPages} {...getItemProps(totalPages)}>
          {totalPages}
        </IconButton>
      );

      return pages;
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4">
      {/* For small screens, show arrows and page numbers */}
      <Button
        variant="text"
        className="flex items-center gap-2 md:hidden"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-2 md:hidden">
        {renderPageNumbers()}
      </div>

      <Button
        variant="text"
        className="flex items-center gap-2 md:hidden"
        onClick={next}
        disabled={active === totalPages}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>

      {/* For medium and larger screens, show full pagination controls */}
      <div className="hidden md:flex items-center gap-2">
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={prev}
          disabled={active === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
          Previous
        </Button>
        {renderPageNumbers()}
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={next}
          disabled={active === totalPages}
        >
          Next
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
