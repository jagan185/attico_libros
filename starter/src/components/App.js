//react and supporting libraries
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

  /**
   * @description method to handle inverse data-flow
   *              get book and new shelf value from the drop-down in <Book >
   *              and update the shelf value in DB via API and the book shelf value in
   *              books list in state and update the list in state
   * @param {*} book
   * @param {*} updatedShelf
   */
  const onBookShelfUpdate = (book, updatedShelf) => {
    console.log('going to change the shelf ::',book, updatedShelf);
    const updateBookShelf = async () => {
      const resp = await BooksAPI.update(book, updatedShelf);
      console.log(resp);
      //if successfull response, find the existing book and update it's shelf,
      //then add it back to the list and update state using setBooks() to re-render UI
      const newBooksLst = books.map( (oldBook) => { return (oldBook.id === book.id ? {...oldBook, shelf:updatedShelf } : oldBook ); });
      setBooks(newBooksLst);

    }
    updateBookShelf();
  };

  /**
   * @description effect hook, invoked on component init.
   *              get all books from BooksAPI and set the books list to be updated in state
   */
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
                <BookList books={books.filter((book) => { return book.shelf === 'currentlyReading'})} onBookShelfUpdate={onBookShelfUpdate}/>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <BookList books={books.filter((book) => { return book.shelf === 'wantToRead'})} onBookShelfUpdate={onBookShelfUpdate}/>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <BookList books={books.filter((book) => { return book.shelf === 'read'})} onBookShelfUpdate={onBookShelfUpdate}/>
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
