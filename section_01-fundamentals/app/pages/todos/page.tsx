import React from 'react';
import TodosTable from './components/table';
import { ITodo } from './interfaces';

const TodosIndex = async () => {
    const promise = await fetch(
        'https://jsonplaceholder.typicode.com/todos?_limit=10'
    );
    const result: ITodo[] = await promise.json();

    return (
        <div>
            <h1>TodosIndex: Fetching and Caching data</h1>
            <TodosTable list={result}></TodosTable>
        </div>
    );
};

export default TodosIndex;
