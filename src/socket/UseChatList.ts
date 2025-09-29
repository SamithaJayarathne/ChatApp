import { Chat, WSResponse } from "./Chat";
import { useEffect, useState } from "react";
import { useWebSocket } from "./WebSocketProvider";

export function useChatList(): Chat[] {

    const { socket, sendMessage } = useWebSocket();
    const [chatList, setChatList] = useState<Chat[]>([]);

    useEffect(() => {
        if (!socket) {
            return;
        }

        sendMessage({ type: "get_chat_list" });


        const onMessage = (event: MessageEvent) => {
            // const data: WSResponse = JSON.parse(event.data);
            // if (data.type === "friend_list") {
            //     console.log(data.data);
            //     setChatList(data.data);
            // }

            console.log(event.data)
        };

        socket.addEventListener("message", onMessage);
        return () => {
            socket.removeEventListener("message", onMessage);
        };

    }, [socket]);

    return chatList;

}