(function() {
    "use strict";

    if(window.bookcase === undefined) {
        window.bookcase = {};
    }

    bookcase.Book = Backbone.Model.extend({
        defaults: {
            uuid: '',
            isbn10: '',
            isbn13: '',
            title: '',
            authors: [],
            pages: 0
        }
    });

})();
