import React from 'react';
import ReactDOM from 'react-dom/client';
import LibraryRouter from 'routers/LibraryRouter';
import localizer from 'utils/Localizer';

localizer.init(() => {
    const appDiv = ReactDOM.createRoot(document.getElementById('app-div'));
    appDiv.render(<LibraryRouter/>);
});
