import { setError, setIsLoading, setPrice, setSubscriptionId } from '.';
import { AppDispatch } from '../..';
import { ClientMessageType, Instrument } from '../../../api/Enums';
import { send } from '../socket/actionCreators';

const subscribe = (instrument: Instrument) => async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true));
    dispatch(setError(null));

    dispatch(
        send({
            messageType: ClientMessageType.subscribeMarketData,
            message: {
                instrument,
            },
        }),
    );
};

const unsubscribe = (subscriptionId: string) => async (dispatch: AppDispatch) => {
    dispatch(
        send({
            messageType: ClientMessageType.unsubscribeMarketData,
            message: {
                subscriptionId,
            },
        }),
    );
    dispatch(setSubscriptionId(null));
    dispatch(setPrice({ bid: 0, offer: 0 }));
};

export const MarketActionCreators = {
    subscribe,
    unsubscribe,
};
