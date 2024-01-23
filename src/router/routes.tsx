import React from 'react';
import Login from '../pages/Login';
import Orders from '../pages/Orders';
import Main from '../pages/Main';

export interface IRoute {
    path: string;
    component: React.ReactNode;
}

export enum RoutesName {
    LOGIN = '/login',
    ORDERS = '/orders',
    MAIN = '/',
}

export const publicRoutes: IRoute[] = [
    {
        path: RoutesName.LOGIN,
        component: <Login />,
    },
];

export const authRoutes: IRoute[] = [
    {
        path: RoutesName.ORDERS,
        component: <Orders />,
    },
    {
        path: RoutesName.MAIN,
        component: <Main />,
    },
];
