//react and supporting libraries
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

//utils and css
import * as BooksAPI from "../utils/BooksAPI.js";
import "../css/App.css";

//child components
import MainPage from "./MainPage.js";
import Search from "./Search.js";
import NotFound from "./NotFound.js";

/**
 * @description function object for the app
 * @returns jsx to render the app
 */
function App() {
  const [books, setBooks] = useState([]);

  /**
   * @description method to handle inverse data-flow
   *              get book and new shelf value from the drop-down in <Book >
   *              and update the shelf value in DB via API and the book shelf value in
   *              `books` list in state and update the list in state
   * @param {*} book
   * @param {*} updatedShelf
   */
  const onBookShelfUpdate = (book, updatedShelf) => {
    console.log("going to change the shelf ::", book, updatedShelf);
    const updateBookShelf = async () => {
      const resp = await BooksAPI.update(book, updatedShelf);
      console.log(resp);
      //if successfull response, find the existing book and update it's shelf,
      //then add it back to the list and update state using setBooks() to re-render UI
      const newBooksLst = books.map((oldBook) => {
        return oldBook?.id === book?.id
          ? {
              ...oldBook,
              shelf: updatedShelf,
            } /* new shelf value added to oldBook to get a new book*/
          : oldBook;
      });

      //when searching for a book and if it's not found in the current books list and it's shelf is updated, then add it to the current list
      let foundNewBookInList = books.find((oldBook) => {
        return oldBook.id === book?.id && updatedShelf !== "none";
      });
      console.log(foundNewBookInList);
      if (!foundNewBookInList) {
        book.shelf = updatedShelf;
        newBooksLst.push(book);
      }

      setBooks(newBooksLst);
    };
    updateBookShelf();
  };

  /**
   * @description effect hook, invoked on component init.
   *              get all books from BooksAPI and set the books list to be updated in state
   */
  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
    };
    getBooks();
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route
          path="/"
          exact
          element={
            <MainPage books={books} onBookShelfUpdate={onBookShelfUpdate} />
          }
        />
        <Route
          path="/search"
          element={
            <Search books={books} onBookShelfUpdate={onBookShelfUpdate} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;