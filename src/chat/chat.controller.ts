import { Body, Controller, Delete, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/createChat.dto';
// import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
// import { DatabaseAccess } from 'src/database.lib/database-access';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) { }

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Body() data: CreateChatDto, @Request() request) {
    console.log('fff')
    data.otherUsersId.push(request.user.sub)
    return await this.chatService.create(data.otherUsersId)
  }

  @Delete('delete')
  async delete(@Param('id') id: string) {
    return await this.chatService.delete({ id: +id })
  }
}
