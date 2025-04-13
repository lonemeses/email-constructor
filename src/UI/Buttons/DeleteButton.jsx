import React from 'react';
import { IoTrashSharp } from "react-icons/io5";
import styles from "./MyButtons.module.css"

const DeleteButton = ({deleteFunc}) => {
    return (
        <button className={styles.delete_btn} onClick={deleteFunc}>
            <IoTrashSharp/>
        </button>
    );
};

export default DeleteButton;