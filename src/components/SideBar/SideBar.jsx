import React from 'react';
import styles from './SideBar.module.css'
import TemplateCard from "./TemplateCard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {editorSlice} from "../../store/Slices/editorSlice.js";
import {uiSlice} from "../../store/Slices/uiSlice.js";

const SideBar = () => {
    const {isSideActive} = useSelector(state => state.ui)
    const {templates} = useSelector(state => state.templates)
    const {setSelectedTemplate, setIsUpdate} = editorSlice.actions
    const {setModal} = uiSlice.actions
    const dispatch = useDispatch();
    const onClick = (template) => {
        dispatch(setSelectedTemplate(template))
        dispatch(setIsUpdate(true))
        dispatch(setModal('preview'))
    }
    return (
        <div className={isSideActive ? styles.side_wrapper_active : styles.side_wrapper}>
            <div className={styles.side_content}>
                <div className={styles.side_title}>
                    Ваши шаблоны
                </div>
                <div>
                    {templates.map(template =>
                        <TemplateCard template={template} onClick={onClick} key={template.id}/>
                    )}
                </div>
                <div className={styles.side_plug}/>
            </div>

        </div>
    );
};

export default SideBar;