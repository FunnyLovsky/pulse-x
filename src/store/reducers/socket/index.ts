import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface SocketState {
    socket: WebSocket | null,
    error: null | string,
    isLoading: boolean
}

const initialState: SocketState = {
    socket: null,
    error: null,
    isLoading: false
}

const socketReducer = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setSocket(state, action: PayloadAction<WebSocket | null>) {
            state.socket = action.payload
        },

        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },
        
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
            state.isLoading = false;
        },
    }
})

export const {setError, setIsLoading, setSocket} = socketReducer.actions
export default socketReducer.reducer