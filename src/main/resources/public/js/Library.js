'use strict';

// Require.js allows us to configure shortcut alias
require.config({
    // The shim config allows us to configure dependencies for
    // scripts that do not call define() to register a module
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    },
    paths: {
        jquery: 'js/lib/jquery',
        underscore: 'js/lib/underscore',
        backbone: 'js/lib/backbone'
    }
});

define(function(require) {
    'use strict';

    var LibraryView = require('js/views/LibraryView');
    new LibraryView();
});
