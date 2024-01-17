import styles from './style.module.scss';
import LOGO from '../../../assets/logo.svg';

const AuthLoader = () => {
    return(
        <div className={styles.inner}>
            <img 
                src={LOGO} 
                className={styles.img} 
                alt="logo" 
            />

        </div>
    )
};

export default AuthLoader;