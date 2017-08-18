import Backbone from 'backbone';
import React from 'react';
import ReactDOM from 'react-dom';
import CurrentReadingSessionComponent from 'components/CurrentReadingSessionComponent';

const ReadingSessionsView = Backbone.View.extend({
    tagName: 'div',

    initialize: function (bookUuid) {
        this.bookUuid = bookUuid;
    },

    render: function () {
        ReactDOM.render(React.createElement(CurrentReadingSessionComponent, {bookUuid: this.bookUuid}), this.el);
        return this;
    },

    remove() {
        ReactDOM.unmountComponentAtNode(this.el);
        Backbone.View.prototype.remove.call(this);
    }
});

export default ReadingSessionsView;
