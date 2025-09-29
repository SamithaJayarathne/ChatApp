import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity, TextInput, FlatList, Image, StatusBar } from "react-native";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLayoutEffect, useState } from "react";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'; // For ellipsis-v
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; // For camera
import { useChatList } from "../socket/UseChatList";

const chats = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Hello",
    time: "9:46 PM",
    unread: 2,
    profile: require("../../assets/avatar_1.png"),
  },
  {
    id: 2,
    name: "Emily Smith",
    lastMessage: "Are we still on for tomorrow?",
    time: "8:30 PM",
    unread: 0,
    profile: require("../../assets/avatar_2.png"),
  },
  {
    id: 3,
    name: "Michael Johnson",
    lastMessage: "Thanks for the update!",
    time: "7:15 PM",
    unread: 5,
    profile: require("../../assets/avatar_3.png"),
  },
  {
    id: 4,
    name: "Sophia Brown",
    lastMessage: "See you at the meeting. Please bring the book i have given to you at the last weekend",
    time: "6:02 PM",
    unread: 1,
    profile: require("../../assets/avatar_4.png"),
  },
  {
    id: 5,
    name: "David Wilson",
    lastMessage: "Can you send me the file?",
    time: "5:45 PM",
    unread: 0,
    profile: require("../../assets/avatar_5.png"),
  },
  {
    id: 6,
    name: "Olivia Martinez",
    lastMessage: "Good morning ☀️",
    time: "9:10 AM",
    unread: 3,
    profile: require("../../assets/avatar_6.png"),
  },
];

type HomeScreenProps = NativeStackNavigationProp<RootStack, "HomeScreen">

export default function HomeScreen() {

  const navigation = useNavigation<HomeScreenProps>();
  const [search, setSearch] = useState("");

  const chatList = useChatList();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text className="text-3xl font-bold">ChatApp</Text>
      ),
      headerRight: () => (
        <View className="flex-row items-center space-x-6">
          <TouchableOpacity className="me-5">
            <MaterialIcons name="photo-camera" size={26} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome5 name="ellipsis-v" size={20} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(search.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      className="flex-row items-center p-3"
      onPress={() => {
        navigation.navigate("SingleChatScreen", {
          chatId: 1,
          friendName: "Samitha Jaye",
          lastSeenTime: "8.07 PM",
          profileImage: require("../../assets/avatar_2.png")
        });
      }}
    >
      {/* Profile Image */}
      <Image source={item.profile} className="h-12 w-12 rounded-full" />

      {/* Name + Last Message */}
      <View className="ml-3 flex-1">
        <Text
          className="text-lg font-semibold"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.name}
        </Text>
        <Text
          className="text-gray-500"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.lastMessage}
        </Text>
      </View>

      {/* Time + Unread Badge */}
      <View className="items-end">
        <Text className="text-gray-400 text-sm">{item.time}</Text>
        {item.unread > 0 && (
          <View className="bg-green-500 rounded-full px-2 py-1 mt-1">
            <Text className="text-white text-xs font-bold">{item.unread}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 mt-2" edges={["right", "bottom", "left"]}>
      {/* Search bar */}
      <View className="items-center flex-row mx-2 bg-gray-300 rounded-full px-3 h-14 mt-3">
        <Feather name="search" size={20} color="black" />
        <TextInput
          value={search}
          onChangeText={setSearch}
          className="flex-1 text-lg font-bold ps-2"
          placeholder="Search"
        />
      </View>

      {/* Chats list */}
      <View className="mt-1">
        <FlatList
          data={filteredChats}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </View>

      {/* Floating button */}
      <View className="absolute bg-green-500 bottom-10 right-12 h-16 w-16 rounded-2xl">
        <TouchableOpacity className="h-16 w-16 rounded-2xl justify-center items-center">
          <Ionicons name="chatbox-ellipses" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
