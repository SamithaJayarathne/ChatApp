export const validateFirstName = (name: string): string | null => {
    if (!name || name.trim().length === 0) {
        return "First name cannot be empty";
    }
    return null;
};

export const validateLastName = (name: string): string | null => {
    if (!name || name.trim().length === 0) {
        return "Last name cannot be empty";
    }
    return null;
};

export const validateCountryCode = (countryCode: string): string | null => {


    const regex = /^\+[1-9]\d{0,3}$/;

    if (!countryCode) {
        return "Country code cannot be empty";
    }

    if (!regex.test(countryCode)) {
        return "Enter a valid country code"
    }
    return null;
};

export const validatePhoneNo = (phoneNo: string): string | null => {


    const regex = /^[1-9][0-9]{6,14}$/;

    if (!phoneNo) {
        return "Phone number cannot be empty";
    }

    if (!regex.test(phoneNo)) {
        return "Enter a valid phone number"
    }
    return null;
};

export const validateProfileImg = (img: { uri: string; type?: string; fileSize?: number; } | null): string | null => {

    if (!img) {
        return "Profile image cannot be empty";
    }
    if (img.type && ["image/jpeg", "image/jpg", "imge/png"].includes(img.type)) {
        return "Select a valid image type (JPEG,PNG,JPG)"
    }
    if (img.fileSize && img.fileSize > 10 * 1024 * 1024) {
        return "Profile image must be less than 10 MB";
    }

    return null;

};