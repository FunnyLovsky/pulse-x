import { useState } from 'react';
import { useActions } from '../../store/hooks/useActions';
import styles from './style.module.scss';
import ActiveOrderList from '../ActiveOrderList';
import { OrderSide } from '../../api/Enums';

const Ticker = () => {
    const [amount, setAmount] = useState('10')
    const [instrument, setInstrument] = useState('');
    const priceBuy = 8.34;
    const priceSell = 3.44

    const { send, createOrder } = useActions()

    const reset = () => {
        setInstrument('');
        setAmount('10')
    }

    const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(instrument) {
            // получение котировок
        }

        setInstrument(e.target.value)
    }

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        if (/^\d*$/.test(inputValue)) {
            setAmount(inputValue);
        }
    }

    const placeOrder = (side: number, price: number) => {
        const order = {
            side,
            price,
            amount: Number(amount),
            instrument: Number(instrument)
        }
        createOrder(order);
        send(order)
        reset()
    }

    return(
        <div className={styles.cont}>
            <div className={styles.inner}>
                <h2 className={styles.title}>Тикер</h2>

                <select name="sasa" value={instrument} onChange={selectHandler}>
                    <option disabled value=''>Выберите иструмент</option>
                    <option value="1">EUR / USD</option>
                    <option value="2">EUR / RUB</option>
                    <option value="3">USD / RUB</option>
                </select>

                <input 
                    type='text' 
                    value={amount} 
                    onChange={inputHandler}
                    placeholder='Введите объем'
                />

                {instrument && (
                    <>
                        <div className={[styles.item, styles.buy].join(' ')}>
                            <p>{(+amount * priceBuy).toFixed(2)}</p>
                            <button onClick={() => placeOrder(OrderSide.buy, priceBuy)}>Buy</button>
                        </div>
                        <div className={[styles.item, styles.sell].join(' ')}>
                            <p>{(+amount * priceSell).toFixed(2)}</p>
                            <button onClick={() => placeOrder(OrderSide.sell, priceSell)}>Sell</button>
                        </div>
                    </>
                )}
            </div>
            <ActiveOrderList/>
        </div>

    )
};

export default Ticker;