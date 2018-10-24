import React from 'react';
import localizer from 'utils/Localizer';
import PropTypes from "prop-types";

function SearchBooksComponent(props) {
    return (
        <div className="entry">
            <input type="search"
                   className="text"
                   placeholder={localizer.localize('books-search-text')}
                   value={props.searchText}
                   onChange={props.onInputChange}/>
            <button className="button" onClick={props.onSearchClick}>
                {localizer.localize('books-search-button')}
            </button>
            <a href="#" onClick={props.onAddClick}>
                <img src="/img/new.png" alt={localizer.localize('book-add-button')} className="img-icon"/>
            </a>
        </div>
    );
}

SearchBooksComponent.propTypes = {
    searchText: PropTypes.string,
    onInputChange: PropTypes.func,
    onSearchClick: PropTypes.func,
    onAddClick: PropTypes.func
};

export default SearchBooksComponent;

