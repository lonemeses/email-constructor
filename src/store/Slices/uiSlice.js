import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    isPending: false,
    isSideActive: false,
    isModal: false,
    modalType: null
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setModal: (state, action) => {
            state.isModal = action.payload !== null;
            state.modalType = action.payload
        },
        setSideActive: (state) => {
            state.isSideActive = !state.isSideActive
        },
        setIsPending: (state, action) => {
            state.isPending = action.payload
        }
    }
})
export const {setIsPending, setModal} = uiSlice.actions
export default uiSlice.reducer