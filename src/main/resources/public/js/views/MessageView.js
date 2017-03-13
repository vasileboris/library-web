define(function(require) {
    "use strict";

    var _ = require('js/lib/underscore');
    var Backbone = require('js/lib/backbone');
    var templateHtml = require('text!js/templates/Message.html');

    var MessageView = Backbone.View.extend({
        tagName: 'p',

        template: _.template(templateHtml),

        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        }

    });

    return MessageView;
});
