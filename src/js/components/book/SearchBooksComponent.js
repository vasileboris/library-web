import React from 'react';
import localizer from 'utils/Localizer';
import PropTypes from 'prop-types';

function SearchBooksComponent(props) {
    const { booksSearchText, onInputChange, onSearchClick, onAddClick } = props;
    return (
        <React.Fragment>
            <div className="entry">
                <input type="search"
                       className="text"
                       value={booksSearchText}
                       placeholder={localizer.localize('books-search-text')}
                       value={booksSearchText}
                       onChange={onInputChange}/>
                <button className="button"
                        onClick={onAddClick}>
                    {localizer.localize('book-add-button')}
                </button>
            </div>
        </React.Fragment>
    );
}

SearchBooksComponent.propTypes = {
    booksSearchText: PropTypes.string,
    onInputChange: PropTypes.func.isRequired,
    onAddClick: PropTypes.func.isRequired
};

export default SearchBooksComponent;

