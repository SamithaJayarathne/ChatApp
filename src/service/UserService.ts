import { useUserRegistration } from "../components/UserContext";
import { UserRegistrationData } from "../components/UserContext";

export interface User {

}

export const createNewAccount = async (
    userRegistrationData: UserRegistrationData
) => {
    console.log(userRegistrationData);
}
