import { Routes, Route, Navigate } from "react-router-dom";
import { RoutesName, authRoutes, publicRoutes } from "./routes";
import { useAppSelector } from "../store/hooks/useAppSelector";

const AppRouter = () => {
    const {isAuth} = useAppSelector(state => state.authReducer);
    
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