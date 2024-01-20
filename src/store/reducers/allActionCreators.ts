import {AuthActionCreators} from './auth/actionCreators'
import { OrderActionCreators } from './orders/actionCreators'
import { SocketActionCreators } from './socket/actionCreators'


export const allActionCreators = {
    ...AuthActionCreators,
    ...SocketActionCreators,
    ...OrderActionCreators
}