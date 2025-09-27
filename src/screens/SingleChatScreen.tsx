import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, Text, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, FlatList, TextInput } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';

type Message = {
    id: number,
    text: string,
    sender: "me" | "friend",
    time: string,
    status?: "sent" | "delivered" | "read";
};

const dummyMessages: Message[] = [

];

type SingleChatScreenProps = NativeStackNavigationProp<RootStack, "SingleChatScreen">

export default function SingleChatScreen() {

    const navigation = useNavigation<SingleChatScreenProps>();

    const [message, setMessage] = useState<Message[]>([{
        id: 1,
        text: "Hey, how are you doing?",
        sender: "friend",
        time: "9:40 AM",
        status: "read",
    },
    {
        id: 2,
        text: "I’m good, just finishing some work. You?",
        sender: "me",
        time: "9:42 AM",
        status: "read",
    },
    {
        id: 3,
        text: "All good here. Are we still on for lunch later?",
        sender: "friend",
        time: "9:45 AM",
        status: "delivered",
    },
    {
        id: 4,
        text: "Yes, let’s meet at the café around 1 PM.",
        sender: "me",
        time: "9:47 AM",
        status: "sent",
    },
    {
        id: 5,
        text: "Perfect 👍",
        sender: "friend",
        time: "9:48 AM",
        status: "delivered",
    },
    {
        id: 6,
        text: "By the way, did you check the document I sent yesterday?",
        sender: "friend",
        time: "10:02 AM",
        status: "delivered",
    },
    {
        id: 7,
        text: "Yes, I reviewed it. Looks great, just a few small tweaks needed.",
        sender: "me",
        time: "10:05 AM",
        status: "read",
    },
    {
        id: 8,
        text: "Awesome, thanks for checking 🙌",
        sender: "friend",
        time: "10:06 AM",
        status: "delivered",
    },]);

    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerLeft: () => (
                <View className="flex-row items-center gap-2">
                    <Image
                        source={require("../../assets/avatar_1.png")}
                        className="h-14 w-14 rounded-full border-2 border-green-500 shadow-md"
                    />

                    <View className="space-y-2">
                        <Text className="font-bold text-2xl">John Doe</Text>
                        <Text className="italic text-xs font-bold text-gray-500">Last seen today at 11:08 AM</Text>
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

    const renderItem = ({ item }: { item: Message }) => {
        const isMe = item.sender === "me";
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
                    {item.text}
                </Text>
                <View className="flex-row justify-end items-center mt-1 gap-1">
                    <Text className={`${isMe ? "text-white" : "text-black"} italic text-xs`}>
                        {item.time}
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

    const sendMessage = () => {
        if (input.trim()) {
            const newMsg: Message = {
                id: Date.now(),
                text: input,
                sender: 'me',
                time: Date.now().toString(),
                status: 'sent'
            };
            setMessage([newMsg, ...message]);
            setInput("");
        };

        return !input.trim();

    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={["right", "bottom", "left"]}>

            <KeyboardAvoidingView
                behavior={Platform.OS === "android" ? "padding" : "height"}
                className="flex-1"
                // keyboardVerticalOffset={110} // adjust based on your header height
            >

                <FlatList
                    data={message}
                    renderItem={renderItem}
                    className="px-3 flex-1"
                    contentContainerStyle={{ paddingBottom: 60 }}
                    keyExtractor={(item) => item.id.toString()}

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
                        onPress={sendMessage}
                    >
                        <Ionicons name="send" size={24} color="black" />
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>

        </SafeAreaView>
    );
}