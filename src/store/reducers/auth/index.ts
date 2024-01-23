import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../Models/IUser';

interface AuthState {
    isAuth: boolean;
    isAuthLoading: boolean;
    isLoading: boolean;
    user: IUser;
    error: null | string;
}

const initialState: AuthState = {
    isAuth: false,
    isAuthLoading: true,
    user: {} as IUser,
    error: null,
    isLoading: false,
};

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
            state.isLoading = false;
        },

        setIsAuthLoading(state, action: PayloadAction<boolean>) {
            state.isAuthLoading = action.payload;
        },

        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
        },

        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },

        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    },
});

export const { setError, setIsAuth, setIsAuthLoading, setUser, setIsLoading } =
    authReducer.actions;
export default authReducer.reducer;
