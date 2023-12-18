import React from "react";
import SearchForm from "./search-form";
import Image from "next/image";

const HeroSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   return (
      <div className="flex items-center gap-2 w-full bg-indigo-200 main-padding py-6">
         {/* Search Form */}
         {children}
         {/* Image */}
         <div className="w-[30%] hidden md:flex">
            <Image
               src={"/images/hero.png"}
               alt="Bookshelf"
               className="object-cover w-[500px]"
               width={300}
               height={300}
            />
         </div>
      </div>
   );
};

export default HeroSection;
