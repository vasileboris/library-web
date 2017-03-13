define(function(require) {
    "use strict";

    var Backbone = require('backbone');
    var Book = require('models/Book');
    var user = require('User');

    var Books = Backbone.Collection.extend({
        model: Book,

        url: '/users/' + user.id + '/books'
    });

    return Books;
});
