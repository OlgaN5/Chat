import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { PrismaService } from '../prisma.service';
import { UserService } from '../user/user.service';
import { ChatMemberService } from '../chat-member/chat-member.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, PrismaService, UserService, ChatMemberService],
})
export class ChatModule { }
