import React from 'react';
import styles from "./TemplatePreview.module.css"
import HoveringBigButtons from "../../UI/Buttons/HoveringBigButtons.jsx";
import TextPreview from "./TextPreview.jsx";
import ImagePreview from "./ImagePreview.jsx";
const TemplatePreview = ({blocks, name, isEdit, onClick}) => {
    const template = [blocks]

    return (
        <div className={styles.preview_container}>
            <h3>{name}</h3>
            {blocks.map(block =>
                <div key={block.id}>
                    {block.type === 'text' && (
                        <div className={styles.preview_text}>
                            <TextPreview value={block.text} />
                        </div>
                    )}
                    {block.type === 'image' && <ImagePreview block={block} />}
                </div>
            )}
            {isEdit &&
            <div className={styles.end_btns}>
                <HoveringBigButtons type={'edit'} clickFunc={() => onClick(template)}>
                    Редактировать шаблон
                </HoveringBigButtons>
            </div>}
        </div>
    );
};

export default TemplatePreview;