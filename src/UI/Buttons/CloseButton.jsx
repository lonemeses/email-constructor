import React from 'react';
import { IoClose } from "react-icons/io5";
import styles from "./MyButtons.module.css"

const CloseButton = ({onClick}) => {
    return (
        <div onClick={onClick} className={styles.close_btn}>
            <IoClose className={styles.icon} />
        </div>
    );
};

export default CloseButton;