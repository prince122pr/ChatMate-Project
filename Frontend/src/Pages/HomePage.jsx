import { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { FaRobot } from "react-icons/fa";
import Chat from "../components/Chat";
import { useDispatch, useSelector } from "react-redux";
import { createNewChat, getAllUserChats } from "../redux/actions/chatActions";
import {toast} from "react-toastify"
import { getChatMessages } from "../redux/actions/messageActions";
import { API } from "../axios/axios";
import { socket } from "../socket/socket";

const HomePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.userData);
  const allChats = useSelector((store) => store.chats.allUserChats);

  useEffect(() => {
    if (user) dispatch(getAllUserChats());
  }, [dispatch, user]);

  const [selectedChat, setSelectedChat] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleNewChat = async() => {
     const title = prompt("Enter chat title:");
  if (!title) return;

    try {
    // Dispatch Redux action instead of local push
    await dispatch(createNewChat(title));
    toast.success("New Chat Created")
    } catch (error) {
       console.log(error);
      toast.error("New Chat Creation Failed!")
    }
  };

  const handleSelectedChat = async(chatId) => {
    try {
      setSelectedChat(chatId)
      let res = await dispatch(getChatMessages(chatId));
      setMessages(res)
    } catch (error) {
      console.log(error);
      setMessages([])
    }
  }

  const handleSend = async(chatId) => {
    if (!input.trim()) return;

    const newMessage = {
    content: input,
    role: "user",
    chat: chatId,
    user: user._id,
     _id: Date.now(), // temporary ID for UI
  };
    setInput("");
    setMessages([...messages, newMessage]); // show immediately
    //send message to backend / socket  
    try {
         const res = await API.post("/chat/sendMessage", {
      content: input,
      role: "user",
      chat: chatId,
      user: user._id,
    });

     const savedMessage = res.data.chatMessage;

      // Replace temporary message with saved message
    setMessages((prev) =>
      prev.map((msg) => (msg._id === newMessage._id ? savedMessage : msg))
    );

    // Send message to backend
  socket.emit("ai-message", { chatID: chatId, content: newMessage.content, tempId: newMessage._id });

    } catch (error) {
       console.error(error);
    }
    
  };

  return (
    <div className="flex h-[100dvh] pt-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
      {/* Sidebar */}
      <aside className="w-16 sm:w-64 flex-shrink-0 bg-black/40 backdrop-blur-lg border-r border-white/10 flex flex-col">
        <div className="flex items-center justify-between p-2 sm:p-4 border-b border-white/10">
          <span className="hidden sm:block text-lg font-bold text-white tracking-wide">
            Chats
          </span>
          <button
            className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-tr from-green-400 via-blue-500 to-purple-600 text-white hover:scale-105 transition"
            onClick={handleNewChat}
            title="New Chat"
          >
            <FiPlus size={22} />
          </button>
        </div>
        <nav className="overflow-y-auto py-2 flex flex-col-reverse ">
          {allChats?.map((chat) => (
            <button
              key={chat._id}
              className={`cursor-pointer w-full flex items-center gap-2 px-2 sm:px-4 py-3 text-left text-white rounded-lg transition 
                ${
                  selectedChat === chat._id
                    ? "bg-white/20 font-semibold"
                    : "hover:bg-white/10"
                }`}
              onClick={()=>handleSelectedChat(chat._id)}
            >
              <FaRobot className="text-green-300" />
              <span className="hidden sm:inline truncate">{chat.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Chat Section */}
      <main className="flex-1 flex flex-col h-full">
        <Chat
          selectedChat={selectedChat}
          messages={messages}
          setMessages={setMessages}
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          chats={allChats}
        />
      </main>
    </div>
  );
};

export default HomePage;
