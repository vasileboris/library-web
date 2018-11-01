import React from 'react';
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import MessageComponent from "../message/MessageComponent";
import SearchBooksComponent from "./SearchBooksComponent";
import BooksComponent from "./BooksComponent";
import { fetchBooks } from 'api/BookApi';
import { receiveMessageAction } from "actions/MessageAction";
import { receiveBooksSearchTextAction } from "actions/BooksSearchAction";
import PropTypes from "prop-types";

class BooksManagementComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            operation: 'search',
            books: [],
        };

        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        this.searchBooks = this.searchBooks.bind(this);
        this.switchToAddBook = this.switchToAddBook.bind(this);
    }

    render() {
        const { message, booksSearchText } = this.props;
        const { operation, books } = this.state;
        return (
            <div className="content">
                {'search' === operation && (
                    <SearchBooksComponent booksSearchText={booksSearchText}
                                          onInputChange={this.onSearchInputChange}
                                          onSearchClick={this.searchBooks}
                                          onAddClick={this.switchToAddBook}/>
                )}
                <MessageComponent message={message}/>
                <BooksComponent books={books}/>
            </div>
        );
    }

    componentWillUnmount() {
        const { receiveMessageAction } = this.props;
        receiveMessageAction(null);
    }

    onSearchInputChange(e) {
        const booksSearchText = e.target.value.trim(),
            { receiveBooksSearchTextAction } = this.props;
        receiveBooksSearchTextAction(booksSearchText);
    }

    searchBooks() {
        const { booksSearchText } = this.props;
        fetchBooks(booksSearchText)
            .then(response => this.successOnRetrieveBooks(response.data))
            .catch(error => this.errorOnApiOperation(error));
    }

    successOnRetrieveBooks(books) {
        receiveMessageAction(null);
        this.setState({
            books
        });
    }


    switchToAddBook() {

    }

    errorOnApiOperation(message) {
        receiveMessageAction(message);
    }

}

BooksManagementComponent.propTypes = {
    message: PropTypes.string,
    booksSearchText: PropTypes.string.isRequired
};

const mapStateToProps = state => {
    const { message, booksSearchText } = state;
    return {
        message,
        booksSearchText
    };
};

const mapDispatchToProps = {
    receiveMessageAction,
    receiveBooksSearchTextAction
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BooksManagementComponent));