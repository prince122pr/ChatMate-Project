import { useState } from "react";
import { FiPlus, FiSend } from "react-icons/fi";
import { FaRobot, FaUserCircle } from "react-icons/fa";

const demoChats = [
  { id: 1, title: "Math Help" },
  { id: 2, title: "Travel Ideas" },
  { id: 3, title: "Project Discussion" },
];

const demoMessages = [
  { id: 1, role: "user", content: "Hello, can you help me with math?" },
  {
    id: 2,
    role: "ai",
    content: "Of course! What math topic do you need help with?",
  },
  { id: 3, role: "user", content: "Algebra basics." },
  {
    id: 4,
    role: "ai",
    content:
      "Sure! Algebra is about finding the unknown or putting real-life variables into equations and then solving them.",
  },
];

const HomePage = () => {
  const [chats, setChats] = useState(demoChats);
  const [selectedChat, setSelectedChat] = useState(demoChats[0].id);
  const [messages, setMessages] = useState(demoMessages);
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
        {/* Chat Header */}
        <div className="px-4 py-3 border-b border-white/10 bg-black/30 flex items-center gap-2">
          <FaRobot className="text-green-300" />
          <span className="text-white font-semibold text-base sm:text-lg truncate">
            {chats.find((c) => c.id === selectedChat)?.title || "New Chat"}
          </span>
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-2 sm:px-8 py-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-indigo-100 opacity-70 mt-10">
              Start the conversation!
            </div>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] sm:max-w-[60%] px-4 py-3 rounded-2xl shadow 
                  ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-br-none"
                      : "bg-white/20 text-white rounded-bl-none border border-white/10"
                  } flex items-end gap-2`}
              >
                {msg.role === "ai" && (
                  <FaRobot className="text-green-300 mr-2 hidden sm:inline" />
                )}
                <span className="whitespace-pre-line text-sm sm:text-base">
                  {msg.content}
                </span>
                {msg.role === "user" && (
                  <FaUserCircle className="text-blue-200 ml-2 hidden sm:inline" />
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Input */}
        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 px-2 sm:px-8 py-4 bg-black/30 border-t border-white/10"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-blue-400 transition text-sm sm:text-base"
          />
          <button
            type="submit"
            className="p-3 rounded-xl bg-gradient-to-tr from-green-400 via-blue-500 to-purple-600 text-white hover:scale-105 transition"
            title="Send"
          >
            <FiSend size={22} />
          </button>
        </form>
      </main>
    </div>
  );
};

export default HomePage;
