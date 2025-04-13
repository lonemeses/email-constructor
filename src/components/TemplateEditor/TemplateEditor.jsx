import React from 'react';
import styles from './TemplateEditor.module.css'
import AddButton from "../../UI/Buttons/AddButton.jsx";
import EditorElement from "./EditorElement.jsx";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import PreviewSaveButton from "../../UI/Buttons/PreviewSaveButton.jsx";


const TemplateEditor = ({blocks, setBlocks, openModalFunc, isUpdate, isPending}) => {

    const deleteItem = (id) => {
        setBlocks(blocks.filter(block => block.id !== id));
    }

    const handleTextChange = (id, newText) => {
        setBlocks(prev => prev.map(block => block.id === id ? {...block, text: newText} : block))
    }

    return (
        <div className={isPending ? styles.container_disable : styles.container}>
            <div className={styles.header}>
                Редактор
            </div>
            <div className={styles.form_content}>
                <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                    {blocks.map(block =>
                        <EditorElement handleTextChange={handleTextChange} block={block} deleteItem={deleteItem} key={block.id}/>
                    )}
                </SortableContext>
            </div>
            <div className={styles.btns_container}>
                <AddButton addFunc={setBlocks}/>
            </div>
            {blocks.length > 0 &&
            <div className={styles.end_btns}>
                <PreviewSaveButton type={'preview'} clickFunc={() => openModalFunc('preview')}>
                    Предпросмотр шаблона
                </PreviewSaveButton>
                <PreviewSaveButton
                    type={"save"}
                    clickFunc={isUpdate ? () => {openModalFunc('update')} : () => openModalFunc('save')} variant={"hidden"}>
                    Сохранить шаблон
                </PreviewSaveButton>
            </div>
            }
        </div>
    );
};

export default TemplateEditor;