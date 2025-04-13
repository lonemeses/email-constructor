import React from 'react';
import styles from "./MyButtons.module.css"
import {FaPlus} from "react-icons/fa6";
import {IoImage, IoText} from "react-icons/io5";


const AddButton = ({addFunc}) => {
    const addText = () => {
        addFunc(prev => [...prev, {type: 'text', text: '', id: prev.length + 1}]);
    }

    const addImage = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
                const src = event.target.result;
                addFunc(prev => [...prev, { type: 'image', src, id: prev.length + 1}]);
            };
            reader.readAsDataURL(file);
        };
        input.click();
    }

    return (
        <div className={styles.fab_container}>
            <div className={`${styles.fab_btn} ${styles.main_btn}`}>
                <FaPlus/>
            </div>
            <div className={`${styles.fab_btn} ${styles.text_btn}`}>
                <IoText onClick={ addText }/>
            </div>
            <div className={`${styles.fab_btn} ${styles.image_btn}`}>
                <IoImage onClick={ addImage }/>
            </div>
        </div>
    );
};

export default AddButton;