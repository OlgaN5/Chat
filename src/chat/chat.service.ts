import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Chat, ChatMember, User } from '@prisma/client';
import { DatabaseException } from '../exceptions/database.exception';
import { PrismaService } from '../prisma.service';
import { ChatMemberService } from '../chat-member/chat-member.service';
import { UserService } from '../user/user.service';
@Injectable()
export class ChatService {
    constructor(private readonly prismaService: PrismaService,
        private readonly chatMemberService: ChatMemberService,
        private readonly userService: UserService
    ) { }

    async create(usersId: number[]): Promise<Chat> {
        const chat = await this.prismaService.chat.create({}).catch(reason => {
            throw new DatabaseException(reason)
        })
        const members: Prisma.ChatMemberCreateManyInput[] = await Promise.all(usersId.map(async (userId) => {
            const user: User | void = await this.userService.findOneById({ id: userId }).catch(reason => {
                throw new DatabaseException(reason)
            })
            if (!user) throw new NotFoundException()
            return {
                name: user.login,
                chatId: chat.id,
                userId
            }
        }
        ));
        await this.chatMemberService.createMany(members);
        return chat;
    }

    async delete(conditions: Prisma.ChatWhereUniqueInput) {
        await this.prismaService.chat.delete({
            where: conditions
        }).catch(reason => {
            throw new DatabaseException(reason)
        })
    }
}
