declare module "component-types" {
   import { DateValueType } from "react-tailwindcss-datepicker";
   export type LayoutProps = {
      children?: React.ReactNode;
   };

   export type Book = {
      id: string;
      volumeInfo: {
         title: string;
         subtitle: string;
         authors: string[] | undefined;
         publisher: string;
         publishedDate: Date | string;
         description: string;
         categories: string[];
         averageRating: number;
         ratingsCount: number;
         imageLinks: {
            smallThumbnail: string;
            thumbnail: string;
         };
         language: string;
         previewLink: string;
         infoLink: string;
         canonicalVolumeLink: string;
      };
      saleInfo: {
         country: string;
         saleability: string;
         listPrice: {
            amount: number;
            currencyCode: string;
         };
         retailPrice: {
            amount: string;
            currencyCode: string;
         };
         buyLink: string;
      };
   };

   export type SearchFormProps = {
      value: string;
      onChange: (e: React.FormEvent<HTMLInputElement>) => void;
      isLoading: boolean;
   };

   export type PaginationProps = {
      currentPage: number;
      onPageChange: (page: any) => void;
      data: Array<any> | any;
      isFetching: boolean;
      isLoading: boolean;
      isPlaceholderData: boolean;
   };

   export type YearFilterProps = {
      data: Book[];
      value: DateValueType;
      onChange: Dispatch<SetStateAction<{ startDate: Date; endDate: number }>>;
   };

   export type SortingProps = {
      onClick: () => void;
      sortType?: "ASC" | "DESC";
   };
}
