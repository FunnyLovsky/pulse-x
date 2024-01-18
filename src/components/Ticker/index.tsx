import styles from './style.module.scss';

const Ticker = () => {
    return(
        <div className={styles.cont}>
            <div className={styles.inner}>
                <h2 className={styles.title}>Тикер</h2>
                <select name="sasa" id="">
                    <option value="1">EUR / USD</option>
                    <option value="2">EUR / RUB</option>
                    <option value="3">USD / RUB</option>
                </select>
                <input type="text" value={1}/>
                <div className={styles.item}>
                    <div className={styles.price}>8.20</div>
                    <button>Buy</button>
                </div>
                <div className={styles.item}>
                    <div className={styles.price}>8.20</div>
                    <button>Sell</button>
                </div>
            </div>
        </div>

    )
};

export default Ticker;