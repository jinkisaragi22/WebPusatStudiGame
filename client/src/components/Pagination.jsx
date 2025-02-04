// src/components/Pagination.js
import React, { useState, useEffect } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export const Pagination = ({ totalPosts, postsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const getItemProps = (index) => ({
    variant: currentPage === index ? "filled" : "text",
    color: "gray",
    onClick: () => setCurrentPage(index),
  });

  const renderPageNumbers = () => {
    let pages = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage > 3) pages.push(<span key="start-ellipsis">...</span>);
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <IconButton key={i} {...getItemProps(i)}>
          {i}
        </IconButton>
      );
    }
    if (currentPage < totalPages - 2) pages.push(<span key="end-ellipsis">...</span>);
    return pages;
  };

  return (
    <div className="flex items-center gap-2">
      <Button onClick={handlePrev} disabled={currentPage === 1}>
        Previous
      </Button>
      <div className="flex items-center gap-2">{renderPageNumbers()}</div>
      <Button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </Button>
    </div>
  );
};
