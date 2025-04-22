import React from 'react';
import styles from "./MyButtons.module.css"
import {FaPlus} from "react-icons/fa6";
import {IoImage, IoText} from "react-icons/io5";
import {LuHeading1, LuHeading2} from "react-icons/lu";


const AddButton = ({children, type, onClick}) => {


    if (type === 'mini') {
        return (
            <div className={`${styles.fab_btn} ${styles.main_btn}`}>
                <FaPlus/>
            </div>
        )
    } else {
        return (
            <div className={styles.add_btn_full} onClick={onClick}>
                <FaPlus className={styles.icon}/>
                {children}
            </div>
        )
    }


};

export default AddButton;