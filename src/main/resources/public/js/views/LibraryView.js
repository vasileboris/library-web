import Backbone from 'backbone';
import BooksView from 'views/BooksView';
import CurrentReadingSessionComponent from 'components/CurrentReadingSessionComponent';
import React from 'react';
import ReactDOM from 'react-dom';

const LibraryView = Backbone.View.extend({
    el: '#content-div',

    manageBooks: function () {
        this.currentView = new BooksView();
        this.render();
    },

    manageCurrentReadingSession: function (bookUuid) {
        ReactDOM.render(React.createElement(CurrentReadingSessionComponent, {bookUuid}), this.$el.get(0));
    },

    render: function () {
        this.$el.html(this.currentView.render().el);
    }

});

export default LibraryView;
