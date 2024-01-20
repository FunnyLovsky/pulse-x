import { useAppSelector } from '../../store/hooks/useAppSelector';
import Order from '../Order';

import styles from './style.module.scss';


const OrderList = () => {
    const { orders } = useAppSelector(state => state.ordersReducer)

    return(
            <div className={styles.inner}>
                <h2 className={styles.title}>Список заявок</h2>

                <div className={styles.list}>
                    <div className={styles.header}>
                        <p>ID</p>
                        <p>Создано</p>
                        <p>Изменено</p>
                        <p>Статус</p>
                        <p>Сторона</p>
                        <p>Цена</p>
                        <p>Объем</p>
                        <p>Инструмент</p>
                    </div>
                    
                    {orders.map((order, index) => 
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
                    )}
                </div>

            </div>
    )
};

export default OrderList;