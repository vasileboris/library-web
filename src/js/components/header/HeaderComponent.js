import React from 'react';
import {Link} from 'react-router-dom';
import localizer from "../../utils/Localizer";

function HeaderComponent () {
    return (
        <header className="header">
            <nav>
                <Link to='/books'>
                    <img src="/img/logo-one-line.png" alt={localizer.localize('app-title')} className="logo"/>
                </Link>
            </nav>
        </header>
    );
}

export default HeaderComponent;