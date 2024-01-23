import { useState } from 'react';
import { useActions } from '../../store/hooks/useActions';
import styles from './style.module.scss';
import ActiveOrderList from '../ActiveOrderList';
import { OrderSide } from '../../api/Enums';
import { formatNumber } from '../../utils/formatNumber';
import { useSetAmount } from './hooks/useSetAmount';
import { useAppSelector } from '../../store/hooks/useAppSelector';

const Ticker = () => {
    const { amount, setInputAmount } = useSetAmount('10');
    const [instrument, setInstrument] = useState('');
    const { subscriptionId, bid, offer, isLoading, error } = useAppSelector(
        (state) => state.marketReducer,
    );
    const { createOrder, subscribe, unsubscribe } = useActions();

    const disabled = Boolean(error);

    const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setInstrument(e.target.value);

        if (subscriptionId) {
            unsubscribe(subscriptionId);
        }

        subscribe(+e.target.value);
    };

    const placeOrder = (side: number, price: number) => {
        const order = {
            side,
            price,
            amount: Number(amount.replace(/\s/g, '')),
            instrument: Number(instrument),
        };
        createOrder(order);
    };

    const getPrice = (price: number) => {
        const amountFormat = Number(amount.replace(/\s/g, ''));
        return formatNumber(amountFormat * price);
    };

    return (
        <div className={styles.cont}>
            <div className={styles.inner}>
                <h2 className={styles.title}>Тикер</h2>

                <select name="sasa" value={instrument} onChange={selectHandler}>
                    <option disabled value="">
                        Выберите иструмент
                    </option>
                    <option value="1">EUR / USD</option>
                    <option value="2">EUR / RUB</option>
                    <option value="3">USD / RUB</option>
                </select>

                <input
                    type="text"
                    value={amount}
                    onChange={setInputAmount}
                    placeholder="Введите объем"
                    disabled={disabled}
                    className={disabled ? styles.disabled : undefined}
                />

                {instrument && (
                    <>
                        <div className={[styles.item, styles.buy].join(' ')}>
                            <p className={disabled ? styles.disabled : undefined}>
                                {isLoading ? (
                                    <span className={styles.loader_g}></span>
                                ) : (
                                    getPrice(bid)
                                )}
                            </p>
                            <button
                                onClick={() => placeOrder(OrderSide.buy, bid)}
                                disabled={disabled || isLoading}
                                className={disabled ? styles.disabled : undefined}
                            >
                                Buy
                            </button>
                        </div>
                        <div className={[styles.item, styles.sell].join(' ')}>
                            <p className={disabled ? styles.disabled : undefined}>
                                {isLoading ? (
                                    <span className={styles.loader_r}></span>
                                ) : (
                                    getPrice(offer)
                                )}
                            </p>
                            <button
                                onClick={() => placeOrder(OrderSide.sell, offer)}
                                disabled={disabled || isLoading}
                                className={disabled ? styles.disabled : undefined}
                            >
                                Sell
                            </button>
                        </div>
                    </>
                )}
            </div>
            <ActiveOrderList />
        </div>
    );
};

export default Ticker;
