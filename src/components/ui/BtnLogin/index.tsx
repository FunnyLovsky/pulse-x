import { FC } from 'react';
import styles from './style.module.scss';

interface IButton {
    children: string;
    onClick?: (e: React.MouseEvent) => void;
    loading?: boolean;
}

const BtnLogin: FC<IButton> = ({ children, onClick, loading }) => {
    const active = [styles.active, styles.btn].join(' ');
    const disabled = [styles.dis, styles.btn].join(' ');
    return (
        <button className={loading ? disabled : active} onClick={onClick} disabled={loading}>
            <span className={styles.loader} style={{ opacity: loading ? 1 : 0 }} />
            <span>{children}</span>
        </button>
    );
};

export default BtnLogin;
