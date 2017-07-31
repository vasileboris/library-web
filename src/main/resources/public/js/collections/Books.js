import Backbone from 'backbone' ;
import Book from 'models/Book' ;
import user from 'User';

const Books = Backbone.Collection.extend({
    model: Book,

    initialize: function (searchText) {
        this.searchText = searchText;
    },

    url: function () {
        let url = '/users/' + user.id + '/books';
        if(this.searchText) {
            url += '?searchText=' + this.searchText;
        }
        return url;
    },

    changeSearchText: function (searchText) {
        this.searchText = searchText;
    }
});

export default Books;
