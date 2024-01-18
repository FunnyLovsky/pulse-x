import Order from '../Order';
import Container from '../ui/Container';
import styles from './style.module.scss';


const OrderList = () => {
    const orders = [
        {id: `f${(+new Date()).toString(16)}`, create: Date.now(), change: Date.now(), status: 1, side: 1, price: 8.230, amount: 1000000, instrument: 1},
        {id: `f${(+new Date()).toString(16)}`, create: Date.now(), change: Date.now(), status: 2, side: 2, price: 4.030, amount: 10000, instrument: 2},
        {id: `f${(+new Date()).toString(16)}`, create: Date.now(), change: Date.now(), status: 3, side: 1, price: 10.109, amount: 10000, instrument: 3},
        {id: `f${(+new Date()).toString(16)}`, create: Date.now(), change: Date.now(), status: 4, side: 2, price: 4.034, amount: 10000, instrument: 3}
    ]
    return(
        <Container>
            <div className={styles.inner}>
                <h2 className={styles.title}>Список заявок</h2>
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
                <div className={styles.list}>
                    {orders.map(order => 
                        <Order 
                            key={order.id}
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

        </Container>

    )
};

export default OrderList;