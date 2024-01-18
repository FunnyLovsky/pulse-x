import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import styles from './style.module.scss';
import { RoutesName } from '../../router/routes';
import { IoReorderFour, IoLogOutOutline } from "react-icons/io5";
import { useActions } from '../../store/hooks/useActions';

const Sidebar = () => {
    const {logout} = useActions()
    
    return(
        <div className={styles.inner}>

            <div className={styles.item}>
                <div className={styles.logo}>
                    <Logo/>
                    <h2 className={styles.title}>PulseX</h2>
                </div>
                <Link to={RoutesName.ORDERS} className={styles.link}>
                    <IoReorderFour/>
                    <p>Заявки</p>
                </Link>
            </div>

            <button 
                className={styles.btn}
                onClick={logout}
            >
                <IoLogOutOutline/>
                <p>Выход</p>
            </button>

        </div>
    )
};

export default Sidebar;