define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Backbone = require('backbone'),
        templateHtml = require('text!templates/Header.html');

    var HeaderView = Backbone.View.extend({
        el: '#menu-div',

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

    return HeaderView;
});
