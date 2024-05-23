import { Prisma,Message } from "@prisma/client";

export class MessageDto {
    text: string;
    userId: number;
    chatId: number
}