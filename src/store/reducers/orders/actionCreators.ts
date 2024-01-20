import { cancelActiveOrder, placeActiveOrder, placeOrder, setOrder } from ".";
import { AppDispatch } from "../..";
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
        dispatch(placeActiveOrder({id: order.id}))
    } catch (error: any) {
        console.log(error.message)
    }
}

const cancelOrder = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const cancelledOrder: IChangeOrder= {
            id,
            change: Date.now(),
            status: OrderStatus.cancelled
        }
        dispatch(cancelActiveOrder({id}))
        dispatch(setOrder(cancelledOrder))
    } catch (error) {
        
    }
}

export const OrderActionCreators = {
    createOrder,
    cancelOrder
}