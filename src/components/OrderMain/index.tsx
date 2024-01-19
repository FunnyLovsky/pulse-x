/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import OrderList from '../OrdersList';
import Ticker from '../Ticker';
import Container from '../ui/Container';
import styles from './style.module.scss';
import { connectSocket, disconnectedSocket } from '../../store/reducers/socket';
import { useDispatch } from 'react-redux';

const OrderMain = () => {
    console.log('order main')
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(connectSocket());
        console.log('comp: conncet')

        return () => {
            dispatch(disconnectedSocket())
        }
    }, [dispatch])

    return(
        <Container>
            <div className={styles.main}>
                <OrderList/>
                <Ticker/>
            </div>
        </Container>
    )
};

export default OrderMain;