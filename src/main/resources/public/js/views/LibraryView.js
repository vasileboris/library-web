(function() {
    "use strict";

    if(window.bookcase === undefined) {
        window.bookcase = {};
    }

    bookcase.LibraryView = Backbone.View.extend({
        el: '#library-div',

        initialize: function() {
            this.currentView = new bookcase.BooksView();
            this.render();
        },

        render: function () {
            this.$('#library-div').html(this.currentView.render().el);
        }

    });

})();
