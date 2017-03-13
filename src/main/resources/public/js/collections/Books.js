define(function(require) {
    "use strict";

    var Backbone = require('js/lib/backbone');
    var Book = require('js/models/Book');
    var user = require('js/User');

    var Books = Backbone.Collection.extend({
        model: Book,

        url: '/users/' + user.id + '/books'
    });

    return Books;
});
