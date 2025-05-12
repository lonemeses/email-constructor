import React, {useState} from 'react';
import HoveringBigButtons from "../../UI/Buttons/HoveringBigButtons.jsx";
import styles from "./Modal.module.css"
import Input from "../../UI/Inputs/Input.jsx";
import {useDispatch, useSelector} from "react-redux";

import {toast} from "react-toastify";
import {setIsPending, setModal} from "../../store/Slices/uiSlice.js";
import {addTemplate, editTemplate} from "../../store/Slices/templatesSlice.js";
import {setBlocks, setIsUpdate, setSelectedTemplate} from "../../store/Slices/editorSlice.js";
import {postTemplate} from "../../http/userAPI.js";

const SaveModal = () => {
    const {blocks} = useSelector(state => state.editor);
    const {templates} = useSelector(state => state.templates);
    const {isUpdate, selectedTemplate} = useSelector(state => state.editor)
    const dispatch = useDispatch()
    const [name, setName] = useState(selectedTemplate?.name || '');
    const onSave = async () => {
        try {
            dispatch(setIsPending(true))
            dispatch(setModal(null))
            if (isUpdate) {
                dispatch(editTemplate({id: selectedTemplate.id, name: name, template: blocks}))
                dispatch(setIsUpdate(false))
            } else {
                dispatch(addTemplate({id: templates.length + 1, name: name, template: blocks}))
            }
            const response = await toast.promise(postTemplate(templates), {
                pending: 'Сохраняем шаблон',
                success: 'Шаблон сохранен!',
                error: 'Не удалось сохранить шаблон'
            })
            dispatch(setBlocks([]))
            dispatch(setSelectedTemplate(null))
            dispatch(setIsPending(false))

            console.log(response.data.message)
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