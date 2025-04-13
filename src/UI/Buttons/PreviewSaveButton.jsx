import React from 'react';
import PropTypes from "prop-types";
import {IoIosSave} from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import styles from "./MyButtons.module.css"
import { MdEdit } from "react-icons/md";

const PreviewSaveButton = ({type, clickFunc, children, variant}) => {
    return (
        <button className={type === 'save' ? styles.save_btn : styles.preview_btn} onClick={clickFunc}>
            {type === 'save' ?
                <>
                    <IoIosSave className={styles.save_icon}/>
                    <span className={variant === 'hidden' ? styles.save_text_hidden : styles.save_text_visible}>{children}</span>
                </>
                :
                type === 'preview' ?
                <>
                    <IoEyeOutline className={styles.preview_icon}/>
                    <span className={styles.preview_text}>{children}</span>
                </>
                    :
                    <>
                        <MdEdit className={styles.preview_icon}/>
                        <span className={styles.preview_text}>{children}</span>
                    </>

            }
        </button>

    );
};

PreviewSaveButton.propTypes = {
    type: PropTypes.oneOf(['save', 'preview', 'edit']).isRequired,
    variant: PropTypes.oneOf(['hidden', "visible"])
}
export default PreviewSaveButton;