import { createSlice } from "@reduxjs/toolkit"
import { Instrument } from "../../../api/Enums"

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
        setIsLoading(state) {
            
        }
    }
})

export default marketReducer.reducer