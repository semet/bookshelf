import { YearFilterProps } from "component-types";
import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const YearFilter: React.FC<YearFilterProps> = ({ data, onChange, value }) => {
   const publishedDates = data
      .map((book) => new Date(book.volumeInfo.publishedDate))
      .filter((date) => !isNaN(date.getTime()))
      .sort((a, b) => a.getTime() - b.getTime());
   return (
      <div>
         <Datepicker
            startFrom={publishedDates[0]}
            useRange={false}
            asSingle={true}
            value={value}
            placeholder="filter by published year"
            onChange={onChange}
         />
      </div>
   );
};

export default YearFilter;
