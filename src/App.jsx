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
    const [templates, setTemplates] = useState([]); //State который хранит в себе шаблоны готовые шаблоны
    const [isUpdate, setIsUpdate] = useState(false); //true - если шаблон в редактировании
    const [isPending, setIsPending] = useState(false); //true - если промис в состоянии pending
    const [isSideActive, setIsSideActive] = useState(true);// состояние открытия/закрытия сайдбара
    const [selectedTemplate, setSelectedTemplate] = useState([]);//зранит выбранный в сайдбаре шаблон
    const [blocks, setBlocks] = useState([]);//структура шаблона
    const [isModal, setIsModal] = useState(false)//состояние модального окна
    const [modalType, setModalType] = useState(null)//тип модального окна
    const getPos = id => blocks.findIndex(block => block.id === id);//функция для вычисления позиции для Dnd-kit
    //функция открытия модального окна
    const openModal = (type) => {
        setModalType(type)
        setIsModal(true)
    }
    // функция включения редактирования шаблона
    const editBtnClick = () => {
        setModalType(null)
        setIsModal(false)
        setIsUpdate(true)
        setBlocks(selectedTemplate.data)
    }
    //функция закрытия модального окна
    const closeModal = () => {
        setModalType(null)
        setIsModal(false)
    }
    //функция сохранения шаблона
    const saveTemplate = async (name) => {
        setIsPending(true)
        let newTemplates
        //проверка редактируется готовый шаблон, или создаётся новый
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
    //функция нажатия на мини-карточку шаблона
    const cardClick = (template) => {
        setIsModal(true)
        setModalType('edit')
        setSelectedTemplate(template)
    }
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