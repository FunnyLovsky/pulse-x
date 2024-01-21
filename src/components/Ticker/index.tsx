import { useState } from 'react';
import { useActions } from '../../store/hooks/useActions';
import styles from './style.module.scss';
import ActiveOrderList from '../ActiveOrderList';
import { ClientMessageType, OrderSide } from '../../api/Enums';
import { formatNumber } from '../../utils/formatNumber';
import { useSetAmount } from './hooks/useSetAmount';


const Ticker = () => {
    const {amount, setAmount, setInputAmount} = useSetAmount('10')
    const [instrument, setInstrument] = useState('');
    const priceBuy = 8.34;
    const priceSell = 3.44

    const { send, createOrder } = useActions()

    const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setInstrument(e.target.value)

        send({
            messageType: ClientMessageType.subscribeMarketData,
            message: {
                instrument: e.target.value
            }
        })
       
    }
    
    const placeOrder = (side: number, price: number) => {
        const order = {
            side,
            price,
            amount: Number(amount.replace(/\s/g, '')),
            instrument: Number(instrument)
        }
        createOrder(order);
        send({
            messageType: ClientMessageType.placeOrder,
            message: {
                amount: amount.replace(/\s/g, ''),
                instrument: instrument,
                price,
                side
            }
        })
        setInstrument('');
        setAmount('10')
    }

    const getPrice = (price: number) => {
        const amountFormat = Number(amount.replace(/\s/g, ''));
        return formatNumber(amountFormat * price);
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
                    onChange={setInputAmount}
                    placeholder='Введите объем'
                />

                {instrument && (
                    <>
                        <div className={[styles.item, styles.buy].join(' ')}>
                            <p>{getPrice(priceBuy)}</p>
                            <button onClick={() => placeOrder(OrderSide.buy, priceBuy)}>Buy</button>
                        </div>
                        <div className={[styles.item, styles.sell].join(' ')}>
                            <p>{getPrice(priceSell)}</p>
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