define(function(require) {
    "use strict";

    var Backbone = require('js/lib/backbone');

    var Message = Backbone.Model.extend({
        defaults: {
            message: ''
        }
    });

    return Message;
});
