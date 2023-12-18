import { API_KEY } from "@/libs/constant";
import { Chip } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Book } from "component-types";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Book = () => {
   const { query } = useRouter();

   const fetchBook = async () => {
      const res = await axios.get(
         `https://www.googleapis.com/books/v1/volumes/${query.id}?key=${API_KEY}`
      );
      return res.data;
   };
   const { isPending, isError, error, data, isFetching } = useQuery<Book>({
      queryKey: [query.id],
      queryFn: () => fetchBook(),
   });
   return (
      <div className="py-6 main-padding">
         {/* Image */}
         {data ? (
            <>
               <div className="flex gap-2">
                  <div className="rounded-md overflow-hidden shadow-md">
                     <Image
                        src={data.volumeInfo.imageLinks.thumbnail}
                        width={400}
                        height={400}
                        alt={data?.volumeInfo.title}
                     />{" "}
                  </div>
                  <div className="flex flex-col gap-4 px-4 bg-gradient-to-r from-white to-gray-100 w-full rounded-md shadow-md p-6">
                     <h3 className="text-3xl font-semibold text-gray-700">
                        {data.volumeInfo.title}
                     </h3>
                     <div className="flex gap-4 items-center">
                        {data.volumeInfo.authors ? (
                           <p className="text-sm text-indigo-700">
                              By: {data.volumeInfo.authors[0]}
                           </p>
                        ) : null}
                        <span className="text-sm text-gray-700">
                           Published on:{" "}
                           {data.volumeInfo.publishedDate.toLocaleString()}
                        </span>
                     </div>

                     <ul className="flex flex-col gap-4">
                        <li className="flex gap-2 text-gray-700">
                           <span>Publisher: </span>
                           <span>{data.volumeInfo.publisher}</span>
                        </li>
                        <li className="flex gap-2 text-gray-700">
                           <span> Categories: </span>
                           <div className="flex gap-2">
                              {data.volumeInfo.categories[0]
                                 .split("/")
                                 .map((cat, i) => (
                                    <Chip
                                       size="sm"
                                       variant="outlined"
                                       value={cat}
                                       key={i}
                                    />
                                 ))}
                           </div>
                        </li>
                     </ul>
                  </div>
               </div>
               <article
                  className="bg-white shadow-md mt-4 px-4 py-6 text-gray-600 rounded-md"
                  dangerouslySetInnerHTML={{ __html: data.volumeInfo.description }}
               />
            </>
         ) : (
            <div>Loading</div>
         )}
      </div>
   );
};

export default Book;
