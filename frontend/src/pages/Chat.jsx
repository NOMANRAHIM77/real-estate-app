import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";
import { format } from "timeago.js";
import { SocketContext } from "../context/SocketContext";
import { useNotificationStore } from "../lib/notificationStore";

function Chat({ chats }) {
  const [chat, setChat] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext) || {};

  const messageEndRef = useRef();
  const decrease = useNotificationStore((state) => state.decrease);

  // Auto scroll
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  // OPEN CHAT
  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest("/chats/" + id);

      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease();
      }

      setChat({ ...res.data, receiver });
    } catch (err) {
      console.log(err);
    }
  };

  // SEND MESSAGE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!chat) return;

    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) return;

    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text });

      setChat((prev) => ({
        ...prev,
        messages: [...prev.messages, res.data],
      }));

      e.target.reset();

      socket?.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // SOCKET LISTENER (FIXED - no duplicate listeners)
  useEffect(() => {
    if (!socket || !chat) return;

    const handleMessage = (data) => {
      if (chat.id === data.chatId) {
        setChat((prev) => ({
          ...prev,
          messages: [...prev.messages, data],
        }));

        apiRequest.put("/chats/read/" + chat.id).catch(console.log);
      }
    };

    socket.on("getMessage", handleMessage);

    return () => {
      socket.off("getMessage", handleMessage);
    };
  }, [socket, chat?.id]);

  return (
    <div className="h-full flex flex-col">
      {/* MESSAGES LIST */}
      <div className="flex-1 flex flex-col gap-5 overflow-y-auto pr-2">
        <h1 className="text-3xl font-light">Messages</h1>

        {chats?.map((c) => (
          <div
            key={c.id}
            className={`p-5 rounded-lg flex items-center gap-5 cursor-pointer transition-colors ${
              c.seenBy.includes(currentUser.id) || chat?.id === c.id
                ? "bg-white"
                : "bg-[#fecd514e]"
            }`}
            onClick={() => handleOpenChat(c.id, c.receiver)}
          >
            <img
              src={c.receiver.avatar || "/noavatar.jpg"}
              className="w-10 h-10 rounded-full object-cover"
              alt=""
            />
            <span className="font-bold">{c.receiver.username}</span>
            <p className="text-gray-600 truncate">{c.lastMessage}</p>
          </div>
        ))}
      </div>

      {/* CHAT BOX */}
      {chat && (
        <div className="flex-1 bg-white flex flex-col justify-between rounded-t-xl shadow-lg mt-4 border border-gray-100">
          {/* TOP */}
          <div className="bg-[#f7c14b85] p-5 font-bold flex items-center justify-between rounded-t-xl">
            <div className="flex items-center gap-5">
              <img
                src={chat.receiver.avatar || "/noavatar.jpg"}
                className="w-8 h-8 rounded-full object-cover"
                alt=""
              />
              {chat.receiver.username}
            </div>

            <span
              className="cursor-pointer text-lg hover:scale-110 transition-transform"
              onClick={() => setChat(null)}
            >
              X
            </span>
          </div>

          {/* MESSAGES */}
          <div className="h-[350px] overflow-y-auto p-5 flex flex-col gap-5">
            {chat.messages.map((message) => {
              const isOwn = message.userId === currentUser.id;

              return (
                <div
                  key={message.id}
                  className={`w-1/2 flex flex-col gap-1 ${
                    isOwn ? "self-end text-right" : "self-start text-left"
                  }`}
                >
                  <p className="text-sm md:text-base leading-snug">
                    {message.text}
                  </p>

                  <span className="text-[10px] bg-[#f7c14b39] p-1 rounded w-max">
                    {format(message.createdAt)}
                  </span>
                </div>
              );
            })}

            <div ref={messageEndRef}></div>
          </div>

          {/* INPUT */}
          <form
            onSubmit={handleSubmit}
            className="border-t-2 border-[#f7c14b85] h-16 flex items-center justify-between"
          >
            <textarea
              name="text"
              className="flex-[3] h-full p-5 outline-none resize-none"
              placeholder="Type a message..."
            />

            <button className="flex-1 bg-[#f7c14b85] h-full font-bold hover:bg-[#f7c14bd1] transition-colors">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;