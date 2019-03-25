import React from 'react';
import { render } from 'react-dom';
import LibraryRouter from 'routers/LibraryRouter';
import localizer from 'utils/Localizer';

localizer.init(() => {
    render(<LibraryRouter/>, document.getElementById('app-div'));
});
