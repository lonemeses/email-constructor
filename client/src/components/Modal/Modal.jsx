import React from 'react';
import CloseButton from "../../UI/Buttons/CloseButton.jsx";
import styles from './Modal.module.css'
import {useDispatch, useSelector} from "react-redux";
import TemplatePreview from "../TemplatePreview/TemplatePreview.jsx";
import SaveModal from "./SaveModal.jsx";
import ImageUploader from "./ImageUploader.jsx";
import {uiSlice} from "../../store/Slices/uiSlice.js";
import {editorSlice} from "../../store/Slices/editorSlice.js";

const Modal = () => {
    const {modalType} = useSelector(state => state.ui)
    const {setSelectedTemplate} = editorSlice.actions
    const {setModal} = uiSlice.actions;
    const dispatch = useDispatch()
    const closeModal = () => {
        dispatch(setModal(null))
        dispatch(setSelectedTemplate(null))
    }
    let children
    switch (modalType) {
        case 'preview':
            children = <TemplatePreview />
            break;
        case 'save':
            children = <SaveModal />
            break
        case 'image':
            children = <ImageUploader />
            break;
    }
    return (
        <div className={styles.modal_backdrop} onClick={closeModal}>
            <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
                {children}
                <div className={styles.close_btn}>
                    <CloseButton onClick={closeModal}/>
                </div>
            </div>
        </div>
    );
};

export default Modal;