import React from 'react';
import styles from './TemplateEditor.module.css'
import EditorElement from "./EditorElement.jsx";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import HoveringBigButtons from "../../UI/Buttons/HoveringBigButtons.jsx";
import ButtonList from "../../UI/Buttons/ButtonList.jsx";
import {editorSlice} from "../../store/Slices/editorSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {uiSlice} from "../../store/Slices/uiSlice.js";


const TemplateEditor = () => {
    const {blocks, isUpdate} = useSelector(state => state.editor)
    const {isPending} = useSelector(state => state.ui)
    const {  addBlock, setBlocks, setSelectedTemplate, setIsUpdate} = editorSlice.actions
    const {setModal} = uiSlice.actions
    const dispatch = useDispatch();

    const addNewBlock = (type) => {
        dispatch(addBlock({
            type: 'text',
            id: blocks.length + 1,
            text: [{type: type, children: [{text: ''}]}]
        }))
    }
    const openModalFunc = (type) => {
        dispatch(setModal(type))
    }
    const cancelEdit = () => {
        dispatch(setBlocks([]))
        dispatch(setSelectedTemplate(null))
        dispatch(setIsUpdate(false))
    }


    return (
        <div className={`${styles.container} ${isPending ? styles.container_disable : ''}`}>
            <div className={styles.header}>
                Редактор
            </div>
            <div className={styles.form_content}>
                <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                    {blocks.map(block =>
                        <EditorElement
                            block={block}
                            key={block.id}
                        />
                    )}
                </SortableContext>
            </div>
            <div className={styles.btns_container}>
                <ButtonList addFunc={addNewBlock} openModal={openModalFunc}/>
            </div>
            {blocks.length > 0 &&
            <div className={styles.end_btns}>
                <HoveringBigButtons type={'preview'} clickFunc={() => openModalFunc('preview')}>
                    Предпросмотр шаблона
                </HoveringBigButtons>
                {isUpdate &&
                    <HoveringBigButtons type={'cancel'} clickFunc={cancelEdit}>
                        Отменить редактирование
                    </HoveringBigButtons>
                }
                <HoveringBigButtons
                    type={"save"}
                    clickFunc={() => openModalFunc('save')}>
                    Сохранить шаблон
                </HoveringBigButtons>
            </div>
            }
        </div>
    );
};

export default TemplateEditor;