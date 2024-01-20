import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IActiveOrder, IChangeOrder, IOrder } from "../../../Models/IOrder";


interface OrderState {
    orders: IOrder[],
    activeOrders: IActiveOrder[],
}

const initialState: OrderState = {
    activeOrders: [],
    orders: []
}

const ordersReducer = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        placeOrder(state, action: PayloadAction<IOrder>) {
            state.orders.push(action.payload);
        },

        addOrders(state, action: PayloadAction<IOrder[]>) {
            state.orders = action.payload;
        },

        setOrder(state, action: PayloadAction<IChangeOrder>) {
            state.orders = state.orders.map(order =>
                order.id === action.payload.id
                    ? { ...order, status: action.payload.status, change: action.payload.change }
                    : order
            );
        },

        deleteOrder(state, action: PayloadAction<IActiveOrder>) {
            state.orders = state.orders.filter(order => 
                order.id !== action.payload.id
            )
        },

        placeActiveOrder(state, action: PayloadAction<IActiveOrder>) {
            state.activeOrders.push(action.payload)
        },

        cancelActiveOrder(state, action: PayloadAction<IActiveOrder>) {
            state.activeOrders = state.activeOrders.filter(order => 
                order.id !== action.payload.id
            )
        },

        addActiveOrders(state, action: PayloadAction<IActiveOrder[]>) {
            state.activeOrders = action.payload;
        },
    }
})

export const {
    placeActiveOrder, 
    addOrders, 
    cancelActiveOrder, 
    placeOrder, 
    setOrder, 
    addActiveOrders,
    deleteOrder
} = ordersReducer.actions

export default ordersReducer.reducer