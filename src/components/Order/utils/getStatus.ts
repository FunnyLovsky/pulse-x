import { OrderStatus } from "../../../api/Enums"

export const getStatus = (status: number) => {
    switch (status) {
        case OrderStatus.active:
            return 'Active'
        case OrderStatus.filled:
            return 'Filled'
        case OrderStatus.rejected:
            return 'Rejected'
        case OrderStatus.cancelled:
            return 'Cancelled'
        default:
            break;
    }
}