import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { FaRobot } from "react-icons/fa";
import Chat from "../components/Chat";


const HomePage = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleNewChat = () => {
    const newId = Date.now();
    const newChat = { id: newId, title: `New Chat ${chats.length + 1}` };
    setChats([newChat, ...chats]);
    setSelectedChat(newId);
    setMessages([]);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([
      ...messages,
      { id: Date.now(), role: "user", content: input },
    ]);
    setInput("");
    // Here you would call your AI backend and append the AI response to messages
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
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-tr from-green-400 via-blue-500 to-purple-600 text-white hover:scale-105 transition"
            onClick={handleNewChat}
            title="New Chat"
          >
            <FiPlus size={22} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          {chats.map((chat) => (
            <button
              key={chat.id}
              className={`w-full flex items-center gap-2 px-2 sm:px-4 py-3 text-left text-white rounded-lg transition 
                ${
                  selectedChat === chat.id
                    ? "bg-white/20 font-semibold"
                    : "hover:bg-white/10"
                }`}
              onClick={() => setSelectedChat(chat.id)}
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
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          chats={chats}
        />
      </main>
    </div>
  );
};

export default HomePage;
