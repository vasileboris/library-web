import React from 'react';
import MessageComponent from "../message/MessageComponent";
import SearchBooksComponent from "./SearchBooksComponent";
import BooksComponent from "./BooksComponent";
import {
    fetchBooks,
    deleteBook
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
    }

    render() {
        const { message, operation, booksSearchText, books } = this.state;
        return (
            <div className="content">
                {'search' === operation && (
                    <SearchBooksComponent value={booksSearchText}
                                          onInputChange={this.onSearchInputChange}
                                          onSearchClick={this.onSearchClick}
                                          onAddClick={this.switchToAddBook}/>
                )}
                <MessageComponent message={message}/>
                <BooksComponent books={books}
                                onEditClick={this.onEditBookClick}
                                onDeleteClick={this.onDeleteBookClick}/>
            </div>
        );
    }

    onSearchInputChange(e) {
        const booksSearchText = e.target.value.trim();
        this.setState({
            booksSearchText
        });
    }

    onSearchClick() {
        const { booksSearchText } = this.state;
        fetchBooks(booksSearchText)
            .then(response => this.successOnRetrieveBooks(response.data))
            .catch(error => this.errorOnApiOperation(error));
    }

    successOnRetrieveBooks(books) {
        this.setState({
            message: '',
            books
        });
    }


    switchToAddBook() {

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