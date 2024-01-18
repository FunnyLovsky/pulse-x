import {AuthActionCreators} from './auth/actionCreators'
import { SocketActionCreators } from './socket/actionCreators'

export const allActionCreators = {
    ...AuthActionCreators,
    ...SocketActionCreators
}