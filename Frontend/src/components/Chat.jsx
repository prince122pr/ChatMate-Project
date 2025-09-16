import { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { FaRobot, FaUserCircle } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import emojiDictionary from "emoji-dictionary";
import { socket } from "../socket/socket";
import { v4 as uuidv4 } from "uuid";

const Chat = ({ selectedChat, setMessages, messages, input, setInput, handleSend, chats }) => {
  const [aiTyping, setAiTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, aiTyping]);

  // Socket listener for AI response
  useEffect(() => {
    socket.on("ai-response", (data) => {
      setAiTyping(false); // AI finished typing
      const aiMessage = {
        content: data.content,
        role: "model",
        chat: data.chat,
        _id: uuidv4(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    });

    return () => socket.off("ai-response");
  }, [setMessages]);

  // Parse :emoji: style into actual emoji
  const parseEmojis = (text) =>
    text.replace(/:([a-z_]+):/g, (_, name) => emojiDictionary.getUnicode(name) || _);

  // Handle sending message
 const onSend = (e) => {
  e.preventDefault();
  if (!input.trim()) return;

  const tempId = Date.now(); // only once
  const userMessage = {
    content: input,
    role: "user",
    chat: selectedChat,
    _id: tempId, // pass this tempId to backend
  };

  setMessages(prev => [...prev, userMessage]);
  setInput("");

  setAiTyping(true);

  handleSend(selectedChat, input, tempId); // pass tempId here
};


  return (
    <>
      {/* Chat Header */}
      <div className="px-4 py-3 border-b border-white/10 bg-black/30 flex items-center gap-2">
        <FaRobot className="text-green-300" />
        <span className="text-white font-semibold text-base sm:text-lg truncate">
          {chats?.find((c) => c._id === selectedChat)?.title || "New Chat"}
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-8 py-4 space-y-4">
        {messages.length === 0 && !aiTyping && (
          <div className="text-center text-indigo-100 opacity-70 mt-10">
            Start the conversation!
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] sm:max-w-[60%] px-4 py-3 rounded-2xl shadow flex flex-col
                ${msg.role === "user"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-br-none"
                  : "bg-white/20 text-white rounded-bl-none border border-white/10"
                }`}
            >
              {msg.role === "model" && (
                <FaRobot className="text-green-300 mr-2 hidden sm:inline" />
              )}

              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ node, ...props }) => (
                    <p className="text-sm sm:text-base whitespace-pre-line" {...props} />
                  ),
                  li: ({ node, ...props }) => <li className="ml-4 list-disc" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                  em: ({ node, ...props }) => <em className="italic" {...props} />,
                }}
              >
                {parseEmojis(msg.content)}
              </ReactMarkdown>

              {msg.role === "user" && (
                <FaUserCircle className="text-blue-200 hidden sm:inline" />
              )}
            </div>
          </div>
        ))}

        {/* AI Typing Indicator */}
        {aiTyping && (
          <div className="flex justify-start">
            <div className="max-w-[60%] px-4 py-3 rounded-2xl shadow bg-white/20 text-white border border-white/10 flex items-center gap-2 animate-pulse">
              <FaRobot className="text-green-300 mr-2 hidden sm:inline" />
              <span>AI is typing...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef}></div>
      </div>

      {/* Input */}
      <form
        onSubmit={onSend}
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
