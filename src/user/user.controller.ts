import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('get')
  async find(@Param('email') email: string, @Param('login') login: string) {
    return await this.userService.findOne({
      email,
      login
    }
    )
  }
  @Post('create')
  async create(@Body() user: CreateUserDto) {
    const { email, login, password } = user
    return this.userService.create({
      email,
      login,
      password
    }
    )
  }
}
