import { useEffect, useState } from "react";
import { useWebSocket } from "./WebSocketProvider";
import { Chat } from "./Chat";

export function useSingleChat(friendId: number) {
    const { socket, sendMessage } = useWebSocket();
    const [messages, setMessages] = useState<Chat[]>([]);

    useEffect(() => {
        if (!socket) {
            return;
        }
        sendMessage({ type: "get_single_chat", friendId });

        const onMessage = (event: MessageEvent) => {
            const response = JSON.parse(event.data);
            if (response.type === "single_chat") {
                setMessages(response.payload);
            }

            if (response.type === "new_message" && response.payload.to_user.id === friendId) {
                console.log(response.payload);
                setMessages((prev)=>([response.payload,...prev]));
            }
        }

        socket.addEventListener("message", onMessage);

        return () => {
            socket.removeEventListener("message", onMessage);
        }

    }, [socket, friendId]);

    return messages;
}