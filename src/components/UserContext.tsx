import React, { createContext, ReactNode, useContext, useState } from "react";

export interface UserRegistrationData {
    firstName: string;
    lastName: string;
    contactNumber: string;
    countryCode: string;
    profileImage: string | null;
}

interface UserRegistrationContextType {
    userData: UserRegistrationData,
    setUserData: React.Dispatch<React.SetStateAction<UserRegistrationData>>;
}

const userRegistrationContext = createContext<
    UserRegistrationContextType | undefined
>(undefined);

export const UserRegistrationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userData, setUserData] = useState<UserRegistrationData>({
        firstName: "",
        lastName: "",
        contactNumber: "",
        countryCode: "",
        profileImage: null,

    });

    return (
        <userRegistrationContext.Provider value={{ userData, setUserData }}>
            {children}
        </userRegistrationContext.Provider>
    );
};

export const useUserRegistration = (): UserRegistrationContextType => {
    const ctx = useContext(userRegistrationContext);

    if (!ctx) {
        throw new Error("useUserRegistration must be used within a UserRegistrationProvider");
    }

    return ctx;
}