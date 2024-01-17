import { ChangeEvent, FC } from 'react';
import styles from './style.module.scss';

interface IInput {
    type: "text" | "password",
    placeholder: string,
    value?: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<IInput> = ({type, placeholder, onChange, value}) => {
    return(
        <input 
            type={type} 
            className={styles.input} 
            placeholder={placeholder}
            onChange={onChange}
            value={value}
        />
    )
};

export default Input;