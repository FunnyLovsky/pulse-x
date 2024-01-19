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
        connectSocket(state) {},
        
        disconnectedSocket(state) {},

        connecting(state) {
            state.isLoading = true;
        },

        connected(state) {
            state.isConnected = true;
            state.isLoading = false;
        },

        disconnected(state) {
            state.isConnected = false;
            state.isLoading = false;
            state.error = null;
        },
        
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
            state.isLoading = false;
        },

        sendMessage(state, action: PayloadAction<{}>) {
            state.message = action.payload
        }
    }
})

export const {setError, disconnectedSocket, sendMessage, connectSocket, connected, disconnected, connecting} = socketReducer.actions
export default socketReducer.reducer