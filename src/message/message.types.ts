interface MessageType {
    id: number;
    text: string;
    chatId: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}

export type CreatedMessageType = MessageType
//|CreatedMessageError