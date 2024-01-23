import { SortType } from '../../api/Enums';
import { useAppSelector } from '../../store/hooks/useAppSelector';
import Order from '../Order';

import styles from './style.module.scss';
import SortName from '../ui/SortName';
import { useSortOrders } from './utils/useSortOrders';

const OrderList = () => {
    const { orders } = useAppSelector((state) => state.ordersReducer);

    const sortCreateHandler = useSortOrders(SortType.create);
    const sortChangeHandler = useSortOrders(SortType.change);
    const sortPriceHandler = useSortOrders(SortType.price);
    const sortAmountHandler = useSortOrders(SortType.amount);

    return (
        <div className={styles.inner}>
            <h2 className={styles.title}>Список заявок</h2>

            <div className={styles.cont}>
                <div className={styles.header}>
                    <div>ID</div>
                    <SortName onClick={sortCreateHandler}>Создано</SortName>
                    <SortName onClick={sortChangeHandler}>Изменено</SortName>
                    <div>Статус</div>
                    <div>Сторона</div>
                    <SortName onClick={sortPriceHandler}>Цена</SortName>
                    <SortName onClick={sortAmountHandler}>Объем</SortName>
                    <div>Инструмент</div>
                </div>
                <div className={styles.list}>
                    {orders.length > 0 ? (
                        orders.map((order, index) => (
                            <Order
                                key={order.id + index}
                                id={order.id}
                                create={order.create}
                                change={order.change}
                                status={order.status}
                                side={order.side}
                                amount={order.amount}
                                price={order.price}
                                instrument={order.instrument}
                            />
                        ))
                    ) : (
                        <h2 className={styles.cap}>Ваш список заявок пуст.</h2>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderList;
