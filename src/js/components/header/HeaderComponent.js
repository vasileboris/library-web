import React from 'react';
import {Link} from 'react-router-dom';
import localizer from "../../utils/Localizer";

const HeaderComponent = () => {
    return (
        <header className="header">
            <nav>
                <Link to='/books'>
                    <img src="/img/logo-two-lines.png" alt={localizer.localize('app-title')} className="img-logo"/>
                </Link>
            </nav>
        </header>
    );
};

export default HeaderComponent;