import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    isUpdate: false,
    blocks: [],
    selectedTemplate: null
}

export const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        setIsUpdate: (state, action) => {
            state.isUpdate = action.payload
        },
        addBlock: (state, action) => {
            state.blocks.push(action.payload)
        },
        setBlocks: (state, action) => {
            state.blocks = action.payload
        },
        setSelectedTemplate: (state, action) => {
            state.selectedTemplate = action.payload
        },
        moveBlocks: (state, action) => {
            state.blocks = action.payload
        },
        changeBlock: (state, action) => {
            const index = state.blocks.findIndex(block => block.id === action.payload.id)
            if (action.payload.type === 'label') {
                state.blocks[index].label = action.payload.data
            } else {
                state.blocks[index].text = action.payload.data
            }
        },
        deleteBlock: (state, action) => {
            state.blocks = state.blocks.filter(block => block.id !== action.payload)
        }
    }
})
export const {setSelectedTemplate, setBlocks, setIsUpdate} = editorSlice.actions
export default editorSlice.reducer