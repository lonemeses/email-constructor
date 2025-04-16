import React from 'react';
import styles from "./TemplateEditor.module.css";
import DeleteButton from "../../UI/Buttons/DeleteButton.jsx";
import {useSortable} from "@dnd-kit/sortable";
import DragButton from "../../UI/Buttons/DragButton.jsx";
import SlateEditor from "../../UI/Textareas/SlateEditor.jsx";
import ImageEditor from "./ImageEditor.jsx";

const EditorElement = ({changeType, block, deleteItem, handleTextChange, labelTextChange}) => {
    const {
        setNodeRef,
        transform,
        transition,
        listeners,
        attributes,
    } = useSortable({
        id: block.id,
    })

    const style = transform ? {
        transition,
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined


    return (
        <div style={style} ref={setNodeRef}>
            <div className={styles.form_elem} >
                {block.type === 'text' && <SlateEditor
                    blockId={block.id}
                    changeType={changeType}
                    value={block.text}
                    onChange={newText => handleTextChange(block.id, newText)}
                />}
                {block.type === 'image' && <ImageEditor
                    block={block}
                    labelTextChange={newText => labelTextChange(block.id, newText)}
                />}
                <DeleteButton deleteFunc={() => deleteItem(block.id)}/>
                <DragButton {...attributes} {...listeners}/>
            </div>
        </div>

    );
};

export default EditorElement;