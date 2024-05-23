import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway'
import { MessageService } from '../message/message.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [EventsGateway,MessageService,PrismaService],
})
export class EventsModule { }
