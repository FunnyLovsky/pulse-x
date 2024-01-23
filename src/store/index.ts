import { Middleware, combineReducers, configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';
import { socketMiddleware } from './reducers/socket/middleware';

const rootReducer = combineReducers(reducers);

export const store = configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
        const customMiddleware: Middleware = socketMiddleware(
            'wss://socketsbay.com/wss/v2/1/demo/',
        );

        return getDefaultMiddleware().concat(customMiddleware);
    },
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
