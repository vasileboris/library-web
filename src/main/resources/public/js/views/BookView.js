define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Backbone = require('backbone'),
        templateHtml = require('text!templates/Book.html');

    var BookView = Backbone.View.extend({
        tagName: 'div',

        className: 'div-results',

        template: _.template(templateHtml),

        events: {
            'click .delete': 'deleteBook'
        },

        initialize: function (book) {
            this.book = book;
            this.listenTo(this.book, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.book.attributes));
            return this;
        },
        
        deleteBook: function (e) {
            //Disable link default action
            e.preventDefault();
            //Delete book
            this.book.destroy();
            //Delete view
            this.remove();
        }

    });

    return BookView;
});
