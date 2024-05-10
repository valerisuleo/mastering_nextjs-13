import React from 'react';
import { sort } from 'fast-sort';
import Link from 'next/link';
import { ITodo } from '../interfaces';
import BtnHydrated from './btn-hydrated';

interface Props {
    list: ITodo[];
    colName: string;
}

const TodosTable = ({ list, colName }: Props) => {
    const th: string[] = [...Object.keys(list[0] || {}), ''];
    const sorted: ITodo[] = sort(list).asc((sortBy) => sortBy[colName]);

    const setCol = (colName: string, item: ITodo) => {
        switch (colName) {
            case 'completed':
                return <div>{JSON.stringify(item[colName])}</div>;
            case '':
                return (
                    <div>
                        <BtnHydrated
                            label={'Details'}
                            eventName={'navigateToUser'}
                            data={item}
                        />
                    </div>
                );
            default:
                return <div>{item[colName]}</div>;
        }
    };

    return (
        <div>
            <div className="my-5">
                <BtnHydrated label={'New todo'} eventName={'navigate'} />
            </div>
            <table className="table">
                <thead>
                    <tr>
                        {th.map((item, i) => (
                            <th key={i} scope="col">
                                <Link href={`/todos?sortOrder=${item}`}>
                                    {item}
                                </Link>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sorted.map((item: ITodo) => (
                        <tr key={item.id}>
                            {th.map((element: string, i) => (
                                <td key={i}>{setCol(element, item)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TodosTable;
