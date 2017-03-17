define(function(require) {
    'use strict';

    var _ = require('underscore');
    var Backbone = require('backbone');
    var templateHtml = require('text!templates/Book.html');

    var BookView = Backbone.View.extend({
        tagName: 'div',

        className: 'div-results',

        template: _.template(templateHtml),

        events: {
            'click .delete': 'deleteBook'
        },

        initialize: function (book) {
            this.model = book;
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
        
        deleteBook: function (e) {
            //Disable link default action
            e.preventDefault();
            //Delete model
            this.model.destroy();
            //Delete view
            this.remove();
        }

    });

    return BookView;
});
