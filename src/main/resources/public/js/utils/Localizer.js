import i18n from 'i18next';

const Localizer = {

    localize: function (key, ...args) {
        const values = args.reduce((values, value, idx) => ({
            ...values,
            [idx]: value
        }) , {});
        return i18n.t(key, values);
    }

};

export default Localizer;
