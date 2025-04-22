import React, {useState} from 'react';
import ImageUploadButton from "../../UI/Buttons/ImageUploadButton.jsx";
import Input from "../../UI/Inputs/Input.jsx";
import styles from './Modal.module.css'
import AddButton from "../../UI/Buttons/AddButton.jsx";
import {uiSlice} from "../../store/Slices/uiSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {editorSlice} from "../../store/Slices/editorSlice.js";

const ImageUploader = () => {
    const {blocks} = useSelector(state => state.editor);
    const {setModal} = uiSlice.actions
    const {addBlock} = editorSlice.actions
    const dispatch = useDispatch();
    const [label, setLabel] = useState("");
    const [image, setImage] = useState(null);
    const [isImageUpload, setIsImageUpload] = useState(false);
    const addImage = () => {
        dispatch(addBlock({type: 'image', src: image.src, id: blocks.length + 1, label: label}));
        dispatch(setModal(null))
    }


    return (
        <div className={styles.image_uploader_wrapper}>
            <div className={styles.image_uploader_title}>
                <h2>Загрузить изображение</h2>
            </div>
            {isImageUpload ?
                <div>
                    <img src={image.src} alt={image.src} className={styles.img_elem}/>
                </div>
                :
                <div className={styles.image_uploader_btn}>
                    <ImageUploadButton setImage={setImage} setIsImageUpload={setIsImageUpload}/>
                </div>
            }
            <div className={styles.image_uploader_label}>
                <Input
                    placeholder={'Добавить подпись'}
                    value={label}
                    onChange={e => setLabel(e.target.value)}
                    id={'image'}
                />
            </div>
            <div className={styles.image_uploader_close_btn}>
                <AddButton onClick={addImage}>
                    Добавить
                </AddButton>
            </div>
        </div>
    );
};

export default ImageUploader;