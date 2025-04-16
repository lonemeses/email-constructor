import React from 'react';
import styles from './TemplateEditor.module.css'
import EditorElement from "./EditorElement.jsx";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import HoveringBigButtons from "../../UI/Buttons/HoveringBigButtons.jsx";
import ButtonList from "../../UI/Buttons/ButtonList.jsx";


const TemplateEditor = ({blocks, setBlocks, openModalFunc, isUpdate, isPending, cancelEdit}) => {

    const deleteItem = (id) => {
        setBlocks(blocks.filter(block => block.id !== id));
    }

    const addHeadings = (id, newType) => {
        setBlocks(prev => prev.map(block => block.id === id ? block.text.push({type: newType, children: [{text: ''}]}) : null))
    }

    const handleTextChange = (id, newText) => {
        const copied = JSON.parse(JSON.stringify(newText));
        console.log(copied)
        setBlocks(prev => prev.map(block => block.id === id ? {...block, text: copied} : block))
    }
    const labelTextChange = (id, newText) => {
        setBlocks(prev => prev.map(block => block.id === id ? {...block, label: newText} : block))
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
                            labelTextChange={labelTextChange}
                            changeType={addHeadings}
                            handleTextChange={handleTextChange}
                            block={block}
                            deleteItem={deleteItem}
                            key={block.id}
                        />
                    )}
                </SortableContext>
            </div>
            <div className={styles.btns_container}>
                <ButtonList addFunc={setBlocks} openModal={openModalFunc}/>
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
                    clickFunc={isUpdate ? () => {openModalFunc('update')} : () => openModalFunc('save')}>
                    Сохранить шаблон
                </HoveringBigButtons>
            </div>
            }
        </div>
    );
};

export default TemplateEditor;