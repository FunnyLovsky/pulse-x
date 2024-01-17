import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import AuthLoader from './components/ui/AuthLoader';

const App = () => {
    const [isAuthLoading, setAuthLoading] = useState(true)

    useEffect(() => {
        const delay = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setAuthLoading(false);
        };
    
        delay();
    }, [])

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
