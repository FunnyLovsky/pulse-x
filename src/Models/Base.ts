import { ClientMessage } from './ClientMessages';
import { ServerMessage } from './ServerMessages';

export interface Envelope {
    messageType: ClientMessage | ServerMessage;
    message: Message;
}

export interface Message {}

export interface Quote {
    bid: number;
    offer: number;
}
