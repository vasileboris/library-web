(function() {
    "use strict";

    if(window.bookcase === undefined) {
        window.bookcase = {};
    }

    bookcase.Message = Backbone.Model.extend({
        defaults: {
            message: ''
        }
    });

})();
