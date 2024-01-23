import { FC, useState } from 'react';
import styles from './style.module.scss';
import { BsSortDown, BsSortDownAlt } from 'react-icons/bs';

interface IProps {
    children: string;
    onClick?: () => void;
}

const SortName: FC<IProps> = ({ children, onClick }) => {
    const [variant, setVariant] = useState(false);

    const handler = () => {
        if (onClick) {
            onClick();
        }
        variant ? setVariant(false) : setVariant(true);
    };
    return (
        <div onClick={handler} className={styles.elem}>
            {variant ? <BsSortDown /> : <BsSortDownAlt />}
            <div>{children}</div>
        </div>
    );
};

export default SortName;
