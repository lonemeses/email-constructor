import React from 'react';
import CloseButton from "../../UI/Buttons/CloseButton.jsx";
import styles from './Modal.module.css'

const Modal = ({onClose, children}) => {
    return (
        <div className={styles.modal_backdrop} onClick={onClose}>
            <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
                {children}
                <div className={styles.close_btn}>
                    <CloseButton onClick={onClose}/>
                </div>
            </div>
        </div>
    );
};

export default Modal;