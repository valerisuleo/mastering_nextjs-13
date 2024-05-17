import React from 'react';
import classes from './loading.module.scss';

const Loading = () => {
    return (
        <div
            data-testid="spinner-container"
            className={`${classes.spinnerContainer} d-flex align-items-center justify-content-center text-primary`}
        >
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading</span>
            </div>
        </div>
    );
};

export default Loading;
