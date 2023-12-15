import React from "react";
import FavoriteSection from "./favorite-section";
import FutureReading from "./future-reading";
import useScroll from "@/libs/use-scroll";

const Header = () => {
   const { isScrolled } = useScroll();
   return (
      <header
         className={`flex justify-between py-5 main-padding sticky top-0 z-50 transition-all ease-in-out duration-500 ${
            isScrolled ? "bg-white shadow-md h-[90px]" : "bg-indigo-200 h-[120px]"
         }`}
      >
         {/* Left */}
         <h1
            className={`font-semibold tracking-wide transition-all ease-in-out duration-500 ${
               isScrolled ? "text-gray-700 text-4xl " : "text-gray-50 text-5xl "
            }`}
         >
            Bookshelf
         </h1>
         {/* Right */}
         <div className="flex gap-4 items-center">
            {/* Favorite */}
            <FavoriteSection />
            <FutureReading />
         </div>
      </header>
   );
};

export default Header;
