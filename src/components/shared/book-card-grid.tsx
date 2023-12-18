import useFavorite from "@/libs/use-favorite";
import { Book } from "component-types";
import Image from "next/image";
import Link from "next/link";
import { title } from "process";
import React from "react";
import { useCookies } from "react-cookie";
import { FaBookmark, FaHeart, FaRegBookmark } from "react-icons/fa";

const BookCardGrid: React.FC<Book> = ({ id, saleInfo, volumeInfo }) => {
   const { saveToFavorite } = useFavorite({
      id,
      saleInfo,
      volumeInfo,
   });
   return (
      <div className="flex flex-col w-full bg-white rounded-md overflow-hidden shadow-md relative group">
         <Image
            className="w-auto max-h-[400px] object-fill border-b-2"
            src={
               volumeInfo.imageLinks
                  ? volumeInfo.imageLinks.thumbnail
                  : `https://placehold.co/600x400?text=${volumeInfo.title}`
            }
            alt={volumeInfo.title}
            width={50}
            height={50}
         />
         <div className="flex flex-col gap-4 p-4">
            <Link
               href={`/book/${id}`}
               className="text-3xl sm:text-2xl xl:text-xl text-gray-800"
            >
               {volumeInfo.title}
            </Link>
            {volumeInfo.authors ? (
               <p className="text-sm text-indigo-700">By: {volumeInfo.authors[0]}</p>
            ) : null}
            {volumeInfo.publishedDate ? (
               <p className="text-sm text-gray-600">
                  Publish date: {volumeInfo.publishedDate.toString()}
               </p>
            ) : null}
         </div>
         <div className="absolute -left-20 top-[50%] group-hover:left-[50%] flex flex-col gap-4 bg-black/95 p-2 rounded-full transition-all ease-in-out duration-300">
            <button
               className="text-pink-400 hover:text-pink-700"
               onClick={saveToFavorite}
            >
               <FaHeart />
            </button>
         </div>
      </div>
   );
};

export default BookCardGrid;
