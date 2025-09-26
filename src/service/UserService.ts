import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { useUserRegistration } from "../components/UserContext";
import { UserRegistrationData } from "../components/UserContext";

const API = process.env.EXPO_PUBLIC_APP_URL + "/ChatApp_API";

export const createNewAccount = async (
    userRegistrationData: UserRegistrationData
) => {
    let formData = new FormData();
    formData.append("firstName", userRegistrationData.firstName);
    formData.append("lastName", userRegistrationData.lastName);
    formData.append("countryCode", userRegistrationData.countryCode);
    formData.append("contactNumber", userRegistrationData.contactNumber);
    formData.append("profileImage", {
        uri: userRegistrationData.profileImage,
        name: "profile.png",
        type: "image/png"
    } as any);

    const response = await fetch(API + "/UserController", {
        method: "POST",
        body: formData
    });

    console.log("giyaa")

    if (response.ok) {
        const data = await response.json();
        return data;

    } else {
        return "OOPS! Something went wrong. Please try again."
    }

}
