import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ChatMemberService } from './chat-member.service';
import { ChatMemberDto } from './chat-member.dto';

@Controller('chat-member')
export class ChatMemberController {
  constructor(private readonly chatMemberService: ChatMemberService) { }

  @Patch('edit')
  async edit(@Param('id') id: string, @Body() data: ChatMemberDto) {
    return await this.chatMemberService.edit({ id: +id }, { name: data.name })
  }
}
