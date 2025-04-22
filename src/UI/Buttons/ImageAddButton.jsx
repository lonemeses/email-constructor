import React from 'react';
import styles from "./MyButtons.module.css";
import {IoImage} from "react-icons/io5";

const ImageAddButton = ({openModal}) => {
    return (
        <div className={`${styles.fab_btn} ${styles.image_btn}`}>
            <IoImage onClick={() => openModal('image')}/>
        </div>
    );
};

export default ImageAddButton;