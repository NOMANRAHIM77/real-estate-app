import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../context/AuthContext";
import { SocketContext } from "../context/SocketContext";
import { useNotificationStore } from "../lib/notificationStore";
import apiRequest from "../lib/apiRequest";
import { format } from "timeago.js";

const schema = z.object({
  text: z.string().min(1, "Message cannot be empty"),
});

function Chat({ chats = [] }) {
  const [chat, setChat] = useState(null);
  const messageEndRef = useRef();

  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const { decrease, reset } = useNotificationStore();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Auto scroll to latest message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // LISTEN FOR INCOMING REAL-TIME MESSAGES
  useEffect(() => {
    if (!socket) return;

    const handleIncomingMessage = (data) => {
      if (chat && chat.id === data.chatId) {
        // Chat is open — append message directly, no badge needed
        setChat((prev) => ({
          ...prev,
          messages: [...prev.messages, data],
        }));
        // Mark as seen immediately since user is looking at it
        apiRequest.post("/chats/read/" + chat.id).catch(console.log);
      }
      // If chat is closed or different chat, Navbar fetches count from DB
      // so we don't manually increment here — the DB is source of truth
    };

    socket.on("getMessage", handleIncomingMessage);

    return () => {
      socket.off("getMessage", handleIncomingMessage);
    };
  }, [socket, chat]);

  // OPEN CHAT — reset notification for this chat
  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest.get("/chats/" + id);
      setChat({ ...res.data, receiver });
      // Decrease badge by 1 since user opened an unseen chat
      decrease();
    } catch (err) {
      console.log("OPEN CHAT ERROR:", err);
    }
  };

  // SEND MESSAGE
  const onSubmit = async (data) => {
    if (!chat) return;

    try {
      const res = await apiRequest.post("/messages/" + chat.id, {
        text: data.text,
      });

      // Append message locally for the sender
      setChat((prev) => ({
        ...prev,
        messages: [...prev.messages, res.data],
      }));

      // Emit to socket with chatId so receiver can match it
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: { ...res.data, chatId: chat.id },
      });

      resetForm();
    } catch (err) {
      console.log("SEND MESSAGE ERROR:", err);
    }
  };

return (
  <div className="h-full flex flex-col gap-3">

    {/* CHAT LIST */}
    <div className={`flex flex-col gap-2 overflow-y-auto transition-all duration-300 ${chat ? "max-h-[220px]" : "flex-1"}`}>
      {chats.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-5xl mb-4">💬</div>
          <p className="text-gray-500 font-medium">No messages yet</p>
          <p className="text-gray-400 text-sm mt-1">Start a conversation from a listing</p>
        </div>
      ) : (
        chats.map((c) => {
          const isUnseen = !c.seenBy?.includes(currentUser.id);
          return (
            <div
              key={c.id}
              onClick={() => handleOpenChat(c.id, c.receiver)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.01] border
                ${isUnseen
                  ? "bg-zinc-800 border-yellow-500/40 shadow-md shadow-yellow-900/10"
                  : "bg-zinc-900 border-zinc-700/50 hover:bg-zinc-800"
                }
              `}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={c.receiver?.avatar || "/noavatar.png"}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-zinc-600"
                />
                {isUnseen && (
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-yellow-400 rounded-full border-2 border-zinc-900" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className={`text-sm truncate ${isUnseen ? "font-bold text-white" : "font-semibold text-zinc-300"}`}>
                  {c.receiver?.username}
                </div>
                <div className={`text-xs truncate mt-0.5 ${isUnseen ? "text-zinc-300 font-medium" : "text-zinc-500"}`}>
                  {c.lastMessage || "No messages yet"}
                </div>
              </div>

              {/* Unseen dot */}
              {isUnseen && (
                <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full flex-shrink-0" />
              )}
            </div>
          );
        })
      )}
    </div>

    {/* CHAT BOX */}
    {chat && (
      <div className="flex-1 flex flex-col rounded-2xl overflow-hidden border border-zinc-700 shadow-2xl shadow-black/40 min-h-0 bg-zinc-900">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-800 border-b border-zinc-700 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={chat.receiver?.avatar || "/noavatar.png"}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-yellow-400/50"
              />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-zinc-800" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">{chat.receiver?.username}</p>
              <p className="text-xs text-green-400">Active now</p>
            </div>
          </div>
          <button
            onClick={() => setChat(null)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-700 hover:bg-zinc-600 transition text-zinc-300 hover:text-white font-bold text-sm"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-zinc-900 min-h-0
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-zinc-900
          [&::-webkit-scrollbar-thumb]:bg-zinc-700
          [&::-webkit-scrollbar-thumb]:rounded-full"
        >
          {chat.messages?.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 text-sm gap-2 py-8">
              <span className="text-3xl">👋</span>
              <span>Say hello to get started!</span>
            </div>
          )}
          {chat.messages?.map((msg) => {
            const isMine = String(msg.userId) === String(currentUser.id);
            return (
              <div key={msg.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                <div
                  className={`px-4 py-2.5 rounded-2xl max-w-[75%] text-sm shadow-lg
                    ${isMine
                      ? "bg-[#fece51] text-gray-900 rounded-br-sm shadow-yellow-900/20"
                      : "bg-zinc-800 text-zinc-100 rounded-bl-sm border border-zinc-700"
                    }
                  `}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                  <p className={`text-[10px] mt-1.5 ${isMine ? "text-yellow-700 text-right" : "text-zinc-500"}`}>
                    {format(msg.createdAt)}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messageEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-end gap-2 p-3 bg-zinc-800 border-t border-zinc-700 flex-shrink-0"
        >
          <textarea
            {...register("text")}
            placeholder="Type a message..."
            rows={1}
            className="flex-1 px-4 py-2.5 bg-zinc-700 rounded-xl outline-none resize-none text-sm text-zinc-100 placeholder-zinc-500 focus:bg-zinc-600 transition-colors max-h-[100px]
              [&::-webkit-scrollbar]:w-1
              [&::-webkit-scrollbar-thumb]:bg-zinc-500
              [&::-webkit-scrollbar-thumb]:rounded-full"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(onSubmit)();
              }
            }}
          />
          <button
            type="submit"
            className="flex-shrink-0 w-10 h-10 bg-[#fece51] hover:bg-yellow-400 rounded-xl flex items-center justify-center transition-all hover:scale-105 shadow-lg shadow-yellow-900/30"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-900 rotate-90">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </form>

        {errors.text && (
          <p className="text-red-400 text-xs px-4 pb-2 bg-zinc-800">{errors.text.message}</p>
        )}
      </div>
    )}
  </div>
);
}

export default Chat;