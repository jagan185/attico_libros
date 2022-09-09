import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Book from "./Book.js";

const BookList = ({books}) => {
    const book = {};
    return (
        <div>
            <Book book={book}/>
        </div>
    );
};

export default BookList;