import {
    addActiveOrders,
    addOrders,
    cancelActiveOrder,
    deleteOrder,
    placeActiveOrder,
    placeOrder,
    setOrder,
} from '.';
import { AppDispatch, RootState } from '../..';
import { IChangeOrder, IOrder } from '../../../Models/IOrder';
import { DBService } from '../../../api/DBService';
import { ClientMessageType, OrderStatus } from '../../../api/Enums';
import { DtoOrder } from '../../../dto/DtoOrder';
import { sendMessage } from '../socket';

interface Order {
    side: number;
    price: number;
    amount: number;
    instrument: number;
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
            instrument: obj.instrument,
        };
        dispatch(sendMessage(DtoOrder(order)));
        dispatch(placeOrder(order));
        dispatch(placeActiveOrder({ id: order.id }));

        await DBService.createOrder(order);
    } catch (error: any) {
        console.log(error.message);
    }
};

export const changeStatusOrder =
    (id: string, status: OrderStatus) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const order: IChangeOrder = {
                id,
                change: Date.now(),
                status,
            };

            if (status === OrderStatus.cancelled) {
                dispatch(cancelActiveOrder({ id }));
                dispatch(
                    sendMessage({
                        messageType: ClientMessageType.cancelOrder,
                        message: {
                            orderId: id,
                        },
                    }),
                );
            }

            dispatch(setOrder(order));

            const orders = getState().ordersReducer.orders;
            await DBService.changeOrder(orders);
        } catch (error: any) {
            console.log(error.message);
        }
    };

const clearOrder = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(deleteOrder({ id }));
        dispatch(cancelActiveOrder({ id }));

        await DBService.deleteOrder(id);
    } catch (error: any) {
        console.log(error.message);
    }
};

const fetchOrders = () => async (dispatch: AppDispatch) => {
    try {
        const json = await DBService.fetchOrders();
        const active = json.filter((order) => order.status === OrderStatus.active);

        dispatch(addActiveOrders(active));
        dispatch(addOrders(json));
    } catch (error: any) {
        console.log(error.message);
    }
};

export const OrderActionCreators = {
    createOrder,
    changeStatusOrder,
    clearOrder,
    fetchOrders,
};
