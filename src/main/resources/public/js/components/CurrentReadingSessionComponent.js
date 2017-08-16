import React from 'react';
import PropTypes from 'prop-types';
import Book from 'models/Book';
import ReadonlyBookComponent from 'components/ReadonlyBookComponent';

class CurrentReadingSessionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            book: null
        };
    }

    render() {
        return (
            <div>
                <div className="results">
                    <ReadonlyBookComponent book={this.state.book}/>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.retrieveBook();
    }

    retrieveBook() {
        var book = new Book({uuid: this.props.bookUuid});
        book.fetch()
            .then(book => this.successOnRetrieveBook(book))
            .catch(error => this.errorOnRetrieveBook(error));
    }

    successOnRetrieveBook(book) {
        this.setState({
            book
        });
    }

    errorOnRetrieveBook(error) {
        this.setState({
            message: localizer.localize('book-retrieve-error', error.status)
        });
    }

}

CurrentReadingSessionComponent.propTypes = {
    bookUuid: PropTypes.string.isRequired
};

export default CurrentReadingSessionComponent;