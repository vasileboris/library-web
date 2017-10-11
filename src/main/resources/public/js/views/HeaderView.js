import  _ from 'underscore';
import Backbone from 'backbone';
import templateHtml from 'text!templates/Header.html';

const HeaderView = Backbone.View.extend({
    el: '.page-header',

    template: _.template(templateHtml),

    events: {
        'click #books-link': 'manageBooks'
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    manageBooks: function (e) {
        e.preventDefault();
        Backbone.history.navigate('/books', {trigger: true});
    }

});

export default HeaderView;
