import HeroSection from "@/components/home/hero-section";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import SearchForm from "@/components/home/search-form";
import { Book, SortingProps, ViewType } from "component-types";
import BookCard from "@/components/shared/book-card-grid";
import BookList from "@/components/shared/book-list";
import { useDebounce } from "use-debounce";
import Pagination from "@/components/shared/pagination";
import { API_KEY, INITIAL_KEYWORD, ITEMS_PER_PAGE } from "@/libs/constant";
import Toolbars from "@/components/home/toolbars";
import YearFilter from "@/components/home/year-filter";
import { DateValueType } from "react-tailwindcss-datepicker";
import SortByYear from "@/components/home/sort-by-year";
import SortByTitle from "@/components/home/sort-by-title";
import Head from "next/head";
import ListVieButton from "@/components/home/list-view-button";
import GridViewButton from "@/components/home/grid-view-button";
import BookGrid from "@/components/shared/book-grid";

const Home = () => {
   const [keyword, setKeyword] = useState<string>("Typescript");
   const [debouncedKeyword] = useDebounce(keyword, 1000);
   const [page, setPage] = useState<number>(0);
   const [books, setBooks] = useState<Book[] | undefined>([]);
   const [filterDate, setFilterDate] = useState<DateValueType>({
      startDate: null,
      endDate: null,
   });
   const [titleSortingType, setTitleSortingType] =
      useState<SortingProps["sortType"]>("ASC");
   const [yearSortingType, setYearSortingType] =
      useState<SortingProps["sortType"]>("ASC");

   const [viewType, setViewType] = useState<ViewType>("GRID");

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

   const filterByYear = () => {
      if (data && filterDate?.startDate !== null) {
         const filteredData = data?.items.filter((book) => {
            const bookPublishedDate = new Date(
               book.volumeInfo.publishedDate
            ).getFullYear();
            return (
               bookPublishedDate == new Date(filterDate!.startDate!).getFullYear()
            );
         });

         setBooks(filteredData);
      }
   };

   const handleTitleSort = () => {
      setTitleSortingType((prevOrder) => (prevOrder === "ASC" ? "DESC" : "ASC"));

      books?.sort((a, b) => {
         const titleA = a.volumeInfo.title.toLowerCase();
         const titleB = b.volumeInfo.title.toLowerCase();

         const comparison = titleA.localeCompare(titleB);

         return titleSortingType === "ASC" ? comparison : -comparison;
      });
   };

   const handleYearSort = () => {
      setYearSortingType((prevOrder) => (prevOrder === "ASC" ? "DESC" : "ASC"));

      books?.sort((a, b) => {
         const dateA: Date = new Date(a.volumeInfo.publishedDate);
         const dateB: Date = new Date(b.volumeInfo.publishedDate);

         return yearSortingType === "ASC"
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime();
      });
   };

   useEffect(() => {
      setBooks(data?.items);
      if (filterDate?.startDate !== null) {
         filterByYear();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [data, filterDate, titleSortingType, yearSortingType]);
   return (
      <div className="text-2xl">
         <Head>
            <title>Bookshelf</title>
         </Head>
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
               <div className="flex flex-col gap-4">
                  {/* Toolbars */}
                  {data.items ? (
                     <Toolbars>
                        {/* Date filter */}
                        <YearFilter
                           data={data.items}
                           onChange={setFilterDate}
                           value={filterDate}
                        />
                        {/* Sort By Title */}
                        <SortByTitle
                           onClick={handleTitleSort}
                           sortType={titleSortingType}
                        />
                        {/* Srt By year */}
                        <SortByYear
                           onClick={handleYearSort}
                           sortType={yearSortingType}
                        />
                        <div className="flex gap-4">
                           {/* Grid View */}
                           <GridViewButton
                              viewType={viewType}
                              onClick={() => setViewType("GRID")}
                           />
                           {/* List view */}
                           <ListVieButton
                              viewType={viewType}
                              onClick={() => setViewType("LIST")}
                           />
                        </div>
                     </Toolbars>
                  ) : null}
                  {viewType === "GRID" ? (
                     <BookGrid books={books} />
                  ) : (
                     <BookList books={books} />
                  )}

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
               </div>
            )}
         </div>
      </div>
   );
};

export default Home;
