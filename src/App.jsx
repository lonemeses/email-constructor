import React, {useEffect} from 'react';
import Header from "./components/Header/Header.jsx";
import './App.css'
import TemplateEditor from "./components/TemplateEditor/TemplateEditor.jsx";
import {closestCenter, DndContext, MouseSensor, useSensor, useSensors} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";
import Modal from "./components/Modal/Modal.jsx";
import {ToastContainer} from "react-toastify";
import SideBar from "./components/SideBar/SideBar.jsx";
import {restrictToVerticalAxis} from "@dnd-kit/modifiers";
import {useDispatch, useSelector} from "react-redux";
import {editorSlice} from "./store/Slices/editorSlice.js";
import {getTemplates} from "./httpEmulation/index.js";
import {templatesSlice} from "./store/Slices/templatesSlice.js";


const App = () => {
    const {blocks} = useSelector(state => state.editor)
    const {isModal} = useSelector(state => state.ui)
    const {setTemplates} = templatesSlice.actions
    const dispatch = useDispatch();
    const { moveBlocks} = editorSlice.actions
    const getPos = id => blocks.findIndex(block => block.id === id);//функция для вычисления позиции для Dnd-kit

    useEffect(() => {
        dispatch(getTemplates()).then(res => console.log(res))
    }, [dispatch, setTemplates]);
    //сенсоры для dnd
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10,
                delay: 2
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
        <div className='app'>
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragOver}
                sensors={sensors}
                modifiers={[restrictToVerticalAxis]}
            >
                {isModal && <Modal/>}
                <Header/>
                <ToastContainer style={{top: "50px"}}/>
                <TemplateEditor/>
            </DndContext>
            <SideBar/>
        </div>
    );
};

export default App;