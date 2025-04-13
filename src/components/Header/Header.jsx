import React from 'react';
import styles from './Header.module.css'
import SideBarButton from "../../UI/Buttons/SideBarButton.jsx";
const Header = ({setMenuActive, menuActive}) => {
    return (
        <div className={styles.header}>
            <div className={styles.header_title}>
                Email Constructor
            </div>
            <div className={styles.side_btn}>
                <SideBarButton onClick={() => {setMenuActive(!menuActive)}}/>
            </div>
        </div>
    );
};

export default Header;