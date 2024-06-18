// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload
        },
        logout: (state, action) => {
            state.user = null
        }
    },
});

export const { loginSuccess } = authSlice.actions;

export default authSlice.reducer;
