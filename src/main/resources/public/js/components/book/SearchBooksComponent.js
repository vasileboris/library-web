import React from 'react';
import localizer from 'utils/Localizer';
import PropTypes from "prop-types";

function SearchBooksComponent(props) {
    const { booksSearchText, onInputChange, onSearchClick, onAddClick } = props;
    return (
        <div className="entries">
            <div className="entry">
                <input type="search"
                       className="text"
                       placeholder={localizer.localize('books-search-text')}
                       value={booksSearchText}
                       onChange={onInputChange}/>
            </div>
            <div className="entry">
                <button className="button" onClick={onSearchClick}>
                    {localizer.localize('books-search-button')}
                </button>
                <a href="#" onClick={onAddClick}>
                    <img src="/img/new.png" alt={localizer.localize('book-add-button')} className="img-icon"/>
                </a>
            </div>
        </div>
    );
}

SearchBooksComponent.propTypes = {
    booksSearchText: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onSearchClick: PropTypes.func.isRequired,
    onAddClick: PropTypes.func.isRequired
};

export default SearchBooksComponent;

