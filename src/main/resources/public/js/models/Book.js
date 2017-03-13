define(function(require) {
    var Backbone = require('backbone');

    var Book = Backbone.Model.extend({
        defaults: {
            uuid: null
        },

        idAttribute: 'uuid'
    });

    return Book;
});
