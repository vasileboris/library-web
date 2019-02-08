import React from 'react';
import { Link } from 'react-router-dom';

function HeaderComponent () {
    return (
        <header className="header">
            <div>
                <Link to='/books'>
                    <img src="/img/logo.svg" alt="Book Library" className="img-logo"/>
                </Link>
            </div>
        </header>
    );
}

export default HeaderComponent;