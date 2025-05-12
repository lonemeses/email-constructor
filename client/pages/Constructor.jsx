import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {templatesSlice} from "../src/store/Slices/templatesSlice.js";
import {editorSlice} from "../src/store/Slices/editorSlice.js";
import {closestCenter, DndContext, MouseSensor, TouchSensor, useSensor, useSensors} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";
import {restrictToVerticalAxis} from "@dnd-kit/modifiers";
import Modal from "../src/components/Modal/Modal.jsx";
import {ToastContainer} from "react-toastify";
import TemplateEditor from "../src/components/TemplateEditor/TemplateEditor.jsx";
import {getUser} from "../src/http/userAPI.js";
import {userSlice} from "../src/store/Slices/userSlice.js";
import {uiSlice} from "../src/store/Slices/uiSlice.js";

const Constructor = () => {
    const {blocks} = useSelector(state => state.editor)
    const {isModal} = useSelector(state => state.ui)
    const {setTemplates} = templatesSlice.actions
    const {setIsPending} = uiSlice.actions
    const {setUsername} = userSlice.actions
    const dispatch = useDispatch();
    const { moveBlocks, setIsUpdate, setBlocks, setSelectedTemplate} = editorSlice.actions
    const getPos = id => blocks.findIndex(block => block.id === id);//функция для вычисления позиции для Dnd-kit

    useEffect(() => {
        getUser().then(user => {
            dispatch(setUsername(user.data.username))
            dispatch(setTemplates(user.data.templates))
        });
        return () => {
            dispatch(setTemplates([]))
            dispatch(setIsPending(false))
            dispatch(setIsUpdate(false))
            dispatch(setBlocks([]))
            dispatch(setSelectedTemplate(null))
        }
    }, [dispatch, setTemplates, setUsername]);
    //сенсоры для dnd
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10,
                delay: 2
            }
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 5
            }
        })
    )
    //функция для окончания перетаскивания
    const handleDragOver = (event) => {
        const {active, over} = event;

        if (active.id === over.id) return;

        const originalPos = getPos(active.id);
        const newPos = getPos(over.id)

        const newBlocks =  arrayMove(blocks, originalPos, newPos)

        dispatch(moveBlocks(newBlocks))
    }
    return (
        <div>
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragOver}
                sensors={sensors}
                modifiers={[restrictToVerticalAxis]}
            >
                {isModal && <Modal/>}
                <ToastContainer style={{top: "50px"}}/>
                <TemplateEditor/>
            </DndContext>
        </div>
    );
};

export default Constructor;