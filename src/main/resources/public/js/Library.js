import React from 'react';
import { render } from 'react-dom';
import LibraryRouter from 'routers/LibraryRouter';

jQuery.i18n.properties({
    name: 'Messages',
    path: '/js/bundle/',
    mode: 'map',
    checkAvailableLanguages: true,
    async: true,
    callback: function() {
        render(<LibraryRouter/>, document.getElementById('app-div'));
    }
});
