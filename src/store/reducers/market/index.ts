import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Instrument } from "../../../api/Enums"
import { Quote } from "../../../Models/Base"

interface MarketState {
    subscriptionId: string | null,
    instrument: Instrument | null,
    bid: number
    offer: number,
    isLoading: boolean,
    error: string | null
}


const initialState: MarketState = {
    subscriptionId: null,
    instrument: null,
    bid: 0,
    offer: 0,
    error: null,
    isLoading: false
}

const marketReducer = createSlice({
    name: 'market',
    initialState,
    reducers: {
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },

        setPrice(state, action: PayloadAction<Quote>) {
            state.bid = action.payload.bid;
            state.offer = action.payload.offer;
        },
        
        setSubscriptionId(state, action: PayloadAction<string | null>) {
            state.subscriptionId = action.payload
        },

        succesSub(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.subscriptionId = action.payload
        }
    }
})

export const {setIsLoading, setPrice, setSubscriptionId, succesSub} = marketReducer.actions

export default marketReducer.reducer