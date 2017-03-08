(function() {
    "use strict";

    if(window.bookcase === undefined) {
        window.bookcase = {};
    }

    bookcase.Books = Backbone.Collection.extend({
        model: bookcase.Book,

        url: '/users/' + bookcase.user + '/books'
    });
})();
