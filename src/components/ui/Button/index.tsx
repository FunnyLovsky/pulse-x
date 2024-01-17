import { FC } from 'react';
import styles from './style.module.scss';

interface IButton {
    type: "login" | "buy" | "sell",
    children: string,
    onClick?: () => void
}

const Button: FC<IButton> = ({children, onClick, type}) => {
    return(
        <button 
            className={[styles[type], styles.btn].join(' ')}
            onClick={onClick}
        >
            {children}
        </button>
    )
};

export default Button;