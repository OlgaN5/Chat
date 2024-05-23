import { Prisma, PrismaClient, User } from "@prisma/client";
import { Injectable, OnModuleInit } from "@nestjs/common";
// import { DatabaseException } from "./exceptions/database.exception";
// import { DefaultArgs } from "@prisma/client/runtime/library";

// type ModelType = Prisma.UserDelegate<DefaultArgs>|Prisma.ChatDelegate<DefaultArgs>|Prisma.ChatMemberDelegate<DefaultArgs>|Prisma.MessageDelegate<DefaultArgs>
// type CreateInput = Prisma.UserCreateInput|Prisma.MessageCreateInput|Prisma.ChatCreateInput|Prisma.ChatMemberCreateInput
export class PrismaService extends PrismaClient implements OnModuleInit {

    // constructor(private readonly prismaClient: PrismaClient) {
    //     super()
    // }
    async onModuleInit() {
        await this.$connect()
    }

    // async startTransaction(operation: () => Promise<any>) {
    //     let result = null
    //     const transaction = await this.prismaClient.$transaction(async (tx) => {
    //         result = await operation()
            
    //     })

    //     return result

    // }
    // async create<T>(model: ModelType, obj: CreateInput): Promise<T | null | void> {

    //     return await model.create({obj})

    //     // const createMethod = this.prismaClient[model].
    //     //         if (!createMethod || typeof createMethod !== 'function') {
    //     //     throw new Error(`Метод create не найден для модели ${model}`);
    //     // }

    //     // return await createMethod(obj).catch(reason => {
    //     //     console.log(reason);
    //     //     throw new DatabaseException(reason);
    //     // });
    // }
    // async create< T ,M>(model: T, obj: any): Promise<T | null | void> {
    //     return await this.prismaService[model].create(obj).catch(reason => {
    //         console.log(reason)
    //         throw new DatabaseException(reason)
    //     })
    // }
}