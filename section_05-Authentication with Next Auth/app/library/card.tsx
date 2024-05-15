import React, { ReactNode } from 'react';

export interface ICard {
    title: ReactNode;
    children: ReactNode;
}

const Card = ({ children, title }: ICard) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <div className="card-text">{children}</div>
            </div>
        </div>
    );
};

export default Card;
