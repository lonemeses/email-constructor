import React from 'react';
import styles from "./TemplateEditor.module.css";
import DeleteButton from "../../UI/Buttons/DeleteButton.jsx";
import {useSortable} from "@dnd-kit/sortable";
import DragButton from "../../UI/Buttons/DragButton.jsx";
import SlateEditor from "../../UI/Textareas/SlateEditor.jsx";
import ImageEditor from "./ImageEditor.jsx";
import {editorSlice} from "../../store/Slices/editorSlice.js";
import {useDispatch} from "react-redux";

const EditorElement = ({ block}) => {
    const {deleteBlock, changeBlock} = editorSlice.actions
    const dispatch = useDispatch();
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

    const deleteItem = () => {
        dispatch(deleteBlock(block.id))
    }

    const handleTextChange = (newText) => {
        const copied = JSON.parse(JSON.stringify(newText));
        console.log(copied)
        dispatch(changeBlock({id: block.id, type: 'text', data: copied}))
    }

    const labelTextChange = (newText) => {
        dispatch(changeBlock({id: block.id, type: 'label', data: newText}))
    }

    return (
        <div style={style} ref={setNodeRef}>
            <div className={styles.form_elem} >
                {block.type === 'text' && <SlateEditor
                    value={block.text}
                    onChange={newText => handleTextChange(newText)}
                />}
                {block.type === 'image' && <ImageEditor
                    block={block}
                    labelTextChange={newText => labelTextChange(newText)}
                />}
                <DeleteButton deleteFunc={deleteItem}/>
                <DragButton {...attributes} {...listeners}/>
            </div>
        </div>

    );
};

export default EditorElement;