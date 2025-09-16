import { API } from "../../axios/axios";
import { setChatMessages } from "../slices/messageSlice";

export const getChatMessages = (chatId, page = 1, limit = 10) => async (dispatch) => {
  try {
    const res = await API.get(
      `/chat/getChatMessages/${chatId}?page=${page}&limit=${limit}`
    );

    // console.log("Fetched messages:", res.data.chatMessages);
    let messages = res.data.chatMessages
    dispatch(setChatMessages(messages));
    return messages;

  } catch (error) {
    console.error("Failed to fetch messages:", error);
    dispatch(setChatMessages([])); // optional: clear messages on error
  }
};


export const getRes = () => async () => {
    
}