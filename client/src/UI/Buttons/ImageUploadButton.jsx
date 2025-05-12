import React from 'react';
import styles from './MyButtons.module.css'
import {FaFileUpload} from "react-icons/fa";

const ImageUploadButton = ({setImage, setIsImageUpload}) => {

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
                const image = {type: 'image', src}
                setImage(image)
                setIsImageUpload(true)
            };
            reader.readAsDataURL(file);
        };
        input.click();
    }

    return (
        <button className={styles.image_uploader_btn} onClick={addImage}>
            <FaFileUpload className={styles.icon} />
            Загрузить изображение
        </button>
    );
};

export default ImageUploadButton;