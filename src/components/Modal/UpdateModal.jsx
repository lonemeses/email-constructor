import React, {useState} from 'react';
import HoveringBigButtons from "../../UI/Buttons/HoveringBigButtons.jsx";
import styles from "./Modal.module.css"
import MyInput from "../../UI/Inputs/MyInput.jsx";

const UpdateModal = ({onSave, prevName}) => {
    const [name, setName] = useState(prevName);
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
                    Обновить
                </HoveringBigButtons>
            </div>
        </div>
    );
};

export default UpdateModal;