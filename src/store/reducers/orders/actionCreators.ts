import { addActiveOrders, addOrders, cancelActiveOrder, deleteOrder, placeActiveOrder, placeOrder, setOrder } from ".";
import { AppDispatch, RootState } from "../..";
import { IChangeOrder, IOrder } from "../../../Models/IOrder";
import { OrderStatus } from "../../../api/Enums";

interface Order {
    side: number, 
    price: number, 
    amount: number, 
    instrument: number
}

const createOrder = (obj: Order) => async (dispatch: AppDispatch) => {
    try {
        const order: IOrder = {
            id: `f${(+new Date()).toString(16)}`,
            create: Date.now(),
            change: Date.now(),
            status: OrderStatus.active,
            side: obj.side,
            price: obj.price,
            amount: obj.amount,
            instrument: obj.instrument
        }

        dispatch(placeOrder(order));
        dispatch(placeActiveOrder({id: order.id}));

        const orders = localStorage.getItem('orders') || '[]'
        const json: IOrder[] = JSON.parse(orders)
        json.push(order)
        localStorage.setItem('orders', JSON.stringify(json));
    } catch (error: any) {
        console.log(error.message)
    }
}

const cancelOrder = (id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
        const cancelledOrder: IChangeOrder= {
            id,
            change: Date.now(),
            status: OrderStatus.cancelled
        }
        dispatch(cancelActiveOrder({id}))
        dispatch(setOrder(cancelledOrder));
        
        const orders = getState().ordersReducer.orders;
        localStorage.setItem('orders', JSON.stringify(orders))
    } catch (error) {
        
    }
}

const clearOrder = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteOrder({id}))
        dispatch(cancelActiveOrder({id}));

        const orders = localStorage.getItem('orders') || '[]'
        const json: IOrder[] = JSON.parse(orders)
        const clear = json.filter(order => order.id !== id)
        localStorage.setItem('orders', JSON.stringify(clear));
    } catch (error) {
        
    }
}

const fetchOrders = () => async (dispatch: AppDispatch) => {
    try {
        const orders = localStorage.getItem('orders') || '[]'
        const json: IOrder[] = JSON.parse(orders);
        dispatch(addOrders(json));

        const active = json.filter(order => order.status === OrderStatus.active)
        dispatch(addActiveOrders(active))
    } catch (error) {
        
    }
}

export const OrderActionCreators = {
    createOrder,
    cancelOrder,
    clearOrder,
    fetchOrders
}