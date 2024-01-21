import { ClientEnvelope, PlaceOrder, SubscribeMarketData, UnsubscribeMarketData } from "../Models/ClientMessages";
import { ServerEnvelope } from "../Models/ServerMessages";
import { ClientMessageType, ServerMessageType} from "../api/Enums";
import StockService from "./service/StockService";
import { valueGenerate } from "./utils/QuoteGenerate";

export class WSServer {
    url: string;
    readyState: number = WebSocket.CONNECTING;
    onopen: (() => void) | null = null;
    onmessage: ((event: string) => void) | null = null;
    onclose: (() => void) | null = null;
    onerror: ((error: Error) => void) | null = null;

    constructor(url: string) {
        this.url = url;

        setTimeout(() => {
            this.readyState = WebSocket.OPEN;

            if(this.onopen && this.onmessage) {
                this.onopen()
            }
        }, 1000);
    }

    async close() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.readyState = WebSocket.CLOSED;

        if(this.onclose) {
            this.onclose()
        }
    }

    async send(event: string) {
        if(!this.onmessage) { 
            return 
        }

        const data: ClientEnvelope= JSON.parse(event)

        await new Promise(resolve => setTimeout(resolve, 1000));
        
        switch (data.messageType) {
            case ClientMessageType.subscribeMarketData:
                    const message = StockService.subscribeMarketData(data.message as SubscribeMarketData);

                    this.onmessage(JSON.stringify(message));

                    if(message.messageType === ServerMessageType.success) {
                        this.onmessage(JSON.stringify(StockService.marketDataUpdate()))
                    }

                break;

            case ClientMessageType.unsubscribeMarketData:
                    StockService.unsubscribeMarketData(data.message as UnsubscribeMarketData)
                break;
            
            case ClientMessageType.placeOrder:
                    new Promise<ServerEnvelope>(resolve => {
                        setTimeout(() => {
                            resolve(StockService.placeOrder(data.message as PlaceOrder))
                        }, valueGenerate(5, 8) * 1000);
                    }).then(
                        result => this.onmessage!(JSON.stringify(result))
                    )
                break;

            default:
                break;
        }



        if(0) {
            if(this.onerror) {
                this.onerror(new Error('Ошибка соединения'))
            }
        }

    }
}