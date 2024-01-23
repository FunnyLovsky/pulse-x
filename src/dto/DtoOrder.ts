import { ClientEnvelope, PlaceOrder } from '../Models/ClientMessages';
import { IOrder } from '../Models/IOrder';
import { ClientMessageType } from '../api/Enums';

export const DtoOrder = (order: IOrder) => {
    const { amount, instrument, price, id, side } = order;
    return {
        messageType: ClientMessageType.placeOrder,
        message: {
            orderId: id,
            amount,
            instrument,
            price,
            side,
        } as PlaceOrder,
    } as ClientEnvelope;
};
