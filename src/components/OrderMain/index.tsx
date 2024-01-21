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

    useEffect(() => {
        fetchOrders();
    }, [])

    if(isLoading) {
        return(
            <Container>
                <h1>Data is loading...</h1>
            </Container>
        )
    }
    

    return (
        <Container>
            {isConnected ? (
                <div className={styles.main}>
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