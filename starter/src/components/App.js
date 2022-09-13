//react library and supporting libraries
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

//utils and css
import * as BooksAPI from "../utils/BooksAPI.js";
import "../css/App.css";

//child components
import BookList from "./BookList.js";
import Search from "./Search.js";

/**
 * @description function object for the app
 * @returns jsx to render the app
 */
function App() {

  const [showSearchPage, setShowSearchpage] = useState(false);

  let navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [screen, setScreen] = useState("list");
  let readingBooks = [];
  let wannaReadBooks = [];
  let readBooks = [];

  const filterBooks = () => {
    readingBooks = books.filter((book) => { return book.shelf === 'currentlyReading'});
    wannaReadBooks = books.filter((book) => { return book.shelf === 'wantToRead'});
    readBooks = books.filter((book) => { return book.shelf === 'read'});
  }

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      console.log(':: resp ::'+JSON.stringify(res));
      setBooks(res);
    };
    getBooks();
    //filterBooks();
  }, []);


  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <BookList books={books.filter((book) => { return book.shelf === 'currentlyReading'})} />
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <BookList books={books.filter((book) => { return book.shelf === 'wantToRead'})} />
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <BookList books={books.filter((book) => { return book.shelf === 'read'})} />
              </div>
            </div>
          </div>
          <div className="open-search">
            <a>Add a book</a>
          </div>
        </div>

      )}
    </div>
  );
}

export default App;
