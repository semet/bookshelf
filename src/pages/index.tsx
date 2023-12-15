import HeroSection from "@/components/home/hero-section";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import SearchForm from "@/components/home/search-form";
import { Book } from "component-types";
import BookCard from "@/components/shared/book-card";
import BookList from "@/components/shared/book-list";
import { useDebounce } from "use-debounce";
import Pagination from "@/components/shared/pagination";
import { API_KEY, INITIAL_KEYWORD, ITEMS_PER_PAGE } from "@/libs/constant";

const Home = () => {
   const [keyword, setKeyword] = useState<string>("");
   const [debouncedKeyword] = useDebounce(keyword, 1000);
   const [page, setPage] = useState<number>(0);
   const [books, setBooks] = useState<Book[] | undefined>([]);

   const fetchBooks = async (page: number = 0) => {
      const res = await axios.get<{ items: Book[] }>(
         `https://www.googleapis.com/books/v1/volumes?q=${debouncedKeyword}&maxResults=${ITEMS_PER_PAGE}&startIndex=${page}&key=${API_KEY}`
      );
      return res.data;
   };
   const { isPending, isError, error, data, isFetching, isPlaceholderData } =
      useQuery<{ items: Book[] }>({
         queryKey: ["books", page, debouncedKeyword],
         queryFn: () => fetchBooks(page),
         placeholderData: keepPreviousData,
         enabled: !!keyword,
      });

   useEffect(() => {
      setBooks(data?.items);
   }, [data]);
   return (
      <div className="text-2xl">
         {/* Hero Section */}
         <HeroSection>
            <SearchForm
               value={keyword}
               onChange={(e) => setKeyword(e.currentTarget.value)}
               isLoading={isFetching}
            />
         </HeroSection>
         {/* Content */}
         <div className="py-6 main-padding">
            {isPending ? (
               // eslint-disable-next-line react/no-unescaped-entities
               <div>Type some book's name</div>
            ) : isError ? (
               <div>Error: {error.message}</div>
            ) : data.items.length === 0 ? (
               <p>No book</p>
            ) : (
               <>
                  <BookList books={books} />

                  <div className="my-4">
                     {/* Pagination */}
                     <Pagination
                        data={data}
                        isFetching={isFetching}
                        isLoading={isPending}
                        isPlaceholderData={isPlaceholderData}
                        currentPage={page}
                        onPageChange={setPage}
                     />
                  </div>
               </>
            )}
         </div>
      </div>
   );
};

export default Home;
