import React from 'react';
import MessageComponent from "../message/MessageComponent";
import SearchBooksComponent from "./SearchBooksComponent";
import BooksComponent from "./BooksComponent";
import {fetchBooks} from 'api/BookApi';

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
        this.searchBooks = this.searchBooks.bind(this);
        this.switchToAddBook = this.switchToAddBook.bind(this);
    }

    render() {
        const { message, operation, booksSearchText, books } = this.state;
        return (
            <div className="content">
                {'search' === operation && (
                    <SearchBooksComponent value={booksSearchText}
                                          onInputChange={this.onSearchInputChange}
                                          onSearchClick={this.searchBooks}
                                          onAddClick={this.switchToAddBook}/>
                )}
                <MessageComponent message={message}/>
                <BooksComponent books={books}/>
            </div>
        );
    }

    onSearchInputChange(e) {
        const booksSearchText = e.target.value.trim();
        this.setState({
            booksSearchText
        });
    }

    searchBooks() {
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

    errorOnApiOperation(message) {
        this.setState({
            message
        });
    }

}

export default BooksManagementComponent;