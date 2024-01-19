import { useActions } from '../../store/hooks/useActions';
import styles from './style.module.scss';

const Ticker = () => {
    const {send} = useActions()
    return(
        <div className={styles.cont}>
            <div className={styles.inner}>
                <h2 className={styles.title}>Тикер</h2>
                <select name="sasa" id="">
                    <option value="1">EUR / USD</option>
                    <option value="2">EUR / RUB</option>
                    <option value="3">USD / RUB</option>
                </select>
                <input type="text" />
                <div className={styles.item}>
                    <div className={styles.price}>8.20</div>
                    <button>Buy</button>
                </div>
                <div className={styles.item}>
                    <div className={styles.price}>8.20</div>
                    <button onClick={() => send('Websocke')}>Sell</button>
                </div>
            </div>
        </div>

    )
};

export default Ticker;