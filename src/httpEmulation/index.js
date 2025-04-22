import {addTemplate, editTemplate, setTemplates} from "../store/Slices/templatesSlice.js";
import {setIsPending, setModal} from "../store/Slices/uiSlice.js";
import {setBlocks, setIsUpdate, setSelectedTemplate} from "../store/Slices/editorSlice.js";

const mockTemplates = [
    {
        id: 1,
        name: 'рыбы',
        template: [
            {id: 1, type: 'text', text: [{type: 'heading-one', children: [{text: 'Сколько рыб есть в мире?'}]}]},
            {id: 2, type: 'image', src: 'https://avatars.mds.yandex.net/i?id=d3b67a295b7bb9aa0edfd92fcf9d2b6e_l-10109607-images-thumbs&n=13', label: 'Рыба-даун'},
            {id: 3, type: "text", text: [{type: 'heading-two', children: [{text: 'Сколько рыб-даунов водится в России?'}]}]},
            {id: 4, type: 'text', text: [{type: 'paragraph', children: [{text: 'По нашим'}, {text: 'скромным', bold: true}, {text: 'подсчётам, в России около тысячи рыб даунов'}]}]}
        ]
    },
    {
        id: 2,
        name: 'котёнок',
        template: [
            {id: 1, type: 'image', src: 'https://i.pinimg.com/736x/80/c1/e3/80c1e352cf033fbc258efcc88949c45e.jpg', label: 'Это просто котёнок'},
            {id: 2, type: "text", text: [{type: 'heading-one', children: [{text: 'Это'}, {text: 'упоротый', italic: true}, {text: 'котёнок', underline: true}]}]}
        ]
    }
]


export const getTemplates = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                dispatch(setTemplates(mockTemplates));
                resolve({
                    status: 200,
                    data: mockTemplates
                })
                reject({
                    status: 400,
                    message: 'Не удалось загрузить шаблоны'
                })
            }, 2000)
        })
    }
}

export const postTemplate = (name) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            const state = getState()
            const isUpdate = state.editor.isUpdate
            const templates = state.templates.templates
            const selectedTemplate = state.editor.selectedTemplate
            const blocks = state.editor.blocks
            dispatch(setIsPending(true))
            dispatch(setModal(null))
            setTimeout(() => {
                if (isUpdate) {
                    dispatch(editTemplate({id: selectedTemplate.id, name: name, template: blocks}))
                    dispatch(setIsUpdate(false))
                } else {
                    dispatch(addTemplate({id: templates.length + 1, name: name, template: blocks}))
                }
                dispatch(setBlocks([]))
                dispatch(setSelectedTemplate(null))
                dispatch(setIsPending(false))
                resolve({
                    status: 200,
                    data: getState().templates
                })
                reject({
                    status: 400,
                    message: 'Не удалось загрузить шаблон'
                })
            }, 2000)
        })
    }
}

