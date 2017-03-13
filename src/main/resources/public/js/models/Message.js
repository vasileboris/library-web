define(function(require) {
    'use strict';

    var Backbone = require('backbone');

    var Message = Backbone.Model.extend({
        defaults: {
            message: ''
        }
    });

    return Message;
});
