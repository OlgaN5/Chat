import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import { DatabaseException } from '../exceptions/database.exception';
// import { DatabaseAccess } from 'src/database.lib/database-access';

type FindUserEmail = {
    email?: string;
    login?: string;
}
@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {

    }
    async findOneById(id: Prisma.UserWhereUniqueInput): Promise<User | null | void> {
        const jjj = id
        return await this.prisma.user.findUnique({ where: id }).catch((reason) => {
            throw new DatabaseException(reason)

        })

    }
    async findOne(conditions: FindUserEmail): Promise<User | null | void> {
        return await this.prisma.user.findFirst({
            where: conditions
        }).catch((reason) => {
            // throw new D
            throw new DatabaseException(reason)

        })
    }
    async create(data: Prisma.UserCreateInput): Promise<User | null | void> {
        console.log(data)
        // await this.prisma.create<User>(User,data)
        // return await this.databaseAccess.create<User,Prisma.UserCreateInput>({ data })
        return await this.prisma.user.create({ data }).catch(reason => {
            console.log(reason)
            throw new DatabaseException(reason)
        })
    }
}
