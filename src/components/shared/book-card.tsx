import { Book } from "component-types";
import Image from "next/image";
import { title } from "process";
import React from "react";
import { FaBookmark, FaHeart, FaRegBookmark } from "react-icons/fa";

const BookCard: React.FC<Book> = ({ id, saleInfo, volumeInfo }) => {
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
            <p className="text-md text-gray-800">{volumeInfo.title}</p>
            {volumeInfo.authors ? (
               <p className="text-sm text-indigo-700">By: {volumeInfo.authors[0]}</p>
            ) : null}
            {volumeInfo.publishedDate ? (
               <p className="text-sm text-gray-600">
                  Publish date: {volumeInfo.publishedDate.toString()}
               </p>
            ) : null}
         </div>
         <div className="absolute -top-20 group-hover:top-2 right-2 flex flex-col gap-4 bg-black/70 p-2 rounded-sm transition-all ease-in-out duration-300">
            <button className="text-pink-400 hover:text-pink-700">
               <FaHeart />
            </button>
            <button className="text-indigo-400 hover:text-indigo-800">
               <FaBookmark />
            </button>
         </div>
      </div>
   );
};

export default BookCard;
