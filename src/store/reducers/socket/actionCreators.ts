import {  disconnectedSocket, sendMessage, connectSocket, connecting} from "."
import { AppDispatch } from "../.."


const connect = () => async (dispath: AppDispatch) => {
    dispath(connecting());
    dispath(connectSocket());
}

const send = (data: any) => async (dispatch: AppDispatch) => {
    dispatch(sendMessage(data))
};

const disconnect = () => async (dispath: AppDispatch) => {
    dispath(disconnectedSocket());
}

export const SocketActionCreators = {
    connect,
    send,
    disconnect
}