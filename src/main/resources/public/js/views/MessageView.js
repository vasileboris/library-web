(function() {
    "use strict";

    if(window.bookcase === undefined) {
        window.bookcase = {};
    }

    bookcase.MessageView = Backbone.View.extend({
        tagName: 'p',

        template: _.template($('#message-template').html()),

        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        }

    });

})();
