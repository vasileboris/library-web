define(function(require) {
    'use strict';

    var _ = require('underscore');
    var Backbone = require('backbone');
    var Books = require('collections/Books');
    var Message = require('models/Message');
    var templateHtml = require('text!templates/EditBook.html');

    var EditBooksView = Backbone.View.extend({
        tagName: 'div',

        template: _.template(templateHtml),

        events: {
            'click #book-update-button': 'updateBook'
        },

        initialize: function(uuid) {
            this.books = new Books();
            this.model.fetch();
        },

        render: function () {
            this.$el.html(this.template());
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
                wait: true,
                success: _.bind(this.success, this),
                error: _.bind(this.errorOnUpdateBook, this)
            });
        },

        success: function (model, response, options) {
            this.$el.find('#message-div').html('Book was updated!');
        },

        errorOnUpdateBook: function (model, response, options) {
            this.$el.find('#message-div').html('Error on update book: ' + options.xhr.status);
        }
    });

    return EditBooksView;
});
