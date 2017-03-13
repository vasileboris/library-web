define(function(require) {
    var Backbone = require('backbone');
    var BooksView = require('views/BooksView');

    var LibraryView = Backbone.View.extend({
        el: '#library-div',

        initialize: function() {
            this.currentView = new BooksView();
            this.render();
        },

        render: function () {
            this.$el.html(this.currentView.render().el);
        }

    });

    return LibraryView;
});
