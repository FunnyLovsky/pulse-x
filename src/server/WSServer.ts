import { ClientEnvelope } from "../Models/ClientMessages";
import { ServerEnvelope } from "../Models/ServerMessages";
import { ClientMessageType, Instrument, ServerMessageType} from "../api/Enums";
import StockService from "./service/StockService";

export class WSServer {
    url: string;
    readyState: number = WebSocket.CONNECTING;
    onopen: (() => void) | null = null;
    onmessage: ((event: ServerEnvelope) => void) | null = null;
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

    async send(data: ClientEnvelope) {
        if(!this.onmessage) { 
            return 
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        
        switch (data.messageType) {
            case ClientMessageType.subscribeMarketData:
                    const message = StockService.subscribeMarketData(data.message as Instrument);

                    this.onmessage(message);

                    if(message.messageType === ServerMessageType.success) {
                        this.onmessage(StockService.marketDataUpdate())
                    }

                break;

            case ClientMessageType.unsubscribeMarketData:
                
                break;
            
            case ClientMessageType.placeOrder:
                
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