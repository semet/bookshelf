import { Book } from "component-types";
import React from "react";
import BookCard from "./book-card";

const BookList: React.FC<{ books: Book[] | undefined }> = ({ books }) => {
   return (
      <div className="grid grid-cols-4 gap-4">
         {books ? (
            <>
               {books.map((book) => (
                  <BookCard {...book} key={book.id} />
               ))}
            </>
         ) : null}
      </div>
   );
};

export default BookList;
