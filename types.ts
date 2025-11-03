
export enum View {
    SPLASH,
    LANDING,
    LOGIN,
    REGISTER,
    LOADING,
    CHAT
}

export interface User {
    username: string;
    email: string;
}

export type MessageSender = 'user' | 'model';

export interface MessagePart {
    text?: string;
    image?: string; // base64 image url
}

export interface Message {
    sender: MessageSender;
    parts: MessagePart[];
    timestamp: number;
}

export enum GenerationMode {
    CHAT = 'CHAT',
    IMAGE = 'IMAGE'
}
