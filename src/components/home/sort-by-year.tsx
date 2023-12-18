import { SortingProps } from "component-types";
import React from "react";
import { FaSortNumericDown, FaSortNumericUp } from "react-icons/fa";

const SortByYear: React.FC<SortingProps> = ({ onClick, sortType }) => {
   return (
      <div className="w-full sm:w-auto">
         <button
            onClick={onClick}
            className="flex gap-2 items-center text-gray-800 bg-white py-2 px-3 rounded-md"
         >
            {sortType === "ASC" ? (
               <FaSortNumericDown className="" />
            ) : (
               <FaSortNumericUp className="" />
            )}
            <span className="text-sm whitespace-nowrap">by year</span>
         </button>
      </div>
   );
};

export default SortByYear;
