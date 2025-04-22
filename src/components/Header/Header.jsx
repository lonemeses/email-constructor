import React from 'react';
import styles from './Header.module.css'
import SideBarButton from "../../UI/Buttons/SideBarButton.jsx";
import {useDispatch} from "react-redux";
import {uiSlice} from "../../store/Slices/uiSlice.js";

const Header = () => {
    const {setSideActive} = uiSlice.actions
    const dispatch = useDispatch();

    return (
        <div className={styles.header}>
            <div className={styles.header_title}>
                Email Constructor
            </div>
            <div className={styles.header_side_btn}>
                <SideBarButton onClick={() => dispatch(setSideActive())}/>
            </div>
        </div>
    );
};

export default Header;