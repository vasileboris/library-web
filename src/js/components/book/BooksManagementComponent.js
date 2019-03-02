import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MessageComponent from 'components/message/MessageComponent';
import SearchBooksComponent from './SearchBooksComponent';
import InputBookComponent from './InputBookComponent';
import BooksComponent from './BooksComponent';
import { receiveMessageAction } from 'actions/MessageAction';
import { receiveBooksSearchTextAction } from 'actions/BooksSearchAction';
import {
    fetchBooksAction,
    deleteBookAction,
    changeBookFieldAction,
    resetBookAction,
    addBookAction,
    updateBookAction
} from 'actions/BookAction';
import { changeBookOperationAction } from 'actions/OperationAction';
import history from 'routers/History';
import { scrollIntoView } from 'utils/Scroll';
import PropTypes from 'prop-types';

class BooksManagementComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        this.switchToAddBook = this.switchToAddBook.bind(this);
        this.onReadBookClick = this.onReadBookClick.bind(this);
        this.onEditBookClick = this.onEditBookClick.bind(this);
        this.onDeleteBookClick = this.onDeleteBookClick.bind(this);
        this.onBookInputChange = this.onBookInputChange.bind(this);
        this.onAddBookClick = this.onAddBookClick.bind(this);
        this.switchToSearchBooks = this.switchToSearchBooks.bind(this);
        this.onUpdateBookClick = this.onUpdateBookClick.bind(this);
        this.messageRef = React.createRef();
        this.inputRef = React.createRef();
    }

    render() {
        const { message, operation, book, booksSearchText, books } = this.props;
        return (
            <div className="content">
                <div className="entries container horizontal">
                    <MessageComponent ref={this.messageRef} message={message}/>
                    {'search' === operation && (
                    <SearchBooksComponent booksSearchText={booksSearchText}
                                          onInputChange={this.onSearchInputChange}
                                          onAddClick={this.switchToAddBook}/>
                    )}
                    {['add', 'edit'].indexOf(operation) > -1 && (
                    <InputBookComponent
                        ref={this.inputRef}
                        operation={operation}
                        book={book}
                        onInputChange={this.onBookInputChange}
                        onAddButtonClick={this.onAddBookClick}
                        onUpdateButtonClick={this.onUpdateBookClick}
                        onCancelButtonClick={this.switchToSearchBooks}/>
                    )}
                </div>
                <BooksComponent books={books}
                                onReadClick={this.onReadBookClick}
                                onEditClick={this.onEditBookClick}
                                onDeleteClick={this.onDeleteBookClick}/>
            </div>
        );
    }

    componentDidMount() {
        const booksSearchText = this.props.booksSearchText,
            { fetchBooksAction } = this.props;
        fetchBooksAction(booksSearchText);
    }

    componentDidUpdate() {
        this.scrollToInput();
    }

    componentWillUnmount() {
        this.switchToSearchBooks();
    }

    onSearchInputChange(e) {
        const booksSearchText = e.target.value,
            { receiveBooksSearchTextAction, fetchBooksAction } = this.props;
        receiveBooksSearchTextAction(booksSearchText);
        fetchBooksAction(booksSearchText.trim());
    }

    onBookInputChange(e) {
        const { changeBookFieldAction } = this.props;
        const { name } = e.target;
        let value  = e.target.value;
        if('authors' === name) {
            value = value.split(',');
        }
        changeBookFieldAction(name, value);
    }

    onAddBookClick() {
        const booksSearchText = this.props.booksSearchText.trim(),
            { book, addBookAction } = this.props;

        addBookAction(booksSearchText, book);
    }

    switchToAddBook() {
        const { changeBookOperationAction, resetBookAction, receiveMessageAction } = this.props;
        changeBookOperationAction('add');
        resetBookAction({});
        receiveMessageAction(null);
    }

    switchToSearchBooks() {
        const { changeBookOperationAction, resetBookAction, receiveMessageAction } = this.props;
        changeBookOperationAction('search');
        resetBookAction({});
        receiveMessageAction(null);
    }

    onReadBookClick(book) {
        history.push('/books/' + book.uuid);
    }

    onEditBookClick(book) {
        const { changeBookOperationAction, resetBookAction, receiveMessageAction } = this.props;
        changeBookOperationAction('edit');
        resetBookAction(book);
        receiveMessageAction(null);
    }

    onUpdateBookClick() {
        const booksSearchText = this.props.booksSearchText.trim(),
            { book, updateBookAction } = this.props;

        updateBookAction(booksSearchText, book);
    }

    onDeleteBookClick(book) {
        const { booksSearchText, deleteBookAction } = this.props;
        deleteBookAction(booksSearchText, book.uuid);
    }

    scrollToInput() {
        const { operation, message } = this.props;
        switch (operation) {
            case 'search':
                if(message) {
                    scrollIntoView(this.messageRef);
                }
                break;
            case 'edit':
            case 'delete':
                scrollIntoView(this.inputRef);
                break;
        }
    }
}

BooksManagementComponent.propTypes = {
    message: PropTypes.string,
    operation: PropTypes.oneOf(['search', 'add', 'edit']),
    book: PropTypes.object,
    booksSearchText: PropTypes.string,
    books: PropTypes.object
};

const mapStateToProps = state => {
    const { message, operation, book, booksSearchText, books } = state;
    return {
        message,
        operation,
        book,
        booksSearchText,
        books
    };
};

const mapDispatchToProps = {
    receiveMessageAction,
    receiveBooksSearchTextAction,
    fetchBooksAction,
    deleteBookAction,
    resetBookAction,
    changeBookFieldAction,
    addBookAction,
    changeBookOperationAction,
    updateBookAction
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BooksManagementComponent));