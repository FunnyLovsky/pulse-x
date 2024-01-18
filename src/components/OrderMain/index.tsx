/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import OrderList from '../OrdersList';
import Ticker from '../Ticker';
import Container from '../ui/Container';
import styles from './style.module.scss';
import { useActions } from '../../store/hooks/useActions';
import { useAppDispatch } from '../../store/hooks/useAppDispath';
import { socketReducer } from '../../store';


const OrderMain = () => {
    const { connect, disconnect } = useActions();
    const dispatch = useAppDispatch();

    useEffect(() => {
        connect();
        console.log('connect');

        return () => {
            disconnect()
        }
    }, [])

    useEffect(() => {
        const socket = socketReducer.socket;

        if(socket) {
            socket.onmessage = (event) => {
                console.log(event.data)
            }
        }

        return () => {
            if(socket) {
                socket.onmessage = null
            }
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