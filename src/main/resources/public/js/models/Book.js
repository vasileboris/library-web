(function() {
    "use strict";

    if(window.bookcase === undefined) {
        window.bookcase = {};
    }

    bookcase.Book = Backbone.Model.extend({
        defaults: {
            uuid: null
        },

        idAttribute: 'uuid'
    });

})();
