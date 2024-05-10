import React from 'react';
import TodosTable from './components/table';
import { ITodo } from './interfaces';
import { IParams } from '../../common/interfaces';

const TodosIndex = async ({ searchParams }: IParams) => {
    const promise = await fetch(
        'https://jsonplaceholder.typicode.com/xtodos?_limit=10'
    );
    const result: ITodo[] = await promise.json();

    return (
        <div>
            <h1>TodosIndex</h1>
            <TodosTable
                list={result}
                colName={searchParams.sortOrder}
            ></TodosTable>
        </div>
    );
};

export default TodosIndex;
