import React from 'react';
import styles from "./TemplatePreview.module.css"
import HoveringBigButtons from "../../UI/Buttons/HoveringBigButtons.jsx";
import TextPreview from "./TextPreview.jsx";
import ImagePreview from "./ImagePreview.jsx";
import {useDispatch, useSelector} from "react-redux";
import {uiSlice} from "../../store/Slices/uiSlice.js";
import {editorSlice} from "../../store/Slices/editorSlice.js";
const TemplatePreview = () => {
    const {blocks, isUpdate, selectedTemplate} = useSelector(state => state.editor)
    const {setModal} = uiSlice.actions
    const {setBlocks} = editorSlice.actions
    const dispatch = useDispatch();
    let componentBlocks
    if(selectedTemplate !== null) {
        componentBlocks = selectedTemplate.template
    } else {
        componentBlocks = blocks
    }
    const btnClick = () => {
        dispatch(setModal(null))
        dispatch(setBlocks(componentBlocks))
    }
    return (
        <div className={styles.preview_container}>
            <h3>Предпросмотр шаблона</h3>
            {componentBlocks.map(block =>
                <div key={block.id}>
                    {block.type === 'text' && (
                        <div className={styles.preview_text}>
                            <TextPreview value={block.text} />
                        </div>
                    )}
                    {block.type === 'image' && <ImagePreview block={block} />}
                </div>
            )}
            {isUpdate &&
            <div className={styles.end_btns}>
                <HoveringBigButtons type={'edit'} clickFunc={btnClick}>
                    Редактировать шаблон
                </HoveringBigButtons>
            </div>}
        </div>
    );
};

export default TemplatePreview;