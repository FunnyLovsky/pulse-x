import { connected, disconnected } from '.';
import { AppDispatch, RootState } from '../..';
import { ErrorInfo, ExecutionReport, MarketDataUpdate, ServerEnvelope, SuccessInfo } from '../../../Models/ServerMessages';
import { ServerMessageType } from '../../../api/Enums';
import { IWSServer } from '../../../server/types/type';
import { setError, setIsLoading, setPrice, succesSub } from '../market';
import { changeStatusOrder } from '../orders/actionCreators';
import { connect } from './actionCreators';

export class WSService {
    dispatch: AppDispatch;
    getState: () => RootState;
    socket: IWSServer | null;

    constructor(dispatch: AppDispatch, getState: () => RootState, socket: IWSServer | null) {
        this.dispatch = dispatch;
        this.getState = getState;
        this.socket = socket;
    }

    open() {
        this.dispatch(connected());

        console.log('socket open');
    }

    close() {
        const { socketReducer } = this.getState();

        if (socketReducer.reconnecting) {
            this.dispatch(connect());
        } else {
            this.dispatch(disconnected());
            this.socket = null;
        }

        console.log('socket close');
    }

    error(error: any) {
        this.dispatch(disconnected());
        this.socket = null;

        console.log('socket error: ', error);
    }

    message(event: string) {
        const data: ServerEnvelope = JSON.parse(event);

        switch (data.messageType) {
            case ServerMessageType.success:
                const message = data.message as SuccessInfo;
                this.dispatch(succesSub(message.subscriptionId));

                console.log('succes:', data.message);
                break;

            case ServerMessageType.error:
                const error = data.message as ErrorInfo;
                this.dispatch(setIsLoading(false));
                this.dispatch(setError(error.reason));

                console.log('error:', data.message);
                break;

            case ServerMessageType.executionReport:
                const { orderId, orderStatus } = data.message as ExecutionReport;
                this.dispatch(changeStatusOrder(orderId, orderStatus));

                console.log('executionReport:', data.message);
                break;

            case ServerMessageType.marketDataUpdate:
                const marketData = data.message as MarketDataUpdate;
                this.dispatch(setPrice(marketData.quotes[0]));

                console.log('marketDataUpdate:', data.message);
                break;

            default:
                break;
        }
    }
}
