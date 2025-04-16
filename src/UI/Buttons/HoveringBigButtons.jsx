import React from 'react';
import PropTypes from "prop-types";
import {IoIosSave} from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import styles from "./MyButtons.module.css"
import { MdEdit } from "react-icons/md";
import { TbCancel } from "react-icons/tb";

const HoveringBigButtons = ({type, clickFunc, children}) => {

    switch (type) {
        case 'save':
            return (
                <button className={`${styles.hovering_btn} ${styles.save_btn}`} onClick={clickFunc}>
                    <>
                        <IoIosSave className={styles.icon}/>
                        <span className={styles.hovering_text}>{children}</span>
                    </>
                </button>
            )
        case 'preview':
            return (
                <button className={`${styles.hovering_btn} ${styles.preview_btn}`} onClick={clickFunc}>
                    <>
                        <IoEyeOutline className={styles.icon}/>
                        <span className={styles.hovering_text}>{children}</span>
                    </>
                </button>
            )
        case 'edit':
            return (
                <button className={`${styles.hovering_btn} ${styles.edit_btn}`} onClick={clickFunc}>
                    <>
                        <MdEdit className={styles.icon}/>
                        <span className={styles.hovering_text}>{children}</span>
                    </>
                </button>
            )
        case 'cancel':
            return (
                <button className={`${styles.hovering_btn} ${styles.cancel_btn}`} onClick={clickFunc}>
                    <>
                        <TbCancel className={styles.icon}/>
                        <span className={styles.hovering_text}>{children}</span>
                    </>
                </button>
            )
    }


};

HoveringBigButtons.propTypes = {
    type: PropTypes.oneOf(['save', 'preview', 'edit']).isRequired,
    variant: PropTypes.oneOf(['hidden', "visible"])
}
export default HoveringBigButtons;