import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import { ALERT_TYPE, AlertNotificationRoot, Toast } from "react-native-alert-notification";
import { useTheme } from "../theme/ThemeProvider";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { useState } from "react";
import { RootStack } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useUserRegistration } from "../components/UserContext";
import { validateFirstName, validateLastName } from "../util/Validation";

type SignupProps = NativeStackNavigationProp<RootStack, "SignUpScreen">;

export default function SignUpScreen() {

  const navigation = useNavigation<SignupProps>();

  const { applied } = useTheme();
  const logo =
    applied === "dark"
      ? require("../../assets/dark-logo.png")
      : require("../../assets/logo.png");

  const { userData, setUserData } = useUserRegistration();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <AlertNotificationRoot>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "android" ? 100 : 100}
        className="flex-1 items-center dark:bg-slate-950"
      >
        <SafeAreaView className="justify-center items-center p-5">
          <StatusBar hidden={true} />
          <Image source={logo} className="h-40 w-36" />
          <View className="w-full justify-start items-start">
            <Text className="font-bold text-slate-500 dark:text-slate-100">
              Create your account and start the conversation TODAY
            </Text>
          </View>
          <View className="self-stretch">
            <View className="w-full my-3">
              <FloatingLabelInput
                label={"Enter Your First Name"}
                value={userData.firstName}
                onChangeText={(text) => {
                  setUserData((previous) => ({
                    ...previous,
                    firstName: text
                  }));
                }}
              />
            </View>
            <View className="w-full my-3">
              <FloatingLabelInput
                label={"Enter Your Last Name"}
                value={userData.lastName}
                onChangeText={(text) => {
                  setUserData((previous) => ({
                    ...previous,
                    lastName: text
                  }));
                }}
              />

            </View>
          </View>
        </SafeAreaView>
        <View className="absolute bottom-5 w-full p-5">
          <Pressable
            onPress={() => {
              {
                let validFn = validateFirstName(userData.firstName);
                let validLn = validateLastName(userData.lastName);

                if (validFn) {
                  Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Warning',
                    textBody: validFn
                  })
                } else if (validLn) {
                  Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Warning',
                    textBody: validLn
                  })
                } else {
                  navigation.replace("ContactScreen")
                }
              }

            }}
            className="bg-green-600 h-14 justify-center items-center rounded-full">
            <Text className="text-slate-100 dark:text-slate-100 font-bold text-2xl">
              Next
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </AlertNotificationRoot>
  );
}
