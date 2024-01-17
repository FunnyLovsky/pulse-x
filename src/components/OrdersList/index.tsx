import Container from '../ui/Container';
import styles from './style.module.scss';


const OrderList = () => {
    return(
        <Container>
            <div className={styles.inner}>
                <h2 className="title">Список заявок</h2>
            </div>
        </Container>

    )
};

export default OrderList;