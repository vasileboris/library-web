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
    sanitizeBook,
    updateBook
} from 'api/BookApi';
import { run } from 'middleware/PromiseGeneratorRunner';

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
        this.onUpdateBookClick = this.onUpdateBookClick.bind(this);
    }

    render() {
        const { message, operation, booksSearchText, books, book } = this.state;
        return (
            <div className="content">
                {'search' === operation && (
                    <SearchBooksComponent booksSearchText={booksSearchText}
                                          onInputChange={this.onSearchInputChange}
                                          onSearchClick={() => run(this.onSearchClick)}
                                          onAddClick={this.switchToAddBook}/>
                )}
                {['add', 'edit'].indexOf(operation) > -1 && (
                    <InputBookComponent
                        operation={operation}
                        book={book}
                        onInputChange={this.onBookInputChange}
                        onAddButtonClick={() => run(this.onAddBookClick)}
                        onUpdateButtonClick={() => run(this.onUpdateBookClick)}
                        onCancelButtonClick={this.switchToSearchBooks}/>
                )}
                <MessageComponent message={message}/>
                <BooksComponent books={books}
                                onEditClick={this.onEditBookClick}
                                onDeleteClick={(book) => run(this.onDeleteBookClick, book)}/>
            </div>
        );
    }

    componentDidMount() {
        const booksSearchText = this.state.booksSearchText;
        fetchBooks(booksSearchText)
            .then(response => this.successOnRetrieveBooks(response.data))
            .catch(error => this.errorOnApiOperation(error));
    }

    onSearchInputChange(e) {
        const booksSearchText = e.target.value;
        this.setState({
            booksSearchText
        });
    }

    *onSearchClick() {
        const booksSearchText = this.state.booksSearchText.trim();
        this.setState({
            booksSearchText
        });
        try {
            const books = yield fetchBooks(booksSearchText);
            this.successOnRetrieveBooks(books);
        } catch(error) {
            this.errorOnApiOperation(error)
        }
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

    *onAddBookClick() {
        const book  = sanitizeBook(this.state.book);
        this.setState({
            book
        });
        try {
            yield validateBook(book);
            yield addBook(book);
            yield* this.onSearchClick();
        } catch(error) {
            this.errorOnApiOperation(error);
        }
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
        this.setState({
            operation: 'edit',
            book,
            message: ''
        });
    }

    *onUpdateBookClick() {
        const book  = sanitizeBook(this.state.book);
        this.setState({
            book
        });
        try {
            yield validateBook(book);
            yield updateBook(book);
            yield* this.onSearchClick();
        } catch(error) {
            this.errorOnApiOperation(error);
        }
    }

    *onDeleteBookClick(book) {
        try {
            yield deleteBook(book.uuid);
            yield* this.onSearchClick();
        } catch(error) {
            this.errorOnApiOperation(error);
        }
    }

    errorOnApiOperation(message) {
        this.setState({
            message
        });
    }
}

export default BooksManagementComponent;