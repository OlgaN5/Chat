import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { Prisma, Message } from '@prisma/client';
import { PrismaService } from '../prisma.service';
// import { UpdateMessage } from './dto/updateMessage.dto';
import { DatabaseException } from '../exceptions/database.exception';
@Injectable()
export class MessageService {
    constructor(private readonly prismaService: PrismaService) { }

    async create(data: MessageDto): Promise<Message> {
        console.log(data)

        const message: Prisma.MessageCreateInput = {
            text: data.text,
            user: { connect: { id: data.userId } },
            chat: { connect: { id: data.chatId } },
        }

        console.log(message)

        return await this.prismaService.message.create({ data: message })
    }

    async update(conditions: Prisma.MessageWhereUniqueInput, data: Prisma.MessageUpdateInput): Promise<Message> {

        return await this.prismaService.message.update({
            where: conditions,
            data
        }).catch(reason => {
            throw new DatabaseException(reason)
        })
    }

    async delete(conditions: Prisma.MessageWhereUniqueInput): Promise<Message> {
        return await this.prismaService.message.delete({
            where: conditions
        }).catch(reason => {
            throw new DatabaseException(reason)
        })
    }
}
