import { disconnectedSocket, sendMessage, connectSocket, connecting } from '.';
import { AppDispatch } from '../..';
import { ClientEnvelope } from '../../../Models/ClientMessages';

export const connect = () => async (dispath: AppDispatch) => {
    dispath(connecting());
    dispath(connectSocket());
};

export const send = (data: ClientEnvelope) => async (dispatch: AppDispatch) => {
    dispatch(sendMessage(JSON.stringify(data)));
};

const disconnect = () => async (dispath: AppDispatch) => {
    dispath(disconnectedSocket());
};

export const SocketActionCreators = {
    connect,
    send,
    disconnect,
};
