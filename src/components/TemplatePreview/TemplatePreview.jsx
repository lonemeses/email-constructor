import React from 'react';
import styles from "./TemplatePreview.module.css"
import PreviewSaveButton from "../../UI/Buttons/PreviewSaveButton.jsx";
const TemplatePreview = ({blocks, name, isEdit, onClick}) => {

    const template = [blocks]

    return (
        <div className={styles.preview_container}>
            <h3>{name}</h3>
            {blocks.map(block =>
                <div key={block.id}>
                    {block.type === 'text' && <div className={styles.preview_text}><p >{block.text}</p></div>}
                    {block.type === 'image' && <div ><img src={block.src} alt={block.src} className={styles.preview_img}/></div>}
                </div>
            )}
            {isEdit &&
            <div className={styles.end_btns}>
                <PreviewSaveButton type={'edit'} variant={"hidden"} clickFunc={() => onClick(template)}>
                    Редактировать шаблон
                </PreviewSaveButton>
            </div>}
        </div>
    );
};

export default TemplatePreview;