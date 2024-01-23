import { AuthActionCreators } from './auth/actionCreators';
import { MarketActionCreators } from './market/actionCreators';
import { OrderActionCreators } from './orders/actionCreators';
import { SocketActionCreators } from './socket/actionCreators';

export const allActionCreators = {
    ...AuthActionCreators,
    ...SocketActionCreators,
    ...OrderActionCreators,
    ...MarketActionCreators,
};
