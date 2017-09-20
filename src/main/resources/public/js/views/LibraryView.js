import Backbone from 'backbone';
import BooksView from 'views/BooksView';
import CurrentReadingSessionReactView from 'views/CurrentReadingSessionReactView';

const LibraryView = Backbone.View.extend({
    el: '#content-div',

    manageBooks: function () {
        this.cleanup();
        this.currentView = new BooksView();
        this.render();
    },

    manageCurrentReadingSession: function (bookUuid, store) {
        this.cleanup();
        this.currentView = new CurrentReadingSessionReactView(bookUuid, store);
        this.render();
    },

    render: function () {
        this.$el.html(this.currentView.render().el);
    },

    cleanup: function () {
        if(this.currentView) {
            this.currentView.remove();
        }
    }

});

export default LibraryView;
