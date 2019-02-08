import React from 'react';
import localizer from 'utils/Localizer';
import PropTypes from 'prop-types';

function SearchBooksComponent(props) {
    const { booksSearchText, onInputChange, onSearchClick, onAddClick } = props;
    return (
        <div className="entries">
            <div className="entry">
                <input type="search"
                       className="text"
                       value={booksSearchText}
                       placeholder={localizer.localize('books-search-text')}
                       value={booksSearchText}
                       onChange={onInputChange}/>
            </div>
            <div className="entry">
                <a href="#" onClick={onAddClick}>
                    <img src="/img/new.png" alt={localizer.localize('book-add-button')} className="img-icon-large"/>
                </a>
            </div>
        </div>
    );
}

SearchBooksComponent.propTypes = {
    booksSearchText: PropTypes.string,
    onInputChange: PropTypes.func.isRequired,
    onAddClick: PropTypes.func.isRequired
};

export default SearchBooksComponent;

