import React from 'react';
import { FaBars } from "react-icons/fa6";
import styles from './MyButtons.module.css'

const SideBarButton = ({onClick}) => {
    return (
        <button className={styles.sidebar_btn} onClick={onClick}>
            <FaBars />
        </button>
    );
};

export default SideBarButton;