import { FiSend } from "react-icons/fi";
import { FaRobot, FaUserCircle } from "react-icons/fa";

const Chat = ({
  selectedChat,
  messages,
  input,
  setInput,
  handleSend,
  chats,
}) => {
  return (
    <>
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
    </>
  );
};

export default Chat;
