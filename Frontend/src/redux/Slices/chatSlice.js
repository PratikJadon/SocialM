import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messageAlert: [],
        currentChatId: null
    },
    reducers: {
        setMessageAlert: (state, action) => {
            let index = state.messageAlert.findIndex(alert => alert.chatId === action.payload.chatId)
            if (index != -1) {
                state.messageAlert[index].count += 1;
                state.messageAlert[index].lastMessage = action.payload.lastMessage
            } else {
                state.messageAlert.push({
                    count: 1,
                    lastMessage: action.payload.lastMessage,
                    chatId: action.payload.chatId
                })
            }
        },
        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload.chatId
        },
        clearMessageAlert: (state, action) => {
            let index = state.messageAlert.findIndex(alert => alert.chatId === action.payload.chatId)
            if (index !== -1) {
                state.messageAlert.splice(index, 1);
            }
        }
    },
});

export const { setMessageAlert, setCurrentChatId, clearMessageAlert } = chatSlice.actions;

export default chatSlice.reducer;
