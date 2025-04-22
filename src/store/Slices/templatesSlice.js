import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    templates: [],
}

export const templatesSlice = createSlice({
    name: 'templates',
    initialState,
    reducers: {
        addTemplate: (state, action) => {
            state.templates.push(action.payload)
        },
        setTemplates: (state, action) => {
            state.templates = action.payload
        },
        editTemplate: (state, action) => {
            state.templates[action.payload.id - 1] = action.payload
        }
    }
})
export const {addTemplate, setTemplates, editTemplate} = templatesSlice.actions
export default templatesSlice.reducer