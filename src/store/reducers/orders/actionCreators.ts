import { addActiveOrders, addOrders, cancelActiveOrder, deleteOrder, placeActiveOrder, placeOrder, setOrder } from ".";
import { AppDispatch, RootState } from "../..";
import { IChangeOrder, IOrder } from "../../../Models/IOrder";
import { DBService } from "../../../api/DBService";
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

        await DBService.createOrder(order);
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
        await DBService.changeOrder(orders);
    } catch (error: any) {
        console.log(error.message)
    }
}

const clearOrder = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteOrder({id}))
        dispatch(cancelActiveOrder({id}));

        await DBService.deleteOrder(id)
    } catch (error: any) {
        console.log(error.message)
    }
}

const fetchOrders = () => async (dispatch: AppDispatch) => {
    try {
        const json = await DBService.fetchOrders()
        const active = json.filter(order => order.status === OrderStatus.active);
        
        dispatch(addActiveOrders(active));
        dispatch(addOrders(json));
    } catch (error: any) {
        console.log(error.message)
    }
}

export const OrderActionCreators = {
    createOrder,
    cancelOrder,
    clearOrder,
    fetchOrders
}