'use strict';

// Require.js allows us to configure shortcut alias
require.config({
    baseUrl: '/js',
    paths: {
        text: 'lib/text',
        jquery: 'lib/jquery',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone'
    },
    shim: {
        backbone: ['jquery', 'underscore']
    }});

define(function(require) {
    'use strict';

    var LibraryView = require('views/LibraryView');
    new LibraryView();
});
