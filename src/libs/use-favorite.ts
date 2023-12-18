import { Book } from "component-types";
import { useCookies } from "react-cookie";

const useFavorite = ({ id, saleInfo, volumeInfo }: Book) => {
   const [cookies, setCookie, removeCookie] = useCookies(["favorite"]);
   const saveToFavorite = () => {
      const existingFavorites: Book[] = cookies.favorite || [];

      const isItemInFavorites = existingFavorites.find((item) => item.id === id);
      if (isItemInFavorites) {
         return;
      } else {
         const updatedFavorites = [
            ...existingFavorites,
            {
               id,
               volumeInfo: {
                  title: volumeInfo.title,
                  imageLinks: {
                     thumbnail: volumeInfo.imageLinks.thumbnail,
                  },
               },
            },
         ];

         setCookie("favorite", updatedFavorites, { sameSite: true });
      }
   };

   return {
      cookies,
      setCookie,
      removeCookie,
      saveToFavorite,
   };
};

export default useFavorite;
