import styles from './style.module.scss';
import AVATAR from '../../assets/avatar.png';
import Container from '../ui/Container';
import { useAppSelector } from '../../store/hooks/useAppSelector';

const Header = () => {
    const { user } = useAppSelector((state) => state.authReducer);
    return (
        <Container>
            <div className={styles.inner}>
                <h1 className={styles.title}>Заявки</h1>
                <div className={styles.user}>
                    <h4>{user.username}</h4>
                    <img src={AVATAR} alt="avatar" />
                </div>
            </div>
        </Container>
    );
};

export default Header;
