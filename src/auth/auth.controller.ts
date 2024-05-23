import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiBody, ApiResponse, ApiTags, ApiCreatedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { userSignIn, userSignUp } from '../swagger.lib/auth.swagger';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  @ApiBody({
    schema: userSignUp
  })
  async signUp(@Body() user: SignUpDto) {
    const { email, login, password, confirmPassword } = user
    return await this.authService.signUp(email, login, password, confirmPassword)
  }

  @Post('signin')
  @ApiBody({
    schema: userSignIn
  })
  @ApiCreatedResponse({
    description: 'created'
  })
  async signIn(@Body() user: SignInDto) {
    const { login, password } = user
    return await this.authService.signIn(login, password)
  }

}
