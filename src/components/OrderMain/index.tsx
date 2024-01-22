/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import OrderList from '../OrdersList';
import Ticker from '../Ticker';
import Container from '../ui/Container';
import styles from './style.module.scss';
import { useActions } from '../../store/hooks/useActions';
import { useAppSelector } from '../../store/hooks/useAppSelector';

const OrderMain = () => {
    const {connect, fetchOrders} = useActions()
    const {isConnected, isLoading} = useAppSelector(state => state.socketReducer)
    const {error} = useAppSelector(state => state.marketReducer)

    useEffect(() => {
        fetchOrders();
    }, [])

    if(isLoading) {
        return(
            <Container>
                <h1 className={styles.load}>
                    <div className={styles.cont}>
                        <span className={styles.loader}></span>
                        <span>Подключение к бирже...</span>
                    </div>
                </h1>
            </Container>
        )
    }
    

    return (
        <Container>
            {isConnected ? (
                <div className={styles.main}>
                    {error && <div className={styles.error}>{error}</div>}

                    <OrderList />
                    <Ticker />
                </div>
            ) : (
                <>
                    <h1>Connecting is close.</h1>
                    <button onClick={connect}>Connect</button>
                </>
            )}

        </Container>
    );
};

export default OrderMain;