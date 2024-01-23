import { ChangeEvent, FC } from 'react';
import styles from './style.module.scss';

interface IInput {
    type: 'text' | 'password';
    placeholder: string;
    value?: string;
    required?: boolean;
    disabled?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<IInput> = ({ type, placeholder, onChange, value, required, disabled, onFocus }) => {
    return (
        <input
            type={type}
            className={styles.input}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            required={required}
            disabled={disabled}
            onFocus={onFocus}
            style={{ opacity: disabled ? 0.7 : 1 }}
        />
    );
};

export default Input;
