/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import OrderList from '../OrdersList';
import Ticker from '../Ticker';
import Container from '../ui/Container';
import styles from './style.module.scss';
import { useActions } from '../../store/hooks/useActions';
import { useAppSelector } from '../../store/hooks/useAppSelector';

const OrderMain = () => {
    const {connect, disconnect} = useActions()
    const {isConnected} = useAppSelector(state => state.socketReducer)

    useEffect(() => {
        connect()

        return () => {
            disconnect()
        }
    }, [])

    return (
        <Container>
            {isConnected ? (
                <div className={styles.main}>
                    <OrderList />
                    <Ticker />
                </div>
            ) : (
                <>
                    <h1>Data is loading...</h1>
                    <button onClick={connect}>Connect</button>
                </>
            )}

        </Container>
    );
};

export default OrderMain;