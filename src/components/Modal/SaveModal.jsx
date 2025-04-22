import React, {useState} from 'react';
import HoveringBigButtons from "../../UI/Buttons/HoveringBigButtons.jsx";
import styles from "./Modal.module.css"
import Input from "../../UI/Inputs/Input.jsx";
import {useDispatch, useSelector} from "react-redux";
import {postTemplate} from "../../httpEmulation/index.js";
import {toast} from "react-toastify";

const SaveModal = () => {
    const {isUpdate, selectedTemplate} = useSelector(state => state.editor)
    const dispatch = useDispatch()
    const [name, setName] = useState(selectedTemplate?.name || '');
    const onSave = () => {
        try {
            const response = toast.promise(dispatch(postTemplate(name)),{
                pending: 'Сохраняем шаблон',
                success: 'Шаблон сохранен!',
                error: 'Не удалось сохранить шаблон'
            })
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className={styles.save_wrapper}>
            <Input
                placeholder={'Введите название шаблона'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                id={"templateName"}
            />
            <div className={styles.save_btn}>
                <HoveringBigButtons type={'save'} clickFunc={() => onSave(name)}>
                    {isUpdate
                    ?
                    "Обновить"
                    :
                   "Сохранить"}
                </HoveringBigButtons>
            </div>
        </div>
    );
};

export default SaveModal;