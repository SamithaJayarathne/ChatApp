import { useUserRegistration } from "../components/UserContext";

export interface User{

}

export function createNewAccount() {
    const { userData, setUserData } = useUserRegistration();
    console.log(userData);
}
