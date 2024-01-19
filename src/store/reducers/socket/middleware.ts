import { Middleware } from "@reduxjs/toolkit";
import { connectSocket, disconnectedSocket, sendMessage, setError, connected, disconnected} from ".";

export const socketMiddleware = (url: string): Middleware => {
    console.log('middleware')
    let socket: WebSocket | null = null;

    return (store) => (next) => (action: any) => {
        switch (action.type) {
            case connectSocket.type:
                if (!socket || socket.readyState === WebSocket.CLOSED) {
                    console.log('create socket');
                    socket = new WebSocket(url);

                    socket.onopen = () => {
                        console.log('open');
                        store.dispatch(connected());
                    }

                    socket.onclose = () => {
                        console.log('close');
                        store.dispatch(disconnected());
                        socket = null
                    }

                    socket.onerror = (error: any) => {
                        console.log('error');
                        store.dispatch(disconnected());
                        socket = null
                    }

                    socket.onmessage = (event) => {
                        console.log('message:', event.data);
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
                    store.dispatch(setError(error.message));
                }
                break;

            default:
                return next(action);
        }
    };
};
