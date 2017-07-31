import Backbone from 'backbone';
import BooksView from 'views/BooksView';
import CurrentReadingSessionView from 'views/CurrentReadingSessionView';

const LibraryView = Backbone.View.extend({
    el: '#content-div',

    manageBooks: function () {
        this.currentView = new BooksView();
        this.render();
    },

    manageCurrentReadingSession: function (bookUuid) {
        this.currentView = new CurrentReadingSessionView(bookUuid);
        this.render();
    },

    render: function () {
        this.$el.html(this.currentView.render().el);
    }

});

export default LibraryView;
