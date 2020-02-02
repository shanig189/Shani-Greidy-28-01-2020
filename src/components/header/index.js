import React from 'react';
import Navigation from '../../components/navigation';
import './style.css';

export default () => {
    return (
        <div className="header_ctn">
            <span className="header_headline">Herolo Weather Task</span>
            <Navigation />
        </div>
    );
}