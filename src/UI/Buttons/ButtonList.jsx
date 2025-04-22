import React from 'react';
import styles from "./MyButtons.module.css";
import AddButton from "./AddButton.jsx";
import TextButtons from "./TextButtons.jsx";
import ImageAddButton from "./ImageAddButton.jsx";

const ButtonList = ({addFunc, openModal}) => {
    return (
        <div className={styles.fab_container}>
            <div>
                <AddButton type={'mini'}/>
            </div>
            <div className={`${styles.fab_btn} ${styles.text_btn}`}>
                <TextButtons addFunc={addFunc}/>
            </div>
            <div className={`${styles.fab_btn} ${styles.image_btn}`}>
                <ImageAddButton openModal={openModal}/>
            </div>
        </div>
    );
};

export default ButtonList;