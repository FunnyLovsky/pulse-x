import { Quote } from '../../Models/Base';
import {
    ClientEnvelope,
    SubscribeMarketData,
    UnsubscribeMarketData,
} from '../../Models/ClientMessages';
import {
    ErrorInfo,
    MarketDataUpdate,
    ServerEnvelope,
    SuccessInfo,
} from '../../Models/ServerMessages';
import { Instrument, ServerMessageType } from '../../api/Enums';
import { valueGenerate } from '../utils/QuoteGenerate';
import { UUIDGenerator } from '../utils/UUIDGenerate';

class MarketService {
    subscriptionId: string | null;
    instrument: Instrument | null;

    constructor() {
        this.subscriptionId = null;
        this.instrument = null;
    }

    subscribeMarketData(data: ClientEnvelope, onmessage: (data: string) => void) {
        const { instrument } = data.message as SubscribeMarketData;
        this.instrument = instrument;

        if (Math.random() <= 0.15) {
            const message = {
                messageType: ServerMessageType.error,
                message: {
                    reason: 'Ошибка с подключением к биржевому серверу.',
                } as ErrorInfo,
            } as ServerEnvelope;

            onmessage(JSON.stringify(message));
        } else {
            this.subscriptionId = UUIDGenerator.generate();
            const message = {
                messageType: ServerMessageType.success,
                message: {
                    subscriptionId: this.subscriptionId,
                } as SuccessInfo,
            } as ServerEnvelope;

            onmessage(JSON.stringify(message));

            onmessage(JSON.stringify(this.marketDataUpdate()));
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
                        offer: valueGenerate(2, 10),
                    } as Quote,
                ],
            } as MarketDataUpdate,
        } as ServerEnvelope;
    }

    unsubscribeMarketData(data: ClientEnvelope) {
        const { subscriptionId } = data.message as UnsubscribeMarketData;

        if (subscriptionId === this.subscriptionId) {
            this.subscriptionId = null;
        }
    }
}

export default new MarketService();
