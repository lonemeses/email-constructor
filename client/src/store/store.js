import {combineReducers, configureStore} from "@reduxjs/toolkit";
import templatesReducer from './Slices/templatesSlice.js'
import editorReducer from "./Slices/editorSlice.js";
import uiReducer from './Slices/uiSlice.js'
import userReducer from './Slices/userSlice.js'


const rootReducer = combineReducers({
    templates : templatesReducer,
    editor: editorReducer,
    ui: uiReducer,
    user: userReducer
})

export const store = configureStore({
    reducer: rootReducer,
})

