'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Button, { IBtn } from '../../../library/button';
import { IUser } from '../interfaces';

interface IEvent {
    eventName: string;
    data: any;
}

type Props = IBtn & IEvent;

const BtnHydrated = ({ label, data, eventName }: Props) => {
    const handleClick = () => {
        if (eventName === 'openModal') {
            const current = data as IUser;
            console.log('openModal', current);
        }
    };
    return <Button label={label} onEmitEvent={handleClick} />;
};

export default BtnHydrated;
