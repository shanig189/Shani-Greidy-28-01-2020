import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import useMobileDetect from 'use-mobile-detect-hook';
import navigationLinks from '../../config/navigationLinks';
import './style.css';

export default () => {
    const navigationReducer = useSelector(state => state.navigationReducer);
    const dispatch = useDispatch();
    const detectMobile = useMobileDetect();
    const isMobile = detectMobile.isMobile();
    const mobileNavBarRef = useRef();
    let mobileMenuToggle = false;

    const handleMenuClickToggle = (toggle) => {
        mobileMenuToggle = toggle;

        if (mobileMenuToggle) {
            mobileNavBarRef.current.classList.add("open_drawer");
            mobileNavBarRef.current.classList.remove("close_drawer");
        } else {
            mobileNavBarRef.current.classList.remove("open_drawer");
            mobileNavBarRef.current.classList.add("close_drawer");
        }
    }

    const navigationLinksData = navigationLinks.map((link, index) =>
        <li key={index}
            className={navigationReducer.activeLink === link.name ? 'active_link' : ''}
            onClick={() => {
                if (isMobile) {
                    handleMenuClickToggle(false);
                }

                dispatch({ type: 'CHANGE_LINK', payload: link.name })
            }}
        >
            <Link to={link.href}>
                {link.name}
            </Link>
        </li>
    );

    const listId = isMobile ? "slide-out" : "";
    const listClass = isMobile ? "side_nav" : "";
    const listContainerStyle = isMobile ? {
        border: 'none'
    } : {};

    return (
        <nav className="nav_ctn">
            {
                isMobile && (<i onClick={() => { handleMenuClickToggle(!mobileMenuToggle) }} className="material-icons nav_menu_icon">menu</i>)
            }
            <div className="right nav_links" style={listContainerStyle}>
                <ul id={listId} className={listClass} ref={mobileNavBarRef} >
                    {
                        isMobile &&
                        (<li className="nav_close_menu">
                            <span onClick={() => { handleMenuClickToggle(false) }}>X</span>
                        </li>)
                    }
                    {navigationLinksData}
                </ul>
            </div>
        </nav>
    );
}