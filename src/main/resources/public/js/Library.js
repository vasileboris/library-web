import LibraryRouter from 'routers/LibraryRouter';

jQuery.i18n.properties({
    name: 'Messages',
    path: '/js/bundle/',
    mode: 'map',
    checkAvailableLanguages: true,
    async: true,
    callback: function() {
        new LibraryRouter();
        Backbone.history.start({
            pushState: true,
        });
    }
});
