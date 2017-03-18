define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Backbone = require('backbone'),
        Book = require('models/Book'),
        Message = require('models/Message'),
        templateHtml = require('text!templates/EditBook.html');

    var EditBooksView = Backbone.View.extend({
        tagName: 'div',

        template: _.template(templateHtml),

        events: {
            'click #book-update-button': 'updateBook'
        },

        initialize: function(uuid) {
            this.book = new Book({uuid: uuid});
            this.book.fetch({
                success: _.bind(this.successOnInitializeBook, this),
                error: _.bind(this.errorOnInitializeBook, this)
            });
        },

        successOnInitializeBook: function (model, response, options) {
            this.render();
        },

        errorOnInitializeBook: function (model, response, options) {
            this.$el.find('#message-div').html('Error on initializing book: ' + options.xhr.status);
        },

        render: function () {
            this.$el.html(this.template(this.book.attributes));
            return this;
        },

        updateBook: function () {
            this.$el.find('#message-div').html('');

            var bookData = {};
            this.$el.find('input').each(function(i, el){
                var property = el.id.replace('book-','').replace(/-\w+/,'');
                var value = $(el).val().trim();
                if(property === 'authors') {
                    value = value.split(",").map(function (s) {
                        return s.trim();
                    })
                }
                bookData[property] = value;
            });

            this.book.save(bookData, {
                success: _.bind(this.successOnUpdateBook, this),
                error: _.bind(this.errorOnUpdateBook, this)
            });
        },

        successOnUpdateBook: function (model, response, options) {
            this.$el.find('#message-div').html('Book was updated!');
        },

        errorOnUpdateBook: function (model, response, options) {
            this.$el.find('#message-div').html('Error on update book: ' + options.xhr.status);
        }
    });

    return EditBooksView;
});
