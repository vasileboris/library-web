import React from 'react';
import LibraryView from 'views/LibraryView';

class LibraryViewComponent extends React.Component {
    render() {
        return (
            <div id="content-div" className="content"></div>
        );
    }

    componentDidMount() {
        const libraryView = new LibraryView();
        libraryView.manageBooks();
    }

}

export default LibraryViewComponent;