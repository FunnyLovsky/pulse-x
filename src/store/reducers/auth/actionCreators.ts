import {
    setError,
    setIsAuth,
    setUser,
    setIsAuthLoading,
    setIsLoading,
} from '.';
import { AppDispatch } from '../..';
import { IUser } from '../../../Models/IUser';
import AuthService from '../../../api/AuthService';
import { connectSocket, connecting, setReconnecting } from '../socket';

const login =
    (username: string, password: string) => async (dispath: AppDispatch) => {
        try {
            dispath(setIsLoading(true));
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const data = await AuthService.getUser();
            const user = data.find(
                (user) =>
                    user.username === username && user.password === password,
            );

            if (user) {
                localStorage.setItem('auth', 'true');
                localStorage.setItem('username', user.username);
                dispath(setUser(user));
                dispath(setIsAuth(true));

                dispath(setReconnecting(true));
                dispath(connecting());
                dispath(connectSocket());
            } else {
                dispath(setError('Некоректный логин или пароль'));
            }

            dispath(setIsLoading(false));
        } catch (error: any) {
            dispath(setError('Ошибка получения данных'));
        }
    };

const logout = () => async (dispatch: AppDispatch) => {
    dispatch(setIsAuthLoading(true));
    dispatch(setReconnecting(false));
    await new Promise((resolve) => setTimeout(resolve, 1000));

    localStorage.removeItem('auth');
    localStorage.removeItem('username');
    dispatch(setUser({} as IUser));
    dispatch(setIsAuth(false));
    dispatch(setIsAuthLoading(false));
};

const checkLogin = () => async (dispatch: AppDispatch) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (localStorage.getItem('auth')) {
        dispatch(
            setUser({ username: localStorage.getItem('username') } as IUser),
        );
        dispatch(setIsAuth(true));

        dispatch(connecting());
        dispatch(connectSocket());
    }
    dispatch(setIsAuthLoading(false));
};

export const AuthActionCreators = {
    login,
    logout,
    checkLogin,
};
