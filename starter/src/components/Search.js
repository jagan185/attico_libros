//react and supporting libraries
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import React from "react";

import Book from "./Book.js";

//utils and css
import * as BooksAPI from "../utils/BooksAPI.js";
/**
 * @description function object for Search component
 * @returns jsx for search page
 */
const Search = ({ books, onBookShelfUpdate }) => {
  const [booksSearched, setBooksSearched] = useState([]);

  /**
   * @description effect hook, invoked when books get updated
   *              make sure the same books in searched list reflect the updated shelf
   */
  useEffect(() => {
    const newBooksLst = booksSearched.map((oldBook) => {
      let updatedBook = books.find((book) => oldBook?.id === book?.id);
      return oldBook?.id === updatedBook?.id
        ? { ...oldBook, shelf: updatedBook?.shelf }
        : oldBook;
    });
    setBooksSearched(newBooksLst);
  }, [books]);

  /**
   * @description event handler for search text box
   * @param {*} eve
   */
  function searchBook(eve) {
    console.log(eve.target.value);
    const searchTerm = eve.target.value;
    if (searchTerm.trim().length > 0) {
      BooksAPI.search(searchTerm).then((booksReturned) => {
        if (booksReturned.length > 0) {
          let booksProcessed = [];
          booksReturned.map((bookFound) => {
            //console.log('book found',bookFound);
            let bookMatch = books.find((book) => {
              return book.id === bookFound.id;
            });
            if (bookMatch) {
              console.log("found a match", bookMatch);
              bookFound.shelf = bookMatch.shelf;
            } else {
              bookFound.shelf = "none";
            }
            booksProcessed.push(bookFound);

            //return an empty object / book, since the booksReturned list is ignored
            return {};
          });
          //update the state
          setBooksSearched(booksProcessed);
        }
      });
    } else {
      //reset the list in the state
      setBooksSearched([]);
    }
  }
  return (
    <div className="app">
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              onChange={searchBook}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {booksSearched &&
              booksSearched.map((book) => {
                return (
                  <Book
                    book={book}
                    key={book?.id}
                    onBookShelfUpdate={onBookShelfUpdate}
                  />
                );
              })}
          </ol>
        </div>
      </div>
    </div>
  );
};

Search.propTypes = {
  books: PropTypes.array.isRequired,
  onBookShelfUpdate: PropTypes.func.isRequired,
};
export default Search;