import { KeyboardAvoidingView, Platform, StatusBar, View, Image, Text, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal";
import { RootStack } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useUserRegistration } from "../components/UserContext";

type ContactProps = NativeStackNavigationProp<RootStack, "ContactScreen">;

export default function ContactScreen() {
    const navigation = useNavigation<ContactProps>();

    const { userData, setUserData } = useUserRegistration();

    const [countryCode, setCountryCode] = useState<CountryCode>("LK"); // default
    const [country, setCountry] = useState<Country | null>(null);
    const [show, setShow] = useState<boolean>(false);

    const [callingCode, setCallingCode] = useState("+94");
    const [phoneNo, setPhoneNo] = useState("");


    return (

        <SafeAreaView className="flex-1 items-center">
            
            <StatusBar hidden />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
                className="flex-1 items-center dark:bg-slate-950"
            >
                <View className="p-5 items-center">
                    <Image
                        source={require("../../assets/logo.png")}
                        className="h-40 w-36"
                    />

                    <Text className="text-slate-600 font-bold text-center mt-4">
                        We use your contacts to help you find friends who are already on the app.{"\n"}
                        Your contacts stay private.
                    </Text>
                </View>

                <View className="mt-5 w-full px-6 mb-5">
                    <CountryPicker
                        countryCode={countryCode}
                        withFilter
                        withFlag
                        withCountryNameButton
                        withCallingCode
                        visible={show}
                        onClose={() => setShow(false)}
                        onSelect={(c) => {
                            setCountryCode(c.cca2);
                            setCountry(c);
                            setShow(false);
                            setUserData((previous) => ({
                                ...previous,
                                countryCode: "+" + String(c.callingCode),
                            }));
                        }}
                    />


                </View>

                {/* Phone Number Input */}
                <View className="mt-4 flex flex-row justify-center items-center w-full px-6">
                    <TextInput
                        inputMode="tel"
                        className="h-16 w-1/5 px-4 font-bold text-lg text-center bg-green-100 border border-green-400 rounded-l-xl"
                        value={country?.callingCode ? `+${country.callingCode[0]}` : userData.countryCode}
                        onChangeText={(text) => {
                            setCallingCode(text);
                        }}
                        editable={false}
                    />

                    <TextInput
                        inputMode="tel"
                        className="h-16 w-4/5 px-4 font-bold text-lg border border-green-400 rounded-r-xl"
                        placeholder="77 ### ####"
                        placeholderTextColor="#3B82F6"
                        onChangeText={(text) => {
                            setPhoneNo(text);
                        }}
                    />
                </View>

                {/* Next Button */}
                <View className="absolute bottom-5 w-full p-5">
                    <Pressable
                        onPress={() => {
                            setUserData((previous) => ({
                                ...previous,
                                countryCode: country
                                    ? `+${country.callingCode}`
                                    : callingCode,
                                contactNumber: phoneNo,
                            }));
                            navigation.replace("AvatarScreen");
                        }}
                        className="bg-green-600 h-14 justify-center items-center rounded-full"
                    >
                        <Text className="text-slate-100 font-bold text-2xl">
                            Next
                        </Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
