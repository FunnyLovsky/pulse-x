import { FC } from 'react';
import styles from './style.module.scss';

interface IButton {
    children: React.ReactNode
}

const Container: FC<IButton> = ({children}) => {
    return(
        <div className={styles.container}>
            {children}
        </div>
    )
};

export default Container;