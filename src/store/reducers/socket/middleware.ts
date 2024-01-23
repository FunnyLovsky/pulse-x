import { Middleware } from '@reduxjs/toolkit';
import { connectSocket, disconnectedSocket, sendMessage } from '.';
import { IWSServer } from '../../../server/types/type';
import { WSServer } from '../../../server/WSServer';
import { AppDispatch, RootState } from '../..';
import { WSService } from './WSService';

export const socketMiddleware = (url: string): Middleware<{}, RootState, AppDispatch> => {
    let socket: IWSServer | null = null;

    return (store) => (next) => (action: any) => {
        const { dispatch, getState } = store;
        const { type } = action;
        const service = new WSService(dispatch, getState, socket);

        switch (type) {
            case connectSocket.type:
                if (!socket || socket.readyState === WebSocket.CLOSED) {
                    socket = new WSServer(url);
                    console.log('socket connecting...');

                    socket.onopen = () => {
                        service.open();
                    };

                    socket.onclose = () => {
                        service.close();
                    };

                    socket.onerror = (error: any) => {
                        service.error(error);
                    };

                    socket.onmessage = (event) => {
                        service.message(event);
                    };
                }
                break;

            case disconnectedSocket.type:
                if (socket && socket.readyState !== WebSocket.CLOSED) {
                    console.log('socket.close()');
                    socket.close();
                }
                break;

            case sendMessage.type:
                if (socket && socket.readyState === WebSocket.OPEN) {
                    console.log('user message:', JSON.parse(action.payload));
                    socket.send(action.payload);
                }

                break;

            default:
                return next(action);
        }
    };
};
