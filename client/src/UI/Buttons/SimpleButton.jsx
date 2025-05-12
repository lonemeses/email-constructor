import React from 'react';
import styles from './MyButtons.module.css'

const SimpleButton = ({children, onClick}) => {
    return (
        <button className={styles.simple_btn} onClick={onClick}>
            {children}
        </button>
    );
};

export default SimpleButton;