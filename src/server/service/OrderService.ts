import { CancelOrder, ClientEnvelope, PlaceOrder } from '../../Models/ClientMessages';
import { ExecutionReport, ServerEnvelope } from '../../Models/ServerMessages';
import { OrderStatus, ServerMessageType } from '../../api/Enums';
import { IController, IWSServer } from '../types/type';
import { valueGenerate } from '../utils/QuoteGenerate';

export class OrderService {
    static placeOrder(
        data: ClientEnvelope,
        orderControllers: IController[],
        onmessage: (data: string) => void,
    ) {
        const { orderId } = data.message as PlaceOrder;
        const controller = new AbortController();

        orderControllers.push({ orderId, controller });

        new Promise<ServerEnvelope>((resolve, reject) => {
            const timeoutId = setTimeout(
                () => {
                    resolve(this.createOrder(orderId));
                },
                valueGenerate(10, 15) * 1000,
            );

            controller.signal.addEventListener('abort', () => {
                clearTimeout(timeoutId);
                reject(new Error('Запрос отменен'));
            });
        })
            .then((result) => onmessage(JSON.stringify(result)))
            .catch(() => console.log('WSServer: abort'))
            .finally(
                () =>
                    (orderControllers = orderControllers.filter(
                        (item) => orderId !== item.orderId,
                    )),
            );
    }

    static createOrder(orderId: string) {
        const orderStatus = Math.random() >= 0.5 ? OrderStatus.filled : OrderStatus.rejected;

        return {
            messageType: ServerMessageType.executionReport,
            message: {
                orderId,
                orderStatus,
            } as ExecutionReport,
        } as ServerEnvelope;
    }

    static cancelOrder(
        data: ClientEnvelope,
        cancel: (id: string) => Promise<void>,
        obj: IWSServer,
    ) {
        const { orderId } = data.message as CancelOrder;
        const boundCancel = cancel.bind(obj);
        boundCancel(orderId);
    }
}
