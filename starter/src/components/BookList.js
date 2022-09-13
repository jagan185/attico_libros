import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Book from "./Book.js";

/**
 *
 * @param {*} books -- books list to be displayed by <Book> component
 * @param {*} onBookShelfUpdate -- method for inverse data-flow, passed down to <Book > from <App >
 * @returns
 */
const BookList = ({ books,onBookShelfUpdate }) => {
  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map((book) => {
          return <Book book={book} key={book?.id} onBookShelfUpdate={onBookShelfUpdate}/>;
        })}
      </ol>
    </div>
  );
};

export default BookList;
