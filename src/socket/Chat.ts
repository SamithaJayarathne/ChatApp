export interface User {
    id: number;
    firstName: string;
    lastName: string;
    countryCode: string;
    contactNumber: string;
    profileImage?: string;
}

export interface Chat {
    friendId: number;
    friendName:string;
    lastMessage:string;
    lastTimeStamp:string;
    unreadCount:string;
    profileImage:string;
    from_user: User;
    to_usesr: User;
    createdAt: string;
    updatedAt: string;
    status: string;
    message:string;
}

export interface WebSocketRequest {
    type: string;
    fromUserId?: number;
    toUserId?: number;
    message?: string;
}

export interface WSResponse {
    type: string;
    payload : any;
}