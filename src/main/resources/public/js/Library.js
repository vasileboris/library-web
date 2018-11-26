import React from 'react';
import { render } from 'react-dom';
import LibraryRouter from 'routers/LibraryRouter';
import i18next from 'i18next';
import Fetch from 'i18next-fetch-backend';
import PROP from 'utils/PROP';

i18next
    .use(Fetch)
    .init({
        backend: {
            loadPath: '/js/bundle/Messages_{lng}.properties',
            parse: data => PROP.parse(data)
        },
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            prefix: "{",
            suffix: "}"
        },
        debug: true
    }, () => {
        render(<LibraryRouter/>, document.getElementById('app-div'));
    });
