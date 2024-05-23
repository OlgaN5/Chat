import { Module } from '@nestjs/common';
import { ChatMemberService } from './chat-member.service';
import { ChatMemberController } from './chat-member.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ChatMemberController],
  providers: [ChatMemberService,PrismaService],
})
export class ChatMemberModule {}
