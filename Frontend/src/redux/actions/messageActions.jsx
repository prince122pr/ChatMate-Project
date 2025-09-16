import { API } from "../../axios/axios"

    export const getChatMessages = (chatId) => async(dispatch) => {
        try {

        const res = await API.get(`/chat/getChatMessages/${chatId}`);
        console.log(res);
        
            
        } catch (error) {
            console.log(error);
            
        }
    }