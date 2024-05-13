import React from 'react';

export interface IBtn {
    label: string;
    onEmitEvent?: () => void; // only for client side
}

const Button = ({ label, onEmitEvent }: IBtn) => {
    return (
        <button className="btn btn-primary" onClick={onEmitEvent}>
            {label}
        </button>
    );
};

export default Button;
