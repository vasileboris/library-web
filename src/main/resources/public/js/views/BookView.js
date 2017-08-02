import _ from 'underscore';
import Backbone from 'backbone';
//import Promise from 'backbone-es6-promise';
import BooksDispatcher from 'events/BooksDispatcher';
import localizer from 'utils/Localizer';
import urlUtil from 'utils/UrlUtil';
import templateHtml from 'text!templates/Book.html';

const BookView = Backbone.View.extend({
    tagName: 'article',

    className: 'result-book',

    template: _.template(templateHtml),

    events: {
        'click .edit-item': 'editBook',
        'click .read-item': 'readBook',
        'click .delete-item': 'deleteBook'
    },

    initialize: function (book) {
        this.book = book;
        this.listenTo(this.book, 'change', this.render);
    },

    render: function () {
        this.$el.html(this.template({
            book: this.book.attributes,
            localizer: localizer,
            urlUtil: urlUtil
        }));
        return this;
    },

    editBook: function (e) {
        e.preventDefault();
        BooksDispatcher.trigger(BooksDispatcher.Events.ERROR, '');
        BooksDispatcher.trigger(BooksDispatcher.Events.EDIT, this.book);
    },

    readBook: function (e) {
        e.preventDefault();
        Backbone.history.navigate('/books/' + this.book.get('uuid'), {trigger: true});
    },

    deleteBook: function (e) {
        e.preventDefault();
        BooksDispatcher.trigger(BooksDispatcher.Events.ERROR, '');
        this.book.destroy()
            .then(() => this.remove())
            .catch(error => this.errorOnDeleteBook());
    },

    errorOnDeleteBook: function (model, response, options) {
        const message = localizer.localize('book-delete-error', options.xhr.status);
        BooksDispatcher.trigger(BooksDispatcher.Events.ERROR, message);
    }
});

export default BookView;