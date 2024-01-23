import { IOrder } from '../Models/IOrder';

export class DBService {
    static async createOrder(order: IOrder) {
        const orders = localStorage.getItem('orders') || '[]';
        const json: IOrder[] = JSON.parse(orders);
        json.push(order);
        localStorage.setItem('orders', JSON.stringify(json));
    }

    static async changeOrder(orders: IOrder[]) {
        localStorage.setItem('orders', JSON.stringify(orders));
    }

    static async deleteOrder(id: string) {
        const orders = localStorage.getItem('orders') || '[]';
        const json: IOrder[] = JSON.parse(orders);
        const clear = json.filter((order) => order.id !== id);
        localStorage.setItem('orders', JSON.stringify(clear));
    }

    static async fetchOrders() {
        const orders = localStorage.getItem('orders') || '[]';
        const json: IOrder[] = JSON.parse(orders);
        return json;
    }
}
