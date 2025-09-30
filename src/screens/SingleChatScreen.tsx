import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, Text, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, FlatList, TextInput } from "react-native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSingleChat } from "../socket/UseSingleChat";
import { Chat } from "../socket/Chat";
import { useSendChat } from "../socket/UseSendChat";

type Message = {
    id: number,
    text: string,
    sender: "me" | "friend",
    time: string,
    status?: "sent" | "delivered" | "read";
};

const dummyMessages: Message[] = [

];

type SingleChatScreenProps = NativeStackScreenProps<RootStack, "SingleChatScreen">

export default function SingleChatScreen({ route, navigation }: SingleChatScreenProps) {

    const { chatId, friendName, lastSeenTime, profileImage } = route.params;

    const messages = useSingleChat(chatId); // chatId == friend Id
    const sendMessage = useSendChat();

    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerLeft: () => (
                <View className="flex-row items-center gap-2">
                    <Image
                        source={{ uri: profileImage }}
                        className="h-14 w-14 rounded-full border-2 border-green-500 shadow-md"
                    />

                    <View className="space-y-2">
                        <Text className="font-bold text-2xl">{friendName}</Text>
                        <Text className="italic text-xs font-bold text-gray-500">Last seen {lastSeenTime}</Text>
                    </View>
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => {

                }}>
                    <Ionicons name="ellipsis-vertical-sharp" size={24} color="black" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const renderItem = ({ item }: { item: Chat }) => {
        const isMe = item.from_user.id !== chatId;
        return (
            <View
                className={`my-1 px-4 py-2 max-w-[75%] ${isMe
                    ? "self-end bg-green-500 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl"
                    : "self-start bg-gray-200 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl"
                    }`}
                style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                }}
            >
                <Text className={`${isMe ? "text-white" : "text-black"} text-base`}>
                    {item.message}
                </Text>
                <View className="flex-row justify-end items-center mt-1 gap-1">
                    <Text className={`${isMe ? "text-white" : "text-black"} italic text-xs`}>
                        {item.createdAt}
                    </Text>
                    {isMe && (
                        <Ionicons
                            name={
                                item.status === "read"
                                    ? "checkmark-done"
                                    : item.status === "delivered"
                                        ? "checkmark-done-sharp"
                                        : "checkmark"
                            }
                            size={16}
                            color={item.status === "read" ? "#fff" : "black"}
                        />
                    )}
                </View>
            </View>
        );
    };

    const handleSendChat = () => {
        if (!input.trim()) {
            return;
        }
        sendMessage(chatId, input);
        console.log("message sent");
        setInput("");
    }

    return (
        <SafeAreaView className="flex-1 bg-white" edges={["right", "bottom", "left"]}>

            <KeyboardAvoidingView
                behavior={Platform.OS === "android" ? "padding" : "height"}
                className="flex-1"
            // keyboardVerticalOffset={110} // adjust based on your header height
            >

                <FlatList
                    data={messages}
                    renderItem={renderItem}
                    className="px-3 flex-1"
                    contentContainerStyle={{ paddingBottom: 60 }}
                    keyExtractor={(_, index) => index.toString()}

                />
                <View className="flex-row items-end bg-white px-3 gap-2">
                    <TextInput
                        value={input}
                        onChangeText={(text) => { setInput(text) }}
                        multiline
                        placeholder="Type a message"
                        className="flex-1 h-14 max-h-32 px-5 py-2 bg-gray-200 rounded-full text-base"
                    />
                    <TouchableOpacity
                        className="rounded-full bg-green-500 h-14 w-14 items-center justify-center"
                        onPress={handleSendChat}
                    >
                        <Ionicons name="send" size={24} color="black" />
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>

        </SafeAreaView>
    );
}