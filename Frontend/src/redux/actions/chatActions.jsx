import { API } from "../../axios/axios"
import { setAllChats } from "../slices/chatSlice";

export const getAllUserChats = () => async (dispatch) => {
   try {
    const res = await API.get('/chat/getAllUserChats')
    const chats = res.data.chats;
    dispatch(setAllChats(chats))

   } catch (error) {
     console.log(error);
     dispatch(setAllChats([]))
   }
}

export const createNewChat = (title) => async (dispatch) => {
    try {
        await API.post('/chat/create-chat', {title});
        dispatch(getAllUserChats());
    } catch (error) {
        console.log(error);
        
    }
}