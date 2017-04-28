define(function(require) {
    'use strict';

    return {
        displayDefaultImage: function (target, defaultImage) {
            return function() {
                target.src = defaultImage;
            }
        }
    };

});
