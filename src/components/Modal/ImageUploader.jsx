import React, {useState} from 'react';
import ImageUploadButton from "../../UI/Buttons/ImageUploadButton.jsx";
import MyInput from "../../UI/Inputs/MyInput.jsx";
import styles from './Modal.module.css'
import AddButton from "../../UI/Buttons/AddButton.jsx";

const ImageUploader = ({addFunc, closeModal}) => {
    const [label, setLabel] = useState("");
    const [image, setImage] = useState(null);
    const [isImageUpload, setIsImageUpload] = useState(false);
    const addImage = () => {
        addFunc(prev => [...prev, {type: 'image', src: image.src, id: prev.length + 1, label: label}]);
        closeModal()
    }


    return (
        <div className={styles.uploader_wrapper}>
            <div className={styles.uploader_title}>
                <h2>Загрузить изображение</h2>
            </div>
            {isImageUpload ?
                <div>
                    <img src={image.src} alt={image.src} className={styles.img_elem}/>
                </div>
                :
                <div className={styles.uploader_btn}>
                    <ImageUploadButton setImage={setImage} setIsImageUpload={setIsImageUpload}/>
                </div>
            }
            <div className={styles.uploader_label}>
                <MyInput
                    placeholder={'Добавить подпись'}
                    value={label}
                    onChange={e => setLabel(e.target.value)}
                    id={'image'}
                />
            </div>
            <div className={styles.uploader_close_btn}>
                <AddButton onClick={addImage}>
                    Добавить
                </AddButton>
            </div>
        </div>
    );
};

export default ImageUploader;