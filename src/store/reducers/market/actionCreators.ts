import { setError, setIsLoading, setPrice, setSubscriptionId } from ".";
import { AppDispatch } from "../..";
import { ClientMessageType, Instrument } from "../../../api/Enums";
import { sendMessage } from "../socket";

const subscribe = (instrument: Instrument) => async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true));
    dispatch(setError(null))

    dispatch(sendMessage({
        messageType: ClientMessageType.subscribeMarketData,
        message: {
            instrument,
        }
    }))
}

const unsubscribe = (subscriptionId: string) => async (dispatch: AppDispatch) => {

    dispatch(sendMessage({
        messageType: ClientMessageType.unsubscribeMarketData,
        message: {
            subscriptionId,
        }
    }));
    dispatch(setSubscriptionId(null));
    dispatch(setPrice({bid: 0, offer: 0}))
}


export const MarketActionCreators = {
    subscribe,
    unsubscribe,
}