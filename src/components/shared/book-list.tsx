import { Book } from "component-types";
import React from "react";
import BookCardList from "./book-card-list";

const BookList: React.FC<{ books: Book[] | undefined }> = ({ books }) => {
   return (
      <div className="flex flex-col gap-4">
         {books ? (
            <>
               {books.map((book) => (
                  <BookCardList {...book} key={book.id} />
               ))}
            </>
         ) : null}
      </div>
   );
};

export default BookList;
