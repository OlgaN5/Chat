// import { PrismaService } from "src/prisma.service";
// import { Prisma, User, Chat, ChatMember, Message, PrismaClient } from "@prisma/client";
// import { Injectable } from "@nestjs/common";
// import { DatabaseException } from "src/exceptions/database.exception";
// // type ModelType = new PrismaClient<User/>

// @Injectable()
// export class DatabaseAccess {
//     constructor(private readonly prismaService: PrismaService) {

//     }

//     async create< T extends keyof PrismaClient,M>(model: T, obj: any): Promise<T | null | void> {
//         // return await this.prismaService[model].create(obj).catch(reason => {
//         //     console.log(reason)
//         //     throw new DatabaseException(reason)
//         // })
//     }
// }