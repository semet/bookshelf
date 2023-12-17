import React from "react";

const Toolbars: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   return (
      <div className="flex items-center gap-4 bg-gray-200 rounded-md p-2">
         {children}
      </div>
   );
};

export default Toolbars;
