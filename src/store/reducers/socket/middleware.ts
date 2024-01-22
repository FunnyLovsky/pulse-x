import {  Middleware} from "@reduxjs/toolkit";
import { connectSocket, disconnectedSocket, sendMessage, connected, disconnected, connecting } from ".";
import { IWSServer } from "../../../server/types/type";
import { WSServer } from "../../../server/WSServer";
import { ErrorInfo, ExecutionReport, MarketDataUpdate, ServerEnvelope, SuccessInfo } from "../../../Models/ServerMessages";
import { ServerMessageType } from "../../../api/Enums";
import { setError, setIsLoading, setPrice, succesSub } from "../market";
import { AppDispatch, RootState } from "../..";
import { cancelActiveOrder, setOrder } from "../orders";
import { IChangeOrder } from "../../../Models/IOrder";
import { DBService } from "../../../api/DBService";

interface StoreApi {
    dispatch: AppDispatch;
    getState: () => RootState;
  }

export const socketMiddleware = (url: string): Middleware<StoreApi> => {
    let socket: IWSServer | null = null;

    return (store) => (next) => (action: any) => {
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
                                
                                const message = data.message as SuccessInfo
                                dispatch(succesSub(message.subscriptionId))
                                break;

                            case ServerMessageType.error:
                                console.log('error:', data.message);

                                const error = data.message as ErrorInfo
                                dispatch(setIsLoading(false));
                                dispatch(setError(error.reason))
                                break;

                            case ServerMessageType.executionReport:
                                console.log('executionReport:', data.message);
                                
                                const order = data.message as ExecutionReport
                                const orderCh: IChangeOrder = {
                                    id: order.orderId,
                                    change: Date.now(),
                                    status: order.orderStatus,
                                }
                                dispatch(cancelActiveOrder({id: order.orderId}))
                                dispatch(setOrder(orderCh));
                                
                                const orders = getState().ordersReducer.orders;
                                DBService.changeOrder(orders);
                                break;

                            case ServerMessageType.marketDataUpdate:
                                console.log('marketDataUpdate:', data.message);

                                const marketData = data.message as MarketDataUpdate
                                dispatch(setPrice(marketData.quotes[0]))
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
