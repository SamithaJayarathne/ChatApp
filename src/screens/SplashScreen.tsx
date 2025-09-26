import { StatusBar } from "expo-status-bar";
import { View, Text, Image } from "react-native";
import "../../global.css";
import CircleShape from "../components/CircleShape";
import { useEffect } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { RootStack } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { runOnJS } from "react-native-worklets";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeProvider";


type Props = NativeStackNavigationProp<RootStack, "SplashScreen">

export default function SplashScreen() {


    const navigation = useNavigation<Props>();

    // Reanimated shared value for opacity
    const opacity = useSharedValue(0);

    // Animate on mount
    useEffect(() => {
        opacity.value = withTiming(1, { duration: 3000 }); // fade in over 3 seconds

        const timer = setTimeout(() => {
            navigation.replace("SignUpScreen");
        }, 3000);

        return () => {
            clearInterval(timer);
        };

    }, [navigation, opacity]);

    // Animated style
    const animatedStyle = useAnimatedStyle(() => {
        return { opacity: opacity.value };
    });

    const { applied } = useTheme();

    const logo = applied === "dark" ? require("../../assets/dark-logo.png")

        : require("../../assets/logo.png");

    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-slate-50 dark:bg-slate-950">
            <StatusBar hidden={true} />

            {/* Background circles */}
            <CircleShape
                width={180}
                height={180}
                fillColor="#475569" // slate-700
                borderRadius={999}
                top={50}
                left={100}
            />
            <CircleShape
                width={260}
                height={260}
                fillColor="#111827" // slate-900
                borderRadius={999}
                top={-80}
                left={-100}
            />

            {/* Animated logo */}
            <Animated.View style={animatedStyle}>
                <Image
                    source={logo}
                    className="h-60 w-60"
                    resizeMode="contain"
                />
            </Animated.View>

            {/* Footer */}
            <Animated.View className="absolute bottom-6 " style={animatedStyle}>
                <View className="justify-center items-center">
                    <Text className="text-gray-600 font-bold text-s">
                        POWERED BY: {process.env.EXPO_PUBLIC_APP_OWNER}
                    </Text>
                    <Text className="text-gray-600 font-bold text-xs mb-5">
                        VERSION: {process.env.EXPO_PUBLIC_APP_VERSION}
                    </Text>
                </View>
            </Animated.View>

        </SafeAreaView>
    );
}
