import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAppContext } from "../../lib/AppContext";
import type { Message, MessageDto, User } from "../../lib/Types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMessages, saveMessage } from "../../api/message";
import Sidebar from "../elements/chat/Sidebar";
import Loader from "../elements/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserByEmail } from "../../api/user";

const Chat = () => {
  const { user, token } = useAppContext();
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [receiverId, setReceiverId] = useState(-1);
  const [users, setUsers] = useState<User[]>([]);
  const senderId: number = user?.id ?? 1;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userParam = searchParams.get("user");
  const navigate = useNavigate();

  const { data, isPending } = useQuery<Message[]>({
    queryKey: ["messages", senderId, receiverId],
    queryFn: () => getMessages(senderId, receiverId, token ?? ""),
    enabled: !!senderId && !!receiverId && !!token,
  });
  const { data: userData } = useQuery({
    queryKey: ["user", userParam],
    queryFn: () => getUserByEmail(userParam || "", token || ""),
    enabled: !!userParam,
  });

  useEffect(() => {
    if (data) {
      setMessages(data);
    }
    if (userParam && userData) {
      if (!users.find((user: User) => user.username == userParam)) {
        setUsers([userData, ...users]);
      }
      setReceiverId(userData.id);
      searchParams.delete("user");
      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      });
    }
  }, [data, userData]);

  const { mutateAsync: saveMessageAsync } = useMutation<
    Message,
    Error,
    MessageDto
  >({
    mutationKey: ["message"],
    mutationFn: (messageDto: MessageDto) =>
      saveMessage(messageDto, token ?? ""),
  });

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: MessageDto = {
      senderId,
      receiverId,
      text: newMessage,
    };

    try {
      const saved = await saveMessageAsync(message);

      await supabase.channel(`chat-${senderId}-${receiverId}`).send({
        type: "broadcast",
        event: "private-message",
        payload: saved,
      });

      setMessages((prev) => [...prev, { ...saved }]);
      setNewMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  useEffect(() => {
    const chatChannel = supabase.channel(`chat-${senderId}-${receiverId}`);

    const subscription = chatChannel
      .on("broadcast", { event: "private-message" }, (payload: any) => {
        const msg = payload.payload as Message;

        if (
          (msg.sender.id === senderId && msg.receiver.id === receiverId) ||
          (msg.sender.id === receiverId && msg.receiver.id === senderId)
        ) {
          setMessages((prev) => [...prev, msg]);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(chatChannel);
    };
  }, [senderId, receiverId]);

  return isPending ? (
    <Loader />
  ) : (
    <div className="w-screen h-screen flex justify-between">
      <Sidebar
        setReceiverId={setReceiverId}
        receiverId={receiverId}
        users={users}
        setUsers={setUsers}
      />
      <div className="w-full p-10 bg-gray-100">
        <div className="h-[calc(100vh-112px)] overflow-y-auto  rounded p-4 space-y-2 remove-scrollbar">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`bg-white text-black shadow rounded p-2 ${
                msg.sender.id == user?.id && "text-right"
              }`}
            >
              <div className={`text-sm font-semibold`}>
                {msg.sender.username}
              </div>
              <div>{msg.text}</div>
              <div className="text-xs text-gray-400">
                {msg.createdAt
                  ? new Date(msg.createdAt).toLocaleTimeString()
                  : ""}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded px-3 py-2"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 rounded cursor-pointer"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
