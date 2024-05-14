'use client';

import React from 'react';
import Button, { IBtn } from '../../../library/button';
import { useRouter } from 'next/navigation';
import { ITodo } from '../interfaces';
import { IEvent } from '../../../common/interfaces';

type Props = IEvent & IBtn;

const BtnHydrated = ({ label, eventName, data }: Props) => {
    const router = useRouter();

    const handleClick = () => {
        if (eventName === 'navigate') {
            router.push('/todos/new');
        }
        if (eventName === 'navigateToUser') {
            const current = data as ITodo;
            router.push(`/todos/${current.id}`);
        }
    };

    return <Button label={label} onEmitEvent={handleClick} />;
};

export default BtnHydrated;
