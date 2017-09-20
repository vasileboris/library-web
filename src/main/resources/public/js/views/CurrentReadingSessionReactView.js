import Backbone from 'backbone';
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import CurrentReadingSessionContainer from 'components/CurrentReadingSessionContainer';

const ReadingSessionsView = Backbone.View.extend({
    tagName: 'div',

    initialize: function (bookUuid, store) {
        this.bookUuid = bookUuid;
        this.store = store;
    },

    render: function () {
        render(
            <Provider store={this.store}>
                <CurrentReadingSessionContainer bookUuid={this.bookUuid}/>
            </Provider>,
            this.el
        );
        return this;
    },

    remove() {
        ReactDOM.unmountComponentAtNode(this.el);
        Backbone.View.prototype.remove.call(this);
    }
});

export default ReadingSessionsView;
