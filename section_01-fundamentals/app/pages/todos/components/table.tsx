import React from 'react';
import { ITodo } from '../interfaces';

interface Props {
    list: ITodo[];
}

const TodosTable = ({ list }: Props) => {
    const th: string[] = Object.keys(list[0]);

    const setCol = (colName: string, item: ITodo) => {
        switch (colName) {
            case 'completed':
                return <div>{JSON.stringify(item[colName])}</div>;
            default:
                return <div>{item[colName]}</div>;
        }
    };

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        {th.map((item, i) => (
                            <th key={i} scope="col">
                                {item}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {list.map((item: ITodo) => (
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
