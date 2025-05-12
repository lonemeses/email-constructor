import React from 'react';
import styles from "./MyButtons.module.css";
import {LuHeading1, LuHeading2} from "react-icons/lu";
import { FaParagraph } from "react-icons/fa6";

const TextButtons = ({addFunc}) => {
    return (
        <div className={`${styles.fab_btn} ${styles.text_btn}`}>
            <LuHeading1 onClick={() => addFunc('heading-one')} className={styles.text_btn_icon}/>
            <LuHeading2 onClick={() => addFunc('heading-two')} className={styles.text_btn_icon}/>
            <FaParagraph onClick={() => addFunc('paragraph')}/>
        </div>
    );
};

export default TextButtons;