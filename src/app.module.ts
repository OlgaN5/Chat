import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { MessageModule } from './message/message.module';
import { ChatModule } from './chat/chat.module';
import { ChatMemberModule } from './chat-member/chat-member.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { DatabaseExceptionFilter } from './filters/database-exeption.filter';
import { AllExceptionFilter } from './filters/all-exeption.filter';

@Module({
  imports: [UserModule, AuthModule, EventsModule, MessageModule, ChatModule, ChatMemberModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
    {
      provide: APP_FILTER,
      useClass: DatabaseExceptionFilter
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter
    }],
})
export class AppModule { }
