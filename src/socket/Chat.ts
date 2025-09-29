export interface User {
    id: number;
    firstName: string;
    lastName: string;
    countryCode: string;
    contactNumber: string;
    profileImage?: string;
}

export interface Chat {
    id: number;
    message: string;
    from: User;
    to: User;
    createdAt: string;
    updatedAt: string;
    status: "SEND" | "DELIVERED" | "READ";
}

export interface WebSocketRequest {
    type: string;
    fromUserId?: number;
    toUserId?: number;
    message?: string;
}

export interface WSResponse {
    type: string;
    data: any;
}