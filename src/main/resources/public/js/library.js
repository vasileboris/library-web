$(function() {
    "use strict";

    if(window.bookcase === undefined) {
        window.bookcase = {};
    }

    var books = [
        {
            uuid: 'uuid 1',
            isbn10: 'ISBN 10 1',
            isbn13: 'ISBN 13 1',
            title: 'Title 1',
            authors: ['Author 11', 'Author 12'],
            pages: 101
        },
        {
            uuid: 'uuid 2',
            isbn10: 'ISBN 10 2',
            isbn13: 'ISBN 13 2',
            title: 'Title 2',
            authors: ['Author 21', 'Author 22'],
            pages: 202
        },
        {
            uuid: 'uuid 3',
            isbn10: 'ISBN 10 3',
            isbn13: 'ISBN 13 3',
            title: 'Title 3',
            authors: ['Author 31', 'Author 32'],
            pages: 303
        }
    ];

    new bookcase.BooksView(books);

});
