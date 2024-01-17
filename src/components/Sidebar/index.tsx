import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import styles from './style.module.scss';
import { RoutesName } from '../../router/routes';

const Sidebar = () => {
    return(
        <div className={styles.inner}>
            <div className={styles.logo}>
                <Logo/>
                <h2 className={styles.title}>PulseX</h2>
            </div>
            <div className={styles.link}>
                <div className={styles.icon}>$</div>
                <Link to={RoutesName.ORDERS}>Заявки</Link>
            </div>
        </div>
    )
};

export default Sidebar;