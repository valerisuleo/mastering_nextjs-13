import React, { Fragment } from 'react';
import { users } from './utils/mock';
import Card, { ICard } from '../../library/card';
import { IUser } from './interfaces';
import BtnHydrated from './components/btn-hydrated';

const UsersIndex = () => {
    const list = users;

    const userCard = (current: IUser) => {
        const props: ICard = {
            title: current.name,
            children: (
                <Fragment>
                    <p>{current.username}</p>
                    <p>{current.email}</p>
                    <BtnHydrated
                        label={'More...'}
                        eventName={'openModal'}
                        data={current}
                    />
                </Fragment>
            ),
        };

        return <Card {...props} />;
    };

    return (
        <div className="row my-5">
            <h1 className="mb-5">
                UsersIndex: Limitations of Server Components in SSR
            </h1>

            {list.map((item) => (
                <div key={item.id} className="col-md-6 col-lg-4 mb-4">
                    {userCard(item)}
                </div>
            ))}
        </div>
    );
};

export default UsersIndex;
