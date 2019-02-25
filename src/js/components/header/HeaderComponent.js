import React from 'react';
import { Link } from 'react-router-dom';
import localizer from "../../utils/Localizer";

function HeaderComponent () {
    return (
        <header className="header">
            <div>
                <Link to='/books'>
                    <img src="/img/book.svg" alt={localizer.localize('app-title')} className="img-logo"/>
                </Link>
            </div>
        </header>
    );
}

export default HeaderComponent;