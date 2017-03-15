define(function(require) {
    'use strict';

    var Backbone = require('backbone');
    var SearchBooksView = require('views/SearchBooksView');

    var LibraryView = Backbone.View.extend({
        el: '#library-div',

        initialize: function() {
            this.currentView = new SearchBooksView();
            this.render();
        },

        render: function () {
            this.$el.html(this.currentView.render().el);
        }

    });

    return LibraryView;
});
