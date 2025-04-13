import React, {useState} from 'react';
import Header from "./components/Header/Header.jsx";
import './App.css'
import TemplateEditor from "./components/TemplateEditor/TemplateEditor.jsx";
import {closestCorners, DndContext, MouseSensor, useSensor, useSensors} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";
import Modal from "./components/Modal/Modal.jsx";
import TemplatePreview from "./components/TemplatePreview/TemplatePreview.jsx";
import SaveModal from "./components/Modal/SaveModal.jsx";
import {fakeAxiosPostTemplate} from "./httpEmulation/index.js";
import {toast, ToastContainer} from "react-toastify";
import SideBar from "./components/SideBar/SideBar.jsx";
import UpdateModal from "./components/Modal/UpdateModal.jsx";


const App = () => {
    const [templates, setTemplates] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [isSideActive, setIsSideActive] = useState(true);
    const [selectedTemplate, setSelectedTemplate] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const [isModal, setIsModal] = useState(false)
    const [modalType, setModalType] = useState(null)
    const getPos = id => blocks.findIndex(block => block.id === id);

    const openModal = (type) => {
        setModalType(type)
        setIsModal(true)
    }
    const editBtnClick = () => {
        setModalType(null)
        setIsModal(false)
        setIsUpdate(true)
        setBlocks(selectedTemplate.data)
    }
    const closeModal = () => {
        setModalType(null)
        setIsModal(false)
    }

    const saveTemplate = async (name) => {
        setIsPending(true)
        let newTemplates
        if (isUpdate) {
            newTemplates = templates.map((template) =>
                template.id === selectedTemplate.id
                    ? { ...template, name:name, data: blocks }
                    : template
            );
        } else {
            newTemplates = [...templates, {id: templates.length+1, name: name, data: blocks}]
        }
        setSelectedTemplate([])
        setIsUpdate(false)
        setModalType(null)
        setIsModal(false)
        try {
            const response = await toast.promise(fakeAxiosPostTemplate(newTemplates), {
                pending: 'Сохраняем шаблон',
                success: 'Шаблон сохранен!',
                error: 'Не удалось сохранить шаблон'
            })
            console.log(response.data.templates)
            setTemplates(newTemplates)
            setBlocks([])
            setIsPending(false)
        } catch (e) {
            console.log(e)
        }
    }
    const cardClick = (template) => {
        setIsModal(true)
        setModalType('edit')
        setSelectedTemplate(template)
    }

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10,
                delay: 2
            }
        })
    )
    const handleDragOver = (event) => {
        const {active, over} = event;

        if (active.id === over.id) return;

        setBlocks(blocks => {
            const originalPos = getPos(active.id);
            const newPos = getPos(over.id)

            return arrayMove(blocks, originalPos, newPos)
        })
    }


    return (
        <div className='app'>
            <DndContext collisionDetection={closestCorners} onDragEnd={handleDragOver} sensors={sensors}>
                {isModal &&
                    <Modal onClose={closeModal} >
                        {modalType === 'preview' && <TemplatePreview blocks={blocks} name={"Предпросмотр шаблона"}/> }
                        {modalType === 'edit' && <TemplatePreview blocks={selectedTemplate.data} name={selectedTemplate.name} isEdit={true} onClick={editBtnClick}/>}
                        {modalType === 'save' && <SaveModal onSave={saveTemplate}/>}
                        {modalType === 'update' && <UpdateModal prevName={selectedTemplate.name} onSave={saveTemplate}/>}
                    </Modal>}
                <Header menuActive={isSideActive} setMenuActive={setIsSideActive}/>
                <ToastContainer style={{top: "50px"}}/>
                <TemplateEditor blocks={blocks} setBlocks={setBlocks} openModalFunc={openModal} isUpdate={isUpdate} isPending={isPending}/>
            </DndContext>
            <SideBar active={isSideActive} templates={templates} onClick={cardClick}/>
        </div>
    );
};

export default App;