import { setIsLoading, connectedSocket, disconnectedSocket, sendMessage} from "."
import { AppDispatch } from "../.."


const connect = () => async (dispath: AppDispatch) => {
    dispath(setIsLoading(true));

    // await new Promise(resolve => setTimeout(resolve, 1000)); 
    
    dispath(connectedSocket());
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