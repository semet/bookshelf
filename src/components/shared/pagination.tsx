import { ITEMS_PER_PAGE } from "@/libs/constant";
import { PaginationProps } from "component-types";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Spinner } from "@material-tailwind/react";

const Pagination: React.FC<PaginationProps> = ({
   data,
   isFetching,
   isLoading,
   isPlaceholderData,
   currentPage,
   onPageChange,
}) => {
   const pageCount = Math.ceil(data.totalItems / ITEMS_PER_PAGE);

   const handlePrevClick = () => onPageChange(currentPage - 1);
   const handleNextClick = () => onPageChange(currentPage + 1);

   return (
      <div className="flex justify-between">
         <p className="text-base text-gray-600">Current page: {currentPage + 1}</p>
         {isFetching ? <Spinner /> : null}
         <div className="flex gap-2">
            <button
               onClick={handlePrevClick}
               disabled={currentPage === 0}
               className="bg-indigo-600 text-white p-2 text-sm rounded-full disabled:bg-indigo-200"
            >
               <FaArrowLeft />
            </button>
            <button
               onClick={handleNextClick}
               disabled={isPlaceholderData}
               className="bg-indigo-600 text-white p-2 text-sm rounded-full disabled:bg-indigo-200"
            >
               <FaArrowRight />
            </button>
         </div>
      </div>
   );
};

export default Pagination;
