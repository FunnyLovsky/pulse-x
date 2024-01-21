
import { Quote } from "../../Models/Base";
import { ErrorInfo, MarketDataUpdate, ServerEnvelope, SuccessInfo } from "../../Models/ServerMessages";
import { Instrument, ServerMessageType } from "../../api/Enums";
import { UUIDGenerator } from "../utils/UUIDGenerate";

class StockService {
    subscriptionId: string | null;
    instrument: Instrument | null;

    constructor() {
        this.subscriptionId = null;
        this.instrument = null
    }

    subscribeMarketData(instrument: Instrument) {
        this.instrument = instrument;

        if (Math.random() <= 0.15) {
            return {
                messageType: ServerMessageType.error,
                message: {
                    reason: 'Ошибка с подключением к биржевому серверу.'
                } as ErrorInfo
            } as ServerEnvelope;

        } else {
            this.subscriptionId = UUIDGenerator.generate();

            return {
                messageType: ServerMessageType.success,
                message: {
                    subscriptionId: this.subscriptionId,
                } as SuccessInfo
            } as ServerEnvelope;
        }
    }

    marketDataUpdate() {

        const generateValue = (min: number, max: number) => {
            return Math.random() * (max - min) + min;
        };
        
        return {
            messageType: ServerMessageType.marketDataUpdate,
            message: {
                subscriptionId: this.subscriptionId,
                instrument: this.instrument,
                quotes: [
                    {
                        bid: generateValue(2, 10),
                        offer: generateValue(2, 10)
                    } as Quote
                ] 
            } as MarketDataUpdate
        } as ServerEnvelope
    }
}

export default new StockService()