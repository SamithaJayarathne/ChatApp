import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import HomeScreen from './src/screens/HomeScreen';
import SettingScreen from './src/screens/SettingScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { ThemeProvider } from './src/theme/ThemeProvider';
import ContactScreen from './src/screens/ContactScreen';
import AvatarScreen from './src/screens/AvatarScreen';
import { UserRegistrationProvider } from './src/components/UserContext';
import { UserRegistrationData } from './src/components/UserContext';
import HomeTabs from './src/screens/HomeTabs';
import SingleChatScreen from './src/screens/SingleChatScreen';

export type RootStack = {
  SplashScreen: undefined,
  SignUpScreen: undefined,
  ContactScreen: undefined,
  AvatarScreen: undefined,
  SignInScreen: undefined,
  HomeScreen: undefined,
  SettingScreen: undefined,
  ProfileScreen: undefined,
  SingleChatScreen: {
    chatId: number;
    chatName: string;
    lastSeenTime: string;
    profileImage: string;
  }
}

const Stack = createNativeStackNavigator();

export default function App() {

  return (

    <ThemeProvider>

      <UserRegistrationProvider>

        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="SingleChatScreen" // the screen opens first when the app is started
            screenOptions={{
              animation: "fade",
            }}
          >

            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{ headerShown: false }} />

            <Stack.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              options={{ headerShown: false }} />

            <Stack.Screen
              name="ContactScreen"
              component={ContactScreen}
              options={{ headerShown: false }} />

            <Stack.Screen
              name="AvatarScreen"
              component={AvatarScreen}
              options={{ headerShown: false }} />

            <Stack.Screen
              name="SignInScreen"
              component={SignInScreen}
              options={{ headerShown: false }} />

            <Stack.Screen
              name="HomeScreen"
              component={HomeTabs}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="SettingScreen"
              component={SettingScreen} />

            <Stack.Screen
              name="ProfileScreen"
              component={ProfileScreen} />

            <Stack.Screen
              name="SingleChatScreen"
              component={SingleChatScreen} />

          </Stack.Navigator>
        </NavigationContainer>

      </UserRegistrationProvider>

    </ThemeProvider>
  );
}