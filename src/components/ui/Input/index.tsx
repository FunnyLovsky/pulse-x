import { ChangeEvent, FC } from 'react';
import styles from './style.module.scss';

interface IInput {
    type: "text" | "password",
    placeholder: string,
    value?: string,
    required?: boolean
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<IInput> = ({type, placeholder, onChange, value, required}) => {
    return(
        <input 
            type={type} 
            className={styles.input} 
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            required={required}
        />
    )
};

export default Input;