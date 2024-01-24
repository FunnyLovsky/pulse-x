export interface IOrder {
    id: string;
    create: number;
    change: number;
    status: number;
    side: number;
    price: number;
    amount: number;
    instrument: number;
}

export interface IActiveOrder {
    id: string;
}

export interface IChangeOrder {
    id: string;
    change: number;
    status: number;
}
