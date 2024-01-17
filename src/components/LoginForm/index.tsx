import Button from '../ui/Button';
import Input from '../ui/Input';
import Logo from '../ui/Logo';
import styles from './style.module.scss';

const LoginForm = () => {
    return(
        <div className={styles.inner}>
            <div className={styles.container}>
                <div className={styles.item}>
                    <Logo/>
                    <h3 className={styles.title}>Вход</h3>
                    <form className={styles.form}>
                        <Input 
                            type='text' 
                            placeholder='Username' 
                        />
                        <Input 
                            type='password' 
                            placeholder='Password'
                        />
                        <Button type='login'>Войти</Button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default LoginForm;