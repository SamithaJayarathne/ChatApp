import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import {
  StatusBar,
  View,
  Image,
  Text,
  Pressable,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStack } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUserRegistration } from "../components/UserContext";
import { validateProfileImg } from "../util/Validation";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { createNewAccount } from "../service/UserService";

type AvatarProps = NativeStackNavigationProp<RootStack, "AvatarScreen">;

export default function AvatarScreen() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const navigation = useNavigation<AvatarProps>();

  const { userData, setUserData } = useUserRegistration();

  // Pick from gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      setUserData((prev) => ({ ...prev, profileImage: uri }));
    }
  };

  // Predefined avatars
  const avatars = [
    require("../../assets/avatar_1.png"),
    require("../../assets/avatar_2.png"),
    require("../../assets/avatar_3.png"),
    require("../../assets/avatar_4.png"),
    require("../../assets/avatar_5.png"),
    require("../../assets/avatar_6.png"),
  ];

  return (
    <SafeAreaView className="bg-white flex-1 items-center">
      <StatusBar hidden />

      <View className="flex-1 items-center w-full">
        {/* Logo */}
        <Image
          source={require("../../assets/logo.png")}
          className="h-40 w-36"
        />

        {/* Title */}
        <Text className="font-bold text-lg text-slate-700 mt-2">
          Choose a profile image or an avatar
        </Text>

        {/* Image Picker */}
        <View className="items-center mt-4 h-72">
          <Pressable
            onPress={pickImage}
            className="h-[120px] w-[120px] rounded-full bg-gray-100 items-center justify-center border-2 border-gray-400 border-dashed overflow-hidden"
          >
            {image ? (
              <Image
                source={{ uri: image }}
                className="h-[120px] w-[120px] rounded-full"
                resizeMode="cover"
              />
            ) : (
              <View className="items-center justify-center">
                <Text className="font-bold text-2xl text-slate-500">+</Text>
                <Text className="font-bold text-lg text-slate-500">
                  Add Image
                </Text>
              </View>
            )}
          </Pressable>

          {/* Avatar List */}
          <Text className="text-lg my-3 text-slate-700 font-bold">
            Or select an avatar
          </Text>

          <FlatList
            data={avatars}
            horizontal
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => {
              const uri = Image.resolveAssetSource(item).uri;
              const selected = image === uri;
              return (
                <TouchableOpacity
                  onPress={() => {
                    setImage(uri);
                    setUserData((prev) => ({ ...prev, profileImage: uri }));
                  }}
                >
                  <Image
                    source={item}
                    className={`h-20 w-20 rounded-full mx-2 border-2 ${selected ? "border-green-500" : "border-gray-200"
                      }`}
                  />
                </TouchableOpacity>
              );
            }}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Final Action Button */}
        <View className="absolute bottom-5 w-full px-5">
          <Pressable
            disabled={!image || loading}
            onPress={async () => {
              console.log("pressed");

              const validProfile = validateProfileImg(
                image ? { uri: image, type: "", fileSize: 0 } : null
              );

              if (validProfile) {
                Toast.show({
                  type: ALERT_TYPE.WARNING,
                  title: "Warning",
                  textBody: validProfile,
                });
              } else {
                setLoading(true);

                try {
                  console.log("done");
                  console.log(userData);

                  const response = await createNewAccount(userData);

                  if (response.status) {
                    setLoading(false);
                    navigation.replace("HomeScreen");
                  } else {
                    setLoading(false);
                    Toast.show({
                      type: ALERT_TYPE.WARNING,
                      title: "Warning",
                      textBody: response.message,
                    });
                  }
                } catch (error) {
                  setLoading(false);
                  console.error(error);
                }
              }
            }}
            className={`h-14 justify-center items-center rounded-full ${image ? "bg-green-600" : "bg-gray-400"
              }`}
          >
            {loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text className="text-slate-100 font-bold text-2xl">
                Create Account
              </Text>
            )}
          </Pressable>
        </View>


      </View>
    </SafeAreaView>
  );
}
