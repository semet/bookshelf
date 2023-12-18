import { Book } from "component-types";
import React from "react";
import BookCardGrid from "./book-card-grid";

const BookGrid: React.FC<{ books: Book[] | undefined }> = ({ books }) => {
   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
         {books ? (
            <>
               {books.map((book) => (
                  <BookCardGrid {...book} key={book.id} />
               ))}
            </>
         ) : null}
      </div>
   );
};

export default BookGrid;
