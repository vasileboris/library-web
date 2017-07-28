define(function(require) {
    'use strict';

    require('i18n');
    jQuery.i18n.properties({
        name:'Messages',
        path:'/js/bundle/',
        mode:'map',
        checkAvailableLanguages: true,
        async: true,
        callback: function() {
            var LibraryRouter = require('routers/LibraryRouter');
            new LibraryRouter();
            Backbone.history.start({
                pushState: true,
            });
        }
    });
});
