(function() {
    "use strict";

    if(window.bookcase === undefined) {
        window.bookcase = {};
    }

    bookcase.BooksView = Backbone.View.extend({
        el: '#add-book-div',

        events: {
            'click #add-book-button': 'addBook'
        },

        initialize: function() {
            this.books = new bookcase.Books();
            this.books.fetch({reset: true});
            this.render();

            this.listenTo(this.books, 'add', this.renderBook);
            this.listenTo(this.books, 'reset', this.render);
        },

        render: function () {
            this.books.each(function (book) {
                this.renderBook(book);
            }, this);
        },

        renderBook: function (book) {
            var bookView = new bookcase.BookView({
                model: book
            });
            this.$('#books-div').append(bookView.render().el);
        },

        addBook: function () {
            $('#message-div').html('');

            var bookData = {};
            $('#add-book-div').children('input').each(function(i, el){
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
            var messageView = new bookcase.MessageView({
                model: new bookcase.Message({message: 'Error on adding book: ' + options.xhr.status})
            });
            $('#message-div').html(messageView.render().el);
        }
    });

})();
