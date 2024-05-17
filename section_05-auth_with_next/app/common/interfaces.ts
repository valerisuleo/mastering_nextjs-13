/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IParams {
    params: {
        slug?: string[];
    };
    searchParams: {
        sortOrder: string;
    };
}


export interface IEvent {
    eventName: string;
    data?: any
}