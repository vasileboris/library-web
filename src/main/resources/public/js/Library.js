$(function() {
    "use strict";

    if(window.bookcase === undefined) {
        window.bookcase = {};
    }

    new bookcase.LibraryView();
});
