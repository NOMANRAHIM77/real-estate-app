import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";
import { format } from "timeago.js";

const schema = z.object({
  text: z.string().min(1, "Message cannot be empty"),
});

function Chat({ chats = [] }) {
  const [chat, setChat] = useState(null);
  const messageEndRef = useRef();

  const { currentUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // auto scroll
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // OPEN CHAT (REAL API)
 const handleOpenChat = async (id, receiver) => {
  try {
    const res = await apiRequest.get("/chat/" + id);

    console.log("CHAT DATA:", res.data); // 🔥 ADD THIS

    setChat({
      ...res.data,
      receiver,
    });
  } catch (err) {
    console.log("OPEN CHAT ERROR:", err);
  }
};

  // SEND MESSAGE (REAL API)
  const onSubmit = async (data) => {
    try {
      const res = await apiRequest.post("/message/" + chat.id, {
        text: data.text,
      });

      setChat((prev) => ({
        ...prev,
        messages: [...prev.messages, res.data],
      }));

      reset();
    } catch (err) {
      console.log("SEND MESSAGE ERROR:", err);
    }
  };

  return (
    <div className="h-full flex flex-col">

      {/* CHAT LIST */}
      <div className="flex-1 overflow-y-auto">
        <h1 className="text-3xl font-light mb-4">Messages</h1>

        {chats.length === 0 ? (
          <p className="text-gray-400">No chats yet</p>
        ) : (
          chats.map((c) => (
            <div
              key={c.id}
              onClick={() => handleOpenChat(c.id, c.receiver)}
              className={`p-4 rounded-xl flex items-center gap-4 cursor-pointer mb-2 transition
                ${
                  c.seenBy?.includes(currentUser.id)
                    ? "bg-white"
                    : "bg-[#fece514e]"
                }
              `}
            >
              <img
                src={c.receiver?.avatar || "/noavatar.png"}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold">
                  {c.receiver?.username}
                </div>
                <div className="text-sm text-gray-500">
                  {c.lastMessage || "No messages yet"}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CHAT BOX */}
      {chat && (
        <div className="flex-1 bg-white flex flex-col mt-4 rounded-xl overflow-hidden">

          {/* HEADER */}
          <div className="bg-[#f7c14b85] p-4 font-bold flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src={chat.receiver?.avatar || "/noavatar.png"}
                className="w-8 h-8 rounded-full"
              />
              <span>{chat.receiver?.username}</span>
            </div>

            <span
              className="cursor-pointer"
              onClick={() => setChat(null)}
            >
              X
            </span>
          </div>

          {/* MESSAGES */}
          <div className="h-[350px] overflow-y-auto p-4 flex flex-col gap-3">
            {chat.messages?.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  String(msg.userId) === String(currentUser.id)
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[60%] text-sm ${
                    String(msg.userId) === String(currentUser.id)
                      ? "bg-[#fece51] rounded-br-none"
                      : "bg-gray-100 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                  <div className="text-[10px] text-gray-400 mt-1">
                    {format(msg.createdAt)}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>

          {/* INPUT */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex border-t p-2"
          >
            <textarea
              {...register("text")}
              placeholder="Type a message..."
              className="flex-1 p-2 outline-none resize-none text-sm"
            />

            <button
              type="submit"
              className="bg-[#f7c14b85] px-6 hover:bg-[#f5b92f]"
            >
              Send
            </button>
          </form>

          {errors.text && (
            <p className="text-red-500 text-xs px-2">
              {errors.text.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Chat;