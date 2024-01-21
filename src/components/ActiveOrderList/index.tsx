import { OrderStatus } from '../../api/Enums';
import { useActions } from '../../store/hooks/useActions';
import { useAppSelector } from '../../store/hooks/useAppSelector';
import styles from './style.module.scss';

const ActiveOrderList = () => {

    const { changeStatusOrder } = useActions()
    const { activeOrders } = useAppSelector(state => state.ordersReducer);

    const cancelHandler = (id: string) => {
        changeStatusOrder(id, OrderStatus.cancelled)

    }

    return(
        <div className={styles.inner}>
            <h2 className={styles.title}>Активне заявки</h2>

            {activeOrders.length > 0 
                ?
                activeOrders.map(order => 
                    <div className={styles.item} key={order.id}>
                        <p>#{order.id}</p>
                        <button onClick={() => cancelHandler(order.id)}>Cancel</button>
                    </div>
                )
                :
                <p className={styles.cap}>У вас нет активных заявок</p>
            }
        </div>
    )
};

export default ActiveOrderList;