import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chatMessages: []
}

const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        setChatMessages: (state, action) => {
            state.chatMessages = action.payload
        }
    }
})

export const {setChatMessages} = messageSlice.actions
export default messageSlice.reducer