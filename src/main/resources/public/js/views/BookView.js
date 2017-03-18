define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Backbone = require('backbone'),
        BooksDispatcher = require('events/BooksDispatcher'),
        templateHtml = require('text!templates/Book.html');

    var BookView = Backbone.View.extend({
        tagName: 'div',

        className: 'div-results',

        template: _.template(templateHtml),

        events: {
            'click .edit-book': 'editBook',
            'click .delete-book': 'deleteBook'
        },

        initialize: function (book) {
            this.book = book;
            this.listenTo(this.book, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.book.attributes));
            return this;
        },

        editBook: function (e) {
            e.preventDefault();
            BooksDispatcher.trigger(BooksDispatcher.Events.EDIT, this.book);
        },
        
        deleteBook: function (e) {
            e.preventDefault();
            this.book.destroy();
            this.remove();
        }

    });

    return BookView;
});
