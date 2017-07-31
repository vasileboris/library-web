import i18n from 'i18n';

export default {
    localize: function (key) {
        return jQuery.i18n.prop.apply(jQuery.i18n, arguments);
    }
};
