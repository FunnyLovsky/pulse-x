import { FC } from 'react';
import styles from './style.module.scss';
import { formatDate } from '../../utils/formatDate';
import { getStatus } from './utils/getStatus';
import { getSide } from './utils/getSide';
import { formatInstrument } from '../../utils/formatInstrument';
import ARROWS from '../../assets/arrows.svg';
import { formatNumber } from '../../utils/formatNumber';
import { IOrder } from '../../Models/IOrder';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useActions } from '../../store/hooks/useActions';

const Order: FC<IOrder> = ({
    id,
    create,
    change,
    status,
    side,
    amount,
    instrument,
    price,
}) => {
    const [createDate, createTime] = formatDate(create);
    const [changeDate, changeTime] = formatDate(change);
    const orderStatus = getStatus(status);
    const styleStatus = [styles.status, styles[orderStatus!]].join(' ');
    const orderSide = getSide(side);
    const [firsIn, secondIn] = formatInstrument(instrument);

    const { clearOrder } = useActions();

    return (
        <div className={styles.order}>
            <div className={styles.item}>
                <p className={styles.id}>#{id}</p>
            </div>

            <div className={styles.item}>
                <p className={styles.date}>
                    <span>{createDate}</span> <span>{createTime}</span>
                </p>
            </div>

            <div className={styles.item}>
                <p className={styles.date}>
                    <span>{changeDate}</span> <span>{changeTime}</span>
                </p>
            </div>

            <div className={styles.item}>
                <p className={styleStatus}>{orderStatus}</p>
            </div>

            <div className={styles.item}>
                <p className={styles[orderSide!]}>{orderSide}</p>
            </div>

            <div className={styles.item}>
                <p className={styles.price}>{price.toFixed(3)}</p>
            </div>

            <div className={styles.item}>
                <p className={styles.price}>{formatNumber(amount)}</p>
            </div>

            <div className={styles.item}>
                <p className={styles.instrument}>
                    <span>{firsIn}</span>
                    <img src={ARROWS} alt="" />
                    <span>{secondIn}</span>
                </p>
            </div>

            <button className={styles.del} onClick={() => clearOrder(id)}>
                <RiDeleteBin6Line />
            </button>
        </div>
    );
};

export default Order;
