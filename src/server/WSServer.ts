import { ClientEnvelope } from '../Models/ClientMessages';
import { ClientMessageType } from '../api/Enums';
import { OrderService } from './service/OrderService';
import MarketService from './service/MarketService';
import { IController } from './types/type';

export class WSServer {
    url: string;
    readyState: number = WebSocket.CONNECTING;
    private orderControllers: IController[] = [];
    onopen: (() => void) | null = null;
    onmessage: ((event: string) => void) | null = null;
    onclose: (() => void) | null = null;
    onerror: ((error: Error) => void) | null = null;

    constructor(url: string) {
        this.url = url;

        setTimeout(() => {
            this.readyState = WebSocket.OPEN;

            if (this.onopen && this.onmessage) {
                this.onopen();
            }
        }, 1000);
    }

    async close() {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.readyState = WebSocket.CLOSED;

        if (this.onclose) {
            this.onclose();
        }
    }

    async cancelPlaceOrder(id: string) {
        this.orderControllers.forEach((item) => {
            if (id === item.orderId) {
                item.controller?.abort();
            }
        });
    }

    async send(event: string) {
        if (!this.onmessage) {
            return;
        }

        const data: ClientEnvelope = JSON.parse(event);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        switch (data.messageType) {
            case ClientMessageType.subscribeMarketData:
                MarketService.subscribeMarketData(data, this.onmessage);

                break;

            case ClientMessageType.unsubscribeMarketData:
                MarketService.unsubscribeMarketData(data);

                break;

            case ClientMessageType.cancelOrder:
                OrderService.cancelOrder(data, this.cancelPlaceOrder, this);

                break;

            case ClientMessageType.placeOrder:
                OrderService.placeOrder(data, this.orderControllers, this.onmessage);

                break;

            default:
                if (this.onerror) {
                    this.onerror(new Error('Неизвестный запрос'));
                }

                break;
        }
    }
}
