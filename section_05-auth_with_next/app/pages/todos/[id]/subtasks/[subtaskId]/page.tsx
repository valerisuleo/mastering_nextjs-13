import React from 'react';
import { IParams } from '../../../../../common/interfaces';

const SubTaskShow = ({params}: IParams) => {
    return <div>
        {JSON.stringify(params)}
    </div>;
};

export default SubTaskShow;
