export enum ClientMessageType {
    subscribeMarketData = 1,
    unsubscribeMarketData,
    placeOrder,
    cancelOrder,
}

export enum ServerMessageType {
    success = 1,
    error,
    executionReport,
    marketDataUpdate,
}

export enum OrderSide {
    buy = 1,
    sell,
}

export enum OrderStatus {
    active = 1,
    filled,
    rejected,
    cancelled,
}

export enum Instrument {
    eur_usd = 1,
    eur_rub,
    usd_rub,
}

export enum VariantSort {
    min_max = 1,
    max_min,
}

export enum SortType {
    create = 'create',
    change = 'change',
    price = 'price',
    amount = 'amount',
}
