import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatsScreen from "./ChatsScreen";
import StatusScreen from "./StatusScreen";
import CallsScreen from "./CallsScreen";
import Ionicons from '@expo/vector-icons/Ionicons';

const Tabs = createBottomTabNavigator();

export default function HomeTabs() {

    return (
        <Tabs.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName = "chatbubble-ellipses";
                if (route.name === "Chats") iconName = "chatbubble-ellipses";
                else if (route.name === "Status") iconName = "time";
                else if (route.name === "Calls") iconName = "call";
                return <Ionicons name={iconName as any} size={24} color={color} />
            },
            tabBarLabelStyle:{fontSize:14, fontWeight:'600'},
            tabBarActiveTintColor:"#22c55e",
            tabBarStyle:{
                height:80,
                backgroundColor:"#fff",
                paddingTop:8
            }
        })}>
            <Tabs.Screen name="Chats" component={ChatsScreen} options={{headerShown:false}}/>
            <Tabs.Screen name="Status" component={StatusScreen} />
            <Tabs.Screen name="Calls" component={CallsScreen} />
        </Tabs.Navigator>
    );

}