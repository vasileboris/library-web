define(function(require) {
    'use strict';

    var _ = require('underscore');
    var Backbone = require('backbone');
    var Books = require('collections/Books');
    var BookView = require('views/BookView');
    var Message = require('models/Message');
    var MessageView = require('views/MessageView');
    var templateHtml = require('text!templates/Books.html');

    var BooksView = Backbone.View.extend({
        tagName: 'div',

        template: _.template(templateHtml),

        events: {
            'click #add-book-button': 'addBook'
        },

        initialize: function() {
            this.books = new Books();
            this.books.fetch({reset: true});

            this.listenTo(this.books, 'add', this.renderBook);
            this.listenTo(this.books, 'reset', this.render);
        },

        render: function () {
            this.$el.html(this.template());
            this.books.each(function (book) {
                this.renderBook(book);
            }, this);
            return this;
        },

        renderBook: function (book) {
            var bookView = new BookView({
                model: book
            });
            this.$('#books-div').append(bookView.render().el);
        },

        addBook: function () {
            $('#message-div').html('');

            var bookData = {};
            this.$el.children('input').each(function(i, el){
                var property = el.id.replace('add-book-','').replace(/-\w+/,'');
                var value = $(el).val().trim();
                if(property === 'authors') {
                    value = value.split(",").map(function (s) {
                        return s.trim();
                    })
                }
                bookData[property] = value;
            });
            this.books.create(bookData, {
                wait: true,
                success: this.successOnAddBook,
                error: this.errorOnAddBook
            });
        },

        successOnAddBook: function (model, response, options) {
            $('#add-book-div').children('input').each(function(i, el){
                $(el).val('');
            });
        },

        errorOnAddBook: function (model, response, options) {
            var messageView = new MessageView({
                model: new Message({message: 'Error on adding book: ' + options.xhr.status})
            });
            $('#message-div').html(messageView.render().el);
        }
    });

    return BooksView;
});
