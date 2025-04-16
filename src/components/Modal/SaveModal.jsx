import React, {useState} from 'react';
import HoveringBigButtons from "../../UI/Buttons/HoveringBigButtons.jsx";
import styles from "./Modal.module.css"
import MyInput from "../../UI/Inputs/MyInput.jsx";

const SaveModal = ({onSave}) => {
    const [name, setName] = useState("");
    return (
        <div className={styles.save_container}>
            <MyInput
                placeholder={'Введите название шаблона'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                id={"templateName"}
            />
            <div className={styles.save_btn}>
                <HoveringBigButtons type={'save'} clickFunc={() => onSave(name)}>
                    Cохранить
                </HoveringBigButtons>
            </div>
        </div>
    );
};

export default SaveModal;