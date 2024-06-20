// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        socket: null,
    },
    reducers: {
        socketInit: (state, action) => {
            state.socket = action.payload
        },
        socketUninit: (state, action) => {
            state.socket = null
        }
    },
});

export const { socketInit, socketUninit } = socketSlice.actions;

export default socketSlice.reducer;
