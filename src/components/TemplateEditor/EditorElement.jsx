import React from 'react';
import styles from "./TemplateEditor.module.css";
import MyTextarea from "../../UI/Textareas/MyTextarea.jsx";
import DeleteButton from "../../UI/Buttons/DeleteButton.jsx";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import DragButton from "../../UI/Buttons/DragButton.jsx";

const EditorElement = ({block, deleteItem, handleTextChange}) => {
    const {
        setNodeRef,
        transform,
        transition,
        listeners,
        attributes
    } = useSortable({
        id: block.id,
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }


    return (
        <div className={styles.form_elem} style={style} ref={setNodeRef}>
            {block.type === 'text' && <MyTextarea value={block.text} onChange={newText => handleTextChange(block.id, newText)}/>}
            {block.type === 'image' && <img className={styles.img_elem} src={block.src} alt={block.src} />}
            <DeleteButton deleteFunc={() => deleteItem(block.id)} />
            <DragButton {...attributes} {...listeners}/>
        </div>
    );
};

export default EditorElement;