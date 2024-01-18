import { setError, setIsLoading, setSocket } from "."
import { AppDispatch, RootState } from "../.."


const connect = () => async (dispath: AppDispatch) => {
    dispath(setIsLoading(true));

    try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const socket = new WebSocket('wss://socketsbay.com/wss/v2/1/demo/');
        
        socket.onopen = () => {
            dispath(setSocket(socket))
            dispath(setIsLoading(false));
        }

        socket.onerror = (error: any) => {
            dispath(setError(error))
        }

        socket.onclose = () => {
            dispath(setSocket(null))
        }

    } catch (error: any) {
        dispath(setError(error.message))
    }   
}

const send = (data: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const { socket } = getState().socketReducer; 
  
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(data));
      } else {
        dispatch(setError('Соединение не открыто'))
      }
  
    } catch (error: any) {
        dispatch(setError(error.message))
    }
};

const disconnect = () => async (dispath: AppDispatch, getState: () => RootState) => {
    const { socket } = getState().socketReducer;

    if (socket && socket.readyState !== WebSocket.CLOSED) {
        socket.close();
    }

    dispath(setSocket(null)) 
}

export const SocketActionCreators = {
    connect,
    send,
    disconnect
}