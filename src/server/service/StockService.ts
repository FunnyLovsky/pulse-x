
import { Quote } from "../../Models/Base";
import { PlaceOrder, SubscribeMarketData, UnsubscribeMarketData } from "../../Models/ClientMessages";
import { ErrorInfo, ExecutionReport, MarketDataUpdate, ServerEnvelope, SuccessInfo } from "../../Models/ServerMessages";
import { Instrument, OrderStatus, ServerMessageType } from "../../api/Enums";
import { valueGenerate } from "../utils/QuoteGenerate";
import { UUIDGenerator } from "../utils/UUIDGenerate";

class StockService {
    subscriptionId: string | null;
    instrument: Instrument | null;

    constructor() {
        this.subscriptionId = null;
        this.instrument = null
    }

    subscribeMarketData(message: SubscribeMarketData) {
        this.instrument = message.instrument;

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
        return {
            messageType: ServerMessageType.marketDataUpdate,
            message: {
                subscriptionId: this.subscriptionId,
                instrument: this.instrument,
                quotes: [
                    {
                        bid: valueGenerate(2, 10),
                        offer: valueGenerate(2, 10)
                    } as Quote
                ] 
            } as MarketDataUpdate
        } as ServerEnvelope
    }

    unsubscribeMarketData(message: UnsubscribeMarketData) {
        if(message.subscriptionId === this.subscriptionId) {
            this.subscriptionId = null;
        }
    }

    placeOrder(message: PlaceOrder) {
        const { orderId } = message;
        const orderStatus = Math.random() >= 0.5 ? OrderStatus.filled : OrderStatus.rejected;
        return {
            messageType: ServerMessageType.executionReport,
            message: {
                orderId,
                orderStatus
            } as ExecutionReport
        } as ServerEnvelope
    }
}

export default new StockService()