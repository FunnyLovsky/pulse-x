import { Middleware } from "@reduxjs/toolkit";
import { connectSocket, connectedSocket, disconnectedSocket, sendMessage, setError } from ".";

export const socketMiddleware = (url: string): Middleware => {
    let socket: WebSocket | null = null;

    return (store) => (next) => (action: any) => {
        switch (action.type) {
            case connectSocket.type:
                if (!socket || socket.readyState === WebSocket.CLOSED) {
                    console.log('create socket');
                    socket = new WebSocket(url);

                    socket.onopen = () => {
                        console.log('open');
                        store.dispatch(connectedSocket());
                    }

                    socket.onclose = () => {
                        console.log('close');
                        store.dispatch(disconnectedSocket());
                    }

                    socket.onerror = (error: any) => {
                        console.log('error');
                        // store.dispatch(setError(error.message));
                        store.dispatch(disconnectedSocket());
                    }

                    socket.onmessage = (event) => {
                        console.log('message');
                        console.log(event.data);
                    }
                }
                break;

            case disconnectedSocket.type:
                if (socket && socket.readyState !== WebSocket.CLOSED) {
                    socket.close();
                }
                break;

            case sendMessage.type:
                try {
                    if (socket && socket.readyState === WebSocket.OPEN) {
                        socket.send(action.payload);
                    }
                } catch (error: any) {
                    store.dispatch(setError(error.message));
                }
                break;

            default:
                return next(action);
        }
    };
};
