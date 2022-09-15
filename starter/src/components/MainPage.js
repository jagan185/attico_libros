import BookList from "./BookList.js";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * @description MainPage to display list of books, this is displayed on the root path `/` of app
 * @param {*} props object with books and onBookShelfUpdate from App.js
 * @returns
 */
const MainPage = ({ books, onBookShelfUpdate }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <BookList
              books={books.filter((book) => {
                return book.shelf === "currentlyReading";
              })}
              onBookShelfUpdate={onBookShelfUpdate}
            />
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <BookList
              books={books.filter((book) => {
                return book.shelf === "wantToRead";
              })}
              onBookShelfUpdate={onBookShelfUpdate}
            />
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <BookList
              books={books.filter((book) => {
                return book.shelf === "read";
              })}
              onBookShelfUpdate={onBookShelfUpdate}
            />
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

MainPage.propTypes = {
  books: PropTypes.array.isRequired,
  onBookShelfUpdate: PropTypes.func.isRequired,
};
export default MainPage;