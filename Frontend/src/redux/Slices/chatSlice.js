import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messageAlert: [],
        currentChatId: null,
        chatLastMessage: []
    },
    reducers: {
        setChatLastMessage: (state, action) => {
            let chatToUpdateIndex = state.chatLastMessage.findIndex(chat => chat.chatId === action.payload.chatId)
            if (chatToUpdateIndex !== -1) {
                state.chatLastMessage[chatToUpdateIndex].lastMessage = action.payload.lastMessage
            } else {
                state.chatLastMessage.push({
                    chatId: action.payload.chatId,
                    lastMessage: action.payload.lastMessage
                })
            }
        },
        setMessageAlert: (state, action) => {
            if (action.payload.db) state.messageAlert = []
            let index = state.messageAlert.findIndex(alert => alert.chatId === action.payload.chatId)
            if (index != -1) {
                state.messageAlert[index].count += 1;
                state.messageAlert[index].lastMessage = action.payload.lastMessage
            } else {
                state.messageAlert.push({
                    count: action.payload.count || 1,
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
                const alert = state.messageAlert[index]
                state.messageAlert.splice(index, 1);
                let chatToUpdateIndex = state.chatLastMessage.findIndex(chat => chat.chatId === action.payload.chatId)
                if (chatToUpdateIndex !== -1) {
                    state.chatLastMessage[chatToUpdateIndex].lastMessage = alert.lastMessage
                } else {
                    state.chatLastMessage.push({
                        chatId: action.payload.chatId,
                        lastMessage: alert.lastMessage
                    })
                }
            }
        }
    },
});

export const { setMessageAlert, setCurrentChatId, clearMessageAlert, setChatLastMessage } = chatSlice.actions;

export default chatSlice.reducer;
