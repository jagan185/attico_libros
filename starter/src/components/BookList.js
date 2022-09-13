import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Book from "./Book.js";

const BookList = ({ books }) => {
  const book = {};
  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map((book) => {
          return <Book book={book} key={book.id} />;
        })}
      </ol>
    </div>
  );
};

export default BookList;
