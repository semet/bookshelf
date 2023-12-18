import { ViewType } from "component-types";
import React from "react";
import { FaBars, FaList } from "react-icons/fa";

const ListVieButton: React.FC<{
   onClick: () => void;
   viewType: ViewType;
}> = ({ onClick, viewType }) => {
   return (
      <button
         className={`${viewType === "LIST" ? "text-gray-800" : "text-gray-500"}`}
         onClick={onClick}
      >
         <FaList />
      </button>
   );
};

export default ListVieButton;
