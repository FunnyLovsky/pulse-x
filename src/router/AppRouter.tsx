import { Routes, Route, Navigate } from 'react-router-dom';
import { RoutesName, authRoutes, publicRoutes } from './routes';
import { useAppSelector } from '../store/hooks/useAppSelector';
import Sidebar from '../components/Sidebar';

const AppRouter = () => {
    const { isAuth } = useAppSelector((state) => state.authReducer);

    return (
        <Routes>
            {isAuth ? (
                <Route element={<Sidebar />}>
                    {authRoutes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={route.component}
                        />
                    ))}
                    <Route
                        path="*"
                        element={<Navigate to={RoutesName.MAIN} replace />}
                    />
                </Route>
            ) : (
                <>
                    {publicRoutes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={route.component}
                        />
                    ))}
                    <Route
                        path="*"
                        element={<Navigate to={RoutesName.LOGIN} replace />}
                    />
                </>
            )}
        </Routes>
    );
};

export default AppRouter;
