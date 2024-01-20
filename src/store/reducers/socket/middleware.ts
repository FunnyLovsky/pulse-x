import { Dispatch, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { connectSocket, disconnectedSocket, sendMessage, setError, connected, disconnected } from ".";

export const socketMiddleware = (url: string): Middleware => {
    let socket: WebSocket | null = null;

    return (store: MiddlewareAPI<Dispatch>) => (next) => (action: any) => {
        const { dispatch, getState } = store;
        const { type } = action;

        switch (type) {

            case connectSocket.type:
                if (!socket || socket.readyState === WebSocket.CLOSED) {

                    socket = new WebSocket(url);
                    console.log('socket connecting...')
                    socket.onopen = () => {
                        console.log('socket open');
                        dispatch(connected());
                    }

                    socket.onclose = () => {
                        console.log('socket close');

                        if(getState().socketReducer.reconnecting) {
                            dispatch(connectSocket());
                        } else {
                            dispatch(disconnected());
                            socket = null;
                        }
                    }

                    socket.onerror = (error: any) => {
                        console.log('socket error: ', error);
                        dispatch(disconnected());
                        socket = null
                    }

                    socket.onmessage = (event) => {
                        console.log('socket message:', event.data);
                    }
                }
                break;

            case disconnectedSocket.type:
                if (socket && socket.readyState !== WebSocket.CLOSED) {
                    console.log('socket.close()')
                    socket.close();
                }
                break;

            case sendMessage.type:
                try {
                    if (socket && socket.readyState === WebSocket.OPEN) {
                        console.log('user message:', action.payload)
                        socket.send(action.payload);
                    }
                } catch (error: any) {
                    dispatch(setError(error.message));
                }
                break;

            default:
                return next(action);
        }
    };
};
