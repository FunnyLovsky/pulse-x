import { Routes, Route } from 'react-router-dom';
import { RoutesName, authRoutes, publicRoutes } from './routes';
import { useAppSelector } from '../store/hooks/useAppSelector';
import Sidebar from '../components/Sidebar';
import { renderRoutes } from './utils/renderRoutes';

const AppRouter = () => {
    const { isAuth } = useAppSelector((state) => state.authReducer);

    return (
        <Routes>
            {isAuth ? (
                <Route element={<Sidebar />}>{renderRoutes(authRoutes, RoutesName.ORDERS)}</Route>
            ) : (
                renderRoutes(publicRoutes, RoutesName.LOGIN)
            )}
        </Routes>
    );
};

export default AppRouter;
