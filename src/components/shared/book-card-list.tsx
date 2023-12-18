import useFavorite from "@/libs/use-favorite";
import { Book } from "component-types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaHeart } from "react-icons/fa";

const BookCardList: React.FC<Book> = ({ id, saleInfo, volumeInfo }) => {
   const { cookies, setCookie, removeCookie, saveToFavorite } = useFavorite({
      id,
      saleInfo,
      volumeInfo,
   });
   return (
      <div className="flex rounded-md overflow-hidden shadow-md">
         {/* left */}
         <div className="w-[50%] md:w-[40%] lg:w-[30%] object-cover">
            <Image
               className="w-full h-full object-cover"
               src={
                  volumeInfo.imageLinks
                     ? volumeInfo.imageLinks.thumbnail
                     : `https://placehold.co/600x400?text=${volumeInfo.title}`
               }
               alt={volumeInfo.title}
               width={100}
               height={100}
            />
         </div>
         <div className="flex flex-col gap-4 py-4 px-6 flex-1 bg-white">
            <div className="flex justify-between">
               <Link href={`/book/${id}`} className="text-md text-gray-800">
                  {volumeInfo.title}
               </Link>
               <button
                  className="text-pink-400 hover:text-pink-700"
                  onClick={saveToFavorite}
               >
                  <FaHeart />
               </button>
            </div>
            {volumeInfo.authors ? (
               <p className="text-sm text-indigo-700">By: {volumeInfo.authors[0]}</p>
            ) : null}
            {volumeInfo.publishedDate ? (
               <p className="text-sm text-gray-600">
                  Publish date: {volumeInfo.publishedDate.toString()}
               </p>
            ) : null}

            <article
               dangerouslySetInnerHTML={{ __html: volumeInfo.description }}
               className="line-clamp-3 sm:line-clamp-6 lg:line-clamp-[8] xl:line-clamp-[10] text-sm sm:text-lg md:text-md text-gray-700"
            ></article>
            <Link
               href={`/book/${id}`}
               className="text-red-500 hover:text-red-900 text-sm sm:text-lg"
            >
               read more
            </Link>
         </div>
      </div>
   );
};

export default BookCardList;
