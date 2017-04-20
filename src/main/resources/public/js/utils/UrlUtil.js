define(function(require) {
    'use strict';

    return {
        previewUrl: function (url) {
            return url.replace(/(http[s]?\:\/\/)(.*)(\/.*)/ig, '$1...$3');
        }
    };

});
