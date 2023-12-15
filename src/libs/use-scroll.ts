import { useState, useEffect } from "react";
const useScroll = (position = 150) => {
   const [isScrolled, setIsScrolled] = useState(false);

   useEffect(() => {
      setIsScrolled(window.scrollY >= position ? true : false);

      const handleScroll = () => {
         if (window.scrollY >= position) {
            setIsScrolled(true);
         } else {
            setIsScrolled(false);
         }
      };
      window.addEventListener("scroll", handleScroll);

      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, [isScrolled, position]);

   return {
      isScrolled,
   };
};

export default useScroll;
