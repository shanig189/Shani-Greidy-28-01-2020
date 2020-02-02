import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './style.css';

export default () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'CHANGE_LINK', payload: '' });
    }, []);

    return (
        <h1>No Page Found</h1>
    );
}