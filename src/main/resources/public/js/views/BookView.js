(function() {
    "use strict";

    if(window.bookcase === undefined) {
        window.bookcase = {};
    }

    bookcase.BookView = Backbone.View.extend({
        tagName: 'div',

        template: _.template($('#book-template').html()),

        events: {
            'click .delete': 'deleteBook'
        },

        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
        
        deleteBook: function (e) {
            //Disable link default action
            e.preventDefault();
            //Delete model
            this.model.destroy();
            //Delete view
            this.remove();
        }

    });

})();
