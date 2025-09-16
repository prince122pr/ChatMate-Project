import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allUserChats : null
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers:{
        setAllChats : (state, action)=>{
            state.allUserChats = action.payload
        }
    }
})

export const {setAllChats} = chatSlice.actions
export default chatSlice.reducer
