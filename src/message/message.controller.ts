import { Body, Controller, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { UpdateMessage } from './dto/updateMessage.dto';
import { CreatedMessageType } from './message.types';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  @Post('edit')
  async editMessage(@Body() data: UpdateMessage, @Param('id') id: string): Promise<CreatedMessageType> {
    const message: CreatedMessageType = await this.messageService.update({ id: +id }, data)
    if (!message) {
      throw new NotFoundException()
    }
    return message
  }
  @Patch('delete')
  async deleteMessage(@Param('id') id: string) {
    return await this.messageService.delete({ id: +id })
  }
}
