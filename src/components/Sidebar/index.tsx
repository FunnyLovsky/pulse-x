import { NavLink, Outlet } from 'react-router-dom';
import Logo from '../ui/Logo';
import styles from './style.module.scss';
import './style.scss';
import { RoutesName } from '../../router/routes';
import { IoReorderFour, IoLogOutOutline } from 'react-icons/io5';
import { GrHomeRounded } from "react-icons/gr";
import { useActions } from '../../store/hooks/useActions';

const Sidebar = () => {
    const { logout, disconnect } = useActions();

    const logoutHandler = () => {
        logout();
        disconnect();
    };

    return (
        <div>
            <div className={styles.inner}>
                <div className={styles.item}>
                    <div className={styles.logo}>
                        <Logo />
                        <h2 className={styles.title}>PulseX</h2>
                    </div>
                    <NavLink to={RoutesName.MAIN} className={styles.link}>
                        <GrHomeRounded/>
                        <p>Главная</p>
                    </NavLink>
                    <NavLink to={RoutesName.ORDERS} className={styles.link}>
                        <IoReorderFour />
                        <p>Заявки</p>
                    </NavLink>
                </div>

                <button className={styles.btn} onClick={logoutHandler}>
                    <IoLogOutOutline />
                    <p>Выход</p>
                </button>
            </div>
            <Outlet />
        </div>
    );
};

export default Sidebar;
