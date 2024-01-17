import { Routes, Route, Navigate } from "react-router-dom";
import { RoutesName, authRoutes, publicRoutes } from "./routes";

const AppRouter = () => {
    const isAuth = true;

    return(
        <div>
            {isAuth 
                ?
                <Routes>
                    {authRoutes.map(route => 
                        <Route key={route.path} path={route.path} element={route.component}/>    
                    )}
                    <Route path="*" element={<Navigate to={RoutesName.ORDERS} replace/>}/>
                </Routes>
                :
                <Routes>
                    {publicRoutes.map(route => 
                        <Route key={route.path} path={route.path} element={route.component}/>    
                    )}
                    <Route path="*" element={<Navigate to={RoutesName.LOGIN} replace/>}/>
                </Routes>
            }
        </div>
        
    )
}

export default AppRouter;