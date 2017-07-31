import Backbone from 'backbone';
import localizer from 'utils/Localizer';
import user from 'User';

const Book = Backbone.Model.extend({
    idAttribute: 'uuid',

    urlRoot: function () {
        return `/users/${user.id}/books`;
    },
    
    validate: function (bookData) {
        if(bookData.isbn10 + bookData.isbn13 === '') {
            return localizer.localize('book-isbn-validation');
        }

        if(bookData.title === '') {
            return localizer.localize('book-title-validation');
        }

        if(bookData.authors.length === 0) {
            return localizer.localize('book-authors-validation');
        }

        const pagesRegexp = /^\d+$/;
        if(!pagesRegexp.test(bookData.pages) || bookData.pages < 1) {
            return localizer.localize('book-pages-validation');
        }
    }

});

export default Book;
