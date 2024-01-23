import { OrderSide } from '../../../api/Enums';

export const getSide = (side: number) => {
    switch (side) {
        case OrderSide.buy:
            return 'Buy';
        case OrderSide.sell:
            return 'Sell';
        default:
            break;
    }
};
