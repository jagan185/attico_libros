import PropTypes from "prop-types";
/**
 * @description function object for Book component,
 *              included as a child component in BookList
 * @param {Book} book - book to be rendered
 * @returns jsx to render the book in BookList component
 */
const Book = ({ book,onBookShelfUpdate }) => {

  /**
   * @description event handler for book shelf (status) dropdown
   *              get the updated book shelf and pass the book
   *              and the new shelf value up the component hierarchy via onBookShelfUpdate method (from props)
   * @param {*} eve - event
   */
  function handleBookShelfUpdate(eve){
    console.log('shelf update event', eve, ' : shelf value : ', eve.target.value);
    onBookShelfUpdate(book,eve?.target?.value);
  }

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book?.imageLinks?.thumbnail})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select value={book?.shelf} data-bookid={book?.id} onChange={handleBookShelfUpdate}>
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book?.title}</div>
        <div className="book-authors">
          {book.authors.map((author,index) => {
            return <p key={index}> {author} </p>;
          })}
        </div>
      </div>
    </li>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onBookShelfUpdate: PropTypes.func.isRequired
};
export default Book;
