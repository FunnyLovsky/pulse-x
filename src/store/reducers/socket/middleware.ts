import { Dispatch, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { connectSocket, disconnectedSocket, sendMessage, connected, disconnected, connecting } from ".";
import { IWSServer } from "../../../server/types/type";
import { WSServer } from "../../../server/WSServer";
import { ServerEnvelope } from "../../../Models/ServerMessages";
import { ServerMessageType } from "../../../api/Enums";

export const socketMiddleware = (url: string): Middleware => {
    let socket: IWSServer | null = null;

    return (store: MiddlewareAPI<Dispatch>) => (next) => (action: any) => {
        const { dispatch, getState } = store;
        const { type } = action;

        switch (type) {

            case connectSocket.type:
                if (!socket || socket.readyState === WebSocket.CLOSED) {

                    socket = new WSServer(url);
                    console.log('socket connecting...')
                    socket.onopen = () => {
                        console.log('socket open');
                        dispatch(connected());
                    }

                    socket.onclose = () => {
                        console.log('socket close');

                        if(getState().socketReducer.reconnecting) {
                            dispatch(connecting())
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
                        
                        const data: ServerEnvelope = JSON.parse(event);

                        switch (data.messageType) {
                            case ServerMessageType.success:
                                console.log('succes:', data.message);
                                break;

                            case ServerMessageType.error:
                                console.log('error:', data.message);
                                break;

                            
                            case ServerMessageType.executionReport:
                                console.log('executionReport:', data.message);
                                break;

                            case ServerMessageType.marketDataUpdate:
                                console.log('marketDataUpdate:', data.message);
                                break;
                        
                            default:
                                break;
                        }
                        
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
                if (socket && socket.readyState === WebSocket.OPEN) {
                    console.log('user message:', action.payload)
                    socket.send(JSON.stringify(action.payload));
                }

                break;

            default:
                return next(action);
        }
    };
};
