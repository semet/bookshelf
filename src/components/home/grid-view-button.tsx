import { ViewType } from "component-types";
import React from "react";
import { FaBorderAll, FaGripHorizontal } from "react-icons/fa";

const GridViewButton: React.FC<{
   onClick: () => void;
   viewType: ViewType;
}> = ({ onClick, viewType }) => {
   return (
      <button
         className={`${viewType === "GRID" ? "text-gray-800" : "text-gray-500"}`}
         onClick={onClick}
         data-testid="grid-view-button"
      >
         <FaBorderAll />
      </button>
   );
};

export default GridViewButton;
