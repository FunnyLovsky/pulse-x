import { Navigate, Route } from 'react-router-dom';
import { IRoute, RoutesName } from '../routes';

export const renderRoutes = (routes: IRoute[], defaultRoute: RoutesName) => (
    <>
        {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.component} />
        ))}
        <Route path="*" element={<Navigate to={defaultRoute} replace />} />
    </>
);
