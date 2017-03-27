define(function(require) {
    'use strict';

    require('i18n');
    return {
        localize: function (key) {
            return jQuery.i18n.prop.apply(jQuery.i18n, arguments);
        }
    };

});
