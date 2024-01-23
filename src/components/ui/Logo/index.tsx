import styles from './style.module.scss';
import LOGO from '../../../assets/logo.svg';

const Logo = () => {
    return <img src={LOGO} alt="" className={styles.img} />;
};

export default Logo;
