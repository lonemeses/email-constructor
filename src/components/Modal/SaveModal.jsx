import React, {useState} from 'react';
import PreviewSaveButton from "../../UI/Buttons/PreviewSaveButton.jsx";
import styles from "./Modal.module.css"
import MyInput from "../../UI/Inputs/MyInput.jsx";

const SaveModal = ({onSave}) => {
    const [name, setName] = useState("");
    return (
        <div className={styles.save_container}>
            <MyInput placeholder={'Введите название шаблона'} value={name} onChange={(e) => setName(e.target.value)} id={"templateName"}/>
            <div className={styles.save_btn}>
                <PreviewSaveButton type={'save'} variant={'visible'} clickFunc={() => onSave(name)}>
                    Cохранить
                </PreviewSaveButton>
            </div>
        </div>
    );
};

export default SaveModal;