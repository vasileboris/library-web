(function() {
    "use strict";

    if(window.bookcase === undefined) {
        window.bookcase = {};
    }

    bookcase.BookView = Backbone.View.extend({
        tagName: 'div',

        template: _.template($('#book-template').html()),

        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        }

    });

})();
