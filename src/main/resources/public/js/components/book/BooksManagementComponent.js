import React from 'react';
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import MessageComponent from "../message/MessageComponent";
import SearchBooksComponent from "./SearchBooksComponent";
import BooksComponent from "./BooksComponent";
import { receiveMessageAction } from "actions/MessageAction";
import { receiveBooksSearchTextAction } from "actions/BooksSearchAction";
import { fetchBooksAction, deleteBookAction } from "actions/BookAction";
import PropTypes from "prop-types";

class BooksManagementComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            operation: 'search'
        };

        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
        this.switchToAddBook = this.switchToAddBook.bind(this);
        this.onEditBookClick = this.onEditBookClick.bind(this);
        this.onDeleteBookClick = this.onDeleteBookClick.bind(this);
    }

    render() {
        const { message, booksSearchText, books } = this.props;
        const { operation } = this.state;
        return (
            <div className="content">
                {'search' === operation && (
                    <SearchBooksComponent booksSearchText={booksSearchText}
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

    componentWillUnmount() {
        const { receiveMessageAction } = this.props;
        receiveMessageAction(null);
    }

    onSearchInputChange(e) {
        const booksSearchText = e.target.value.trim(),
            { receiveBooksSearchTextAction } = this.props;
        receiveBooksSearchTextAction(booksSearchText);
    }

    onSearchClick() {
        const { booksSearchText, fetchBooksAction } = this.props;
        fetchBooksAction(booksSearchText);
    }

    switchToAddBook() {

    }

    onEditBookClick(book) {

    }

    onDeleteBookClick(book) {
        const { booksSearchText, deleteBookAction } = this.props;
        deleteBookAction(booksSearchText, book.uuid);
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
    fetchBooksAction,
    deleteBookAction
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BooksManagementComponent));