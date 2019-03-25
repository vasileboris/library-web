import i18next from 'i18next';
import Fetch from "i18next-fetch-backend";
import PROP from "./PROP";

const Localizer = {

    init: function(callback) {
        i18next
            .use(Fetch)
            .init({
                backend: {
                    loadPath: lng => {
                        const suffix = 'en' !== lng ? `_${lng}` : '';
                        return `/translations/Messages${suffix}.properties`
                    },
                    parse: data => PROP.parse(data)
                },
                lng: "en",
                fallbackLng: "en",
                interpolation: {
                    prefix: "{",
                    suffix: "}"
                },
                debug: true
            }, () => callback());

    },

    localize: function (key, ...args) {
        const values = args.reduce((values, value, idx) => ({
            ...values,
            [idx]: value
        }) , {});
        return i18next.t(key, values);
    }

};

export default Localizer;
