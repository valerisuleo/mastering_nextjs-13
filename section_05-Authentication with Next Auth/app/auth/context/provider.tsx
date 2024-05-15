'use client';
import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

interface IChild {
    children: ReactNode;
}

const AuthProvider = ({ children }: IChild) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
