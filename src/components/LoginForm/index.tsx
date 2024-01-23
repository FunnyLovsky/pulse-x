import React, { useState } from 'react';
import BtnLogin from '../ui/BtnLogin';
import Input from '../ui/Input';
import Logo from '../ui/Logo';
import styles from './style.module.scss';
import { useAppSelector } from '../../store/hooks/useAppSelector';
import { useActions } from '../../store/hooks/useActions';
import { setError } from '../../store/reducers/auth';
import { useAppDispatch } from '../../store/hooks/useAppDispath';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useActions();
    const dispatch = useAppDispatch();
    const { error, isLoading } = useAppSelector((state) => state.authReducer);

    const clearError = () => {
        dispatch(setError(null));
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        clearError();
        login(username, password);
    };

    return (
        <div className={styles.inner}>
            <div className={styles.container}>
                <div className={styles.item}>
                    <div
                        className={styles.error}
                        style={{ opacity: error ? 1 : 0 }}
                    >
                        {error}
                    </div>
                    <Logo />
                    <h3 className={styles.title}>Вход</h3>
                    <form className={styles.form} onSubmit={submit}>
                        <Input
                            type="text"
                            placeholder="Username"
                            required={true}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => setUsername(e.target.value)}
                            value={username}
                            disabled={isLoading}
                            onFocus={clearError}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            required={true}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => setPassword(e.target.value)}
                            value={password}
                            disabled={isLoading}
                            onFocus={clearError}
                        />
                        <BtnLogin loading={isLoading}>Войти</BtnLogin>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
