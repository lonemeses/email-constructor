import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    username: '',
    isAuth: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logIn: (state) => {
            state.isAuth = true;
        },
        logOut: (state) => {
            state.username = '';
            state.isAuth = false;
        },
        setUsername: (state, action) => {
            state.username = action.payload;
        }
    }
})

export default userSlice.reducer;