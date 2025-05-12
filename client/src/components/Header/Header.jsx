import React from 'react';
import styles from './Header.module.css'
import SideBarButton from "../../UI/Buttons/SideBarButton.jsx";
import {useDispatch, useSelector} from "react-redux";
import {uiSlice} from "../../store/Slices/uiSlice.js";
import {userSlice} from "../../store/Slices/userSlice.js";
import SimpleButton from "../../UI/Buttons/SimpleButton.jsx";
import {useNavigate} from "react-router";

const Header = () => {
    const {setSideActive} = uiSlice.actions
    const {logOut} = userSlice.actions
    const {isAuth, username} = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutBtn = () => {
        dispatch(logOut())
        navigate("/login");
        localStorage.removeItem("token")
    }

    return (
        <div className={styles.header}>
            <div className={styles.header_title}>
                Email Constructor
            </div>
            <div className={styles.header_side_btn}>
                <SideBarButton onClick={() => dispatch(setSideActive())}/>
            </div>
            {isAuth &&
            <div className={styles.header_user}>
                <p>{username}</p>
                <SimpleButton onClick={logoutBtn}>Выйти</SimpleButton>
            </div>
            }
        </div>
    );
};

export default Header;