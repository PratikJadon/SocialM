import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import socketReducer from './Slices/socketSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        socket: socketReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['socket/socketInit'],
                // Ignore these field paths in all actions
                ignoredActionPaths: ['payload.socket'],
                // Ignore these paths in the state
                ignoredPaths: ['socket.socket'],
            },
        }),
});

export default store;