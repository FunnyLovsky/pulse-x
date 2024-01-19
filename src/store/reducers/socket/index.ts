import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface SocketState {
    error: null | string,
    isLoading: boolean,
    isConnected: boolean,
    message: {} | null
}

const initialState: SocketState = {
    error: null,
    isLoading: false,
    isConnected: false,
    message: {}
}

const socketReducer = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        connectSocket(state) {
            state.isConnected = false;
            state.isLoading = true;
        },

        connectedSocket(state) {
            console.log('connected')
            state.isConnected = true;
            state.isLoading = false;
        },

        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },
        
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
            state.isLoading = false;
        },

        disconnectedSocket(state) {
            state.isConnected = false;
            state.message = null;
            state.error = null;
        },

        sendMessage(state, action: PayloadAction<{}>) {
            state.message = action.payload
        }
    }
})

export const {setError, setIsLoading, connectedSocket, disconnectedSocket, sendMessage, connectSocket} = socketReducer.actions
export default socketReducer.reducer