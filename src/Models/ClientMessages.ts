import {Envelope, Message} from "./Base";
import {ClientMessageType, Instrument, OrderSide} from "../api/Enums";


export interface ClientEnvelope extends Envelope {
    messageType: ClientMessageType
}

export interface ClientMessage extends Message {

}

export interface SubscribeMarketData extends ClientMessage {
    instrument: Instrument
}

export interface UnsubscribeMarketData extends ClientMessage {
    subscriptionId: string
}

export interface PlaceOrder extends ClientMessage {
    orderId: string
    instrument: Instrument
    side: OrderSide
    amount: number
    price: number
}

