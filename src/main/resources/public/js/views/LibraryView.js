define(function(require) {
    "use strict";

    var Backbone = require('js/lib/backbone');
    var BooksView = require('js/views/BooksView');

    var LibraryView = Backbone.View.extend({
        el: '#library-div',

        initialize: function() {
            this.currentView = new BooksView();
            this.render();
        },

        render: function () {
            this.$('#library-div').html(this.currentView.render().el);
        }

    });

    return LibraryView;
});
