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
            this.collection = new bookcase.Books();
            this.collection.fetch({reset: true});
            this.render();

            this.listenTo(this.collection, 'add', this.renderBook);
            this.listenTo(this.collection, 'reset', this.render);
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
                if(property === 'authors') {
                    value = value.split(",").map(function (s) {
                        return s.trim();
                    })
                }
                bookData[property] = value;
            });
            this.collection.create(bookData, {wait: true});
        }
    });

})();
