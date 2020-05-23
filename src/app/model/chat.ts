export interface ChatPreview {
    id: number;
    type: 'DM' | 'GROUP';
    img: string;
    title: string;
    newMessages: number;
    lastMessage: TextMessage | AudioMessage | ImageMessage;
}

export interface TextMessage {
    type: 'TEXT';
    from?: string;
    checked?: boolean;
    text: string;
    date: number;
}

export interface AudioMessage {
    type: 'AUDIO';
    from?: string;
    duration: number;
    date: number;
}

export interface ImageMessage {
    type: 'IMAGE';
    from?: string;
    img: string;
    date: number;
}

export type Message = TextMessage | AudioMessage | ImageMessage;

export interface Chat {
    id?: number;
    messages: Message[];
    meta?: {
        title: string;
        members: string[];
    };
}

export interface Calls {
    receiverType: 'IN' | 'OUT';
    mediaType: 'CALL' | 'VIDEO';
    img: string;
    title: string;
    date: number;
    accumulator?: number;
}

export interface Status {
    id: number;
    img: string;
    title: string;
    subtitle: string;
}
