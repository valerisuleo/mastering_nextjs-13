import React from 'react';
import { IParams } from '../../../common/interfaces';
import { ITodo } from '../interfaces';
import { notFound } from 'next/navigation';

const TodoShow = async ({ params }: IParams) => {
    const promise = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${params['id']}`
    );
    const result: ITodo = await promise.json();

    if (result.id !== +params['id']) {
        console.log('fire', result.id);
        notFound();
    }

    return (
        <div>
            <h1>TodoShow</h1>
        </div>
    );
};

export default TodoShow;
