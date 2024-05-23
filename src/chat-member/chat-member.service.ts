import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, ChatMember } from '@prisma/client';
import { DatabaseException } from '../exceptions/database.exception';

@Injectable()
export class ChatMemberService {
    constructor(private readonly prismaService: PrismaService) { }
    async createMany(members: Prisma.ChatMemberCreateManyInput[]) {
        await this.prismaService.chatMember.createMany({
            data: members
        })
    }

    async edit(conditions: Prisma.ChatMemberWhereUniqueInput, data: Prisma.ChatMemberUpdateInput): Promise<ChatMember> {
        return await this.prismaService.chatMember.update({
            where: conditions,
            data: data
        }).catch(reason => {
            throw new DatabaseException(reason)
        })
    }
}
