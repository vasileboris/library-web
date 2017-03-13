define(function(require) {
    "use strict";

    var _ = require('js/lib/underscore');
    var Backbone = require('js/lib/backbone');
    var templateHtml = require('text!js/templates/Book.html');

    var BookView = Backbone.View.extend({
        tagName: 'div',

        template: _.template(templateHtml),

        events: {
            'click .delete': 'deleteBook'
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
