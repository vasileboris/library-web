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

        initialize: function(books) {
            this.collection = new bookcase.Books(books);
            this.listenTo(this.collection, 'add', this.renderBook);
            this.render();
        },

        render: function () {
            this.collection.each(function (book) {
                this.renderBook(book);
            }, this);
        },

        renderBook: function (book) {
            var bookView = new bookcase.BookView({
                model: book
            });
            this.$('#books-div').append(bookView.render().el);
        },
        
        addBook: function (e) {
            var bookData = {};
            $('#add-book-div').children('input').each(function(i, el){
                var property = el.id.replace('add-book-','').replace(/-\w+/,'');
                var value = $(el).val().trim();
                bookData[property] = value;
            });
            var book = new bookcase.Book(bookData);
            this.collection.add(book);
        }
    });

})();
