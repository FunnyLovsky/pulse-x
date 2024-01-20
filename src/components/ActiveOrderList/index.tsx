import { useActions } from '../../store/hooks/useActions';
import { useAppSelector } from '../../store/hooks/useAppSelector';
import styles from './style.module.scss';

const ActiveOrderList = () => {

    const { send, cancelOrder } = useActions()
    const { activeOrders } = useAppSelector(state => state.ordersReducer);

    const cancelHandler = (id: string) => {
        cancelOrder(id)
        send({id})
    }

    return(
        <div className={styles.inner}>
            <h2 className={styles.title}>Активне заявки</h2>

            {activeOrders.map(order => 
                <div className={styles.item} key={order.id}>
                    <p>#{order.id}</p>
                    <button onClick={() => cancelHandler(order.id)}>Cancel</button>
                </div>
            )}
        </div>
    )
};

export default ActiveOrderList;