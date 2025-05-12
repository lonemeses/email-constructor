import React, {useEffect, useState} from 'react';
import Input from "../src/UI/Inputs/Input.jsx";
import {Link, useNavigate} from "react-router";
import styles from './LoginRegistration.module.css'
import SimpleButton from "../src/UI/Buttons/SimpleButton.jsx";
import {login, registration} from "../src/http/userAPI.js";
import {userSlice} from "../src/store/Slices/userSlice.js";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";

const Auth = () => {
    const {logIn} = userSlice.actions
    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
            dispatch(logIn())
            navigate('/constructor')
        }
    }, [dispatch, logIn, navigate]);

    const click = async () => {
        if (!isLogin) {
            const response = await registration(username, password)
            if(response.status === 200) {
                setTimeout(() => {
                    setIsLogin(true)
                    setUsername('');
                    setPassword('');
                }, 500)

            }

        } else {
            const response = await login(username, password);
            dispatch(logIn())
            localStorage.setItem("token", response.data.token)
            navigate('/constructor')
        }
    }

    return (
        <div className={styles.form_background}>
            <div className={styles.form_content}>
                <div>
                    <h2>{isLogin ? "Авторизация" : "Регистрация"}</h2>
                </div>
                <div>
                    <Input placeholder={'Имя пользователя'} value={username} onChange={(e) => setUsername(e.target.value)} id={username}/>
                    <Input placeholder={'Пароль'} value={password} onChange={(e) => setPassword(e.target.value)} id={password} type={'password'}/>
                </div>
                {isLogin
                    ?
                    <div className={styles.form_footer}>
                        <p>Ещё нет аккаунта? <Link to={'/registration'}
                                                   className={styles.form_link} onClick={() => setIsLogin(!isLogin)}>Зарегистрируйся!</Link></p>
                        <SimpleButton onClick={click}>Войти</SimpleButton>
                    </div>
                    :
                    <div className={styles.form_footer}>
                        <p>Уже есть аккаунт? <Link to={'/registration'}
                                                   className={styles.form_link} onClick={() => setIsLogin(!isLogin)}>Войти!</Link></p>
                        <SimpleButton onClick={click}>Зарегистрироваться</SimpleButton>
                    </div>}
            </div>
        </div>
    );
};

export default Auth;