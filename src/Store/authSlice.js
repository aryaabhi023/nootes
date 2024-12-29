import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    status: false,
    avtar:null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.status = true;
            state.avtar=action.payload.avtar;
        },
        logout: (state) => {
            state.user = null;
            state.status = false;
            state.avtar=null;
        }
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

