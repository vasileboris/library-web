import React from 'react';
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import MessageComponent from "../message/MessageComponent";
import SearchBooksComponent from "./SearchBooksComponent";
import BooksComponent from "./BooksComponent";
import { receiveMessageAction } from "actions/MessageAction";
import { receiveBooksSearchTextAction } from "actions/BooksSearchAction";
import { fetchBooksAction } from "actions/BookAction";
import PropTypes from "prop-types";

class BooksManagementComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            operation: 'search'
        };

        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        this.searchBooks = this.searchBooks.bind(this);
        this.switchToAddBook = this.switchToAddBook.bind(this);
    }

    render() {
        const { message, booksSearchText, books } = this.props;
        const { operation } = this.state;
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
        const { booksSearchText, fetchBooksAction } = this.props;
        fetchBooksAction(booksSearchText);
    }

    switchToAddBook() {

    }

}

BooksManagementComponent.propTypes = {
    message: PropTypes.string,
    booksSearchText: PropTypes.string.isRequired,
    books: PropTypes.object
};

const mapStateToProps = state => {
    const { message, booksSearchText, books } = state;
    return {
        message,
        booksSearchText,
        books
    };
};

const mapDispatchToProps = {
    receiveMessageAction,
    receiveBooksSearchTextAction,
    fetchBooksAction
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BooksManagementComponent));