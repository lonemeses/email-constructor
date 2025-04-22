import {combineReducers, configureStore} from "@reduxjs/toolkit";
import templatesReducer from './Slices/templatesSlice.js'
import editorReducer from "./Slices/editorSlice.js";
import uiReducer from './Slices/uiSlice.js'


const rootReducer = combineReducers({
    templates : templatesReducer,
    editor: editorReducer,
    ui: uiReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})

