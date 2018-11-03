import React from 'react';
import MessageComponent from "../message/MessageComponent";
import SearchBooksComponent from "./SearchBooksComponent";
import BooksComponent from "./BooksComponent";
import InputBookComponent from "./InputBookComponent";
import {
    fetchBooks,
    deleteBook,
    addBook,
    validateBook,
    sanitizeBook
} from 'api/BookApi';

class BooksManagementComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            book: {},
            operation: 'search',
            booksSearchText: '',
            books: [],
        };

        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
        this.switchToAddBook = this.switchToAddBook.bind(this);
        this.onEditBookClick = this.onEditBookClick.bind(this);
        this.onDeleteBookClick = this.onDeleteBookClick.bind(this);
        this.onBookInputChange = this.onBookInputChange.bind(this);
        this.onAddBookClick = this.onAddBookClick.bind(this);
        this.switchToSearchBooks = this.switchToSearchBooks.bind(this);
    }

    render() {
        const { message, operation, booksSearchText, books, book } = this.state;
        return (
            <div className="content">
                {'search' === operation && (
                    <SearchBooksComponent booksSearchText={booksSearchText}
                                          onInputChange={this.onSearchInputChange}
                                          onSearchClick={this.onSearchClick}
                                          onAddClick={this.switchToAddBook}/>
                )}
                {['add', 'edit'].indexOf(operation) > -1 && (
                    <InputBookComponent
                        operation={operation}
                        book={book}
                        onInputChange={this.onBookInputChange}
                        onAddButtonClick={this.onAddBookClick}
                        onUpdateButtonClick={null}
                        onCancelButtonClick={this.switchToSearchBooks}/>
                )}
                <MessageComponent message={message}/>
                <BooksComponent books={books}
                                onEditClick={this.onEditBookClick}
                                onDeleteClick={this.onDeleteBookClick}/>
            </div>
        );
    }

    onSearchInputChange(e) {
        const booksSearchText = e.target.value;
        this.setState({
            booksSearchText
        });
    }

    onSearchClick() {
        const booksSearchText = this.state.booksSearchText.trim();
        this.setState({
            booksSearchText
        });
        fetchBooks(booksSearchText)
            .then(response => this.successOnRetrieveBooks(response.data))
            .catch(error => this.errorOnApiOperation(error));
    }

    successOnRetrieveBooks(books) {
        this.setState({
            operation: 'search',
            message: '',
            book: {},
            books
        });
    }

    onBookInputChange(e) {
        const { name } = e.target;
        let value  = e.target.value;
        if('authors' === name) {
            value = value.split(',');
        }
        this.setState(state => ({
            book: {
                ...state.book,
                [name]: value
            }
        }));
    }

    onAddBookClick() {
        const book  = sanitizeBook(this.state.book);
        this.setState({
            book
        });
        validateBook(book)
            .then(() => addBook(book))
            .then(() => this.onSearchClick())
            .catch(error => {
                this.errorOnApiOperation(error);
            });
    }

    switchToAddBook() {
        this.setState({
            operation: 'add',
            book: {},
            message: ''
        });
    }

    switchToSearchBooks() {
        this.setState({
            operation: 'search',
            book: {},
            message: ''
        });
    }

    onEditBookClick(book) {

    }

    onDeleteBookClick(book) {
        deleteBook(book.uuid)
            .then(() => this.onSearchClick())
            .catch(error => this.errorOnApiOperation(error));
    }

    errorOnApiOperation(message) {
        this.setState({
            message
        });
    }
}

export default BooksManagementComponent;