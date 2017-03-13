define(function(require) {
    "use strict";

    var _ = require('underscore');
    var Backbone = require('backbone');
    var templateHtml = require('text!templates/Message.html');

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
