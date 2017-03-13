'use strict';

// Require.js allows us to configure shortcut alias
requirejs.config({
    baseUrl: '/js',
    paths: {
        text: 'lib/text',
        jquery: 'lib/jquery',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone'
    },
});

define(function(require) {
    var LibraryView = require('views/LibraryView');
    new LibraryView();
});
