# MyReads Project - Atticos Libros

## App installation
- Install app using `npm install`
- Run the app. server using `npm start`


## Atticos Libros - app. functionality
### Main page (/)
The main page displays a list of "shelves/attics" (i.e. categories), each of which contains a number of books. The three categories are:

1. Currently Reading
2. Want to Read
3. Read

Each book has a control that lets you select the shelf for that book. When you select a different shelf, the book moves there. Note that the default value for the control should always be the current shelf the book is in.

### Search Page (/search) 
As the value of the search text input changes, the books that match that query are displayed on the page, along with a control that lets you add the book to your library. To keep the interface consistent, you may consider re-using some of the code you used to display the books on the main page.

