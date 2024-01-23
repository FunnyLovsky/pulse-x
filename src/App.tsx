/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import AuthLoader from './components/ui/AuthLoader';
import { useAppSelector } from './store/hooks/useAppSelector';
import { useActions } from './store/hooks/useActions';

const App = () => {
    const { checkLogin } = useActions();
    const { isAuthLoading } = useAppSelector((state) => state.authReducer);

    useEffect(() => {
        checkLogin();
    }, []);

    if (isAuthLoading) {
        return <AuthLoader />;
    }
    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
};

export default App;
