import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import AuthLoader from './components/ui/AuthLoader';

const App = () => {
    const isAuthLoading = false;

    if(isAuthLoading) {
        return(
            <AuthLoader/>
        )
    }
    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
