import { Injectable, NotFoundException, HttpStatus, HttpException } from '@nestjs/common';

import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {
  }

  async signUp(email: string, login: string, password: string, confirmPassword: string) {
    const checkUser = await this.userService.findOne({ email })
    if (checkUser) {
      throw new HttpException('email exists', HttpStatus.BAD_REQUEST);
    }
    if (password !== confirmPassword) {
      throw new HttpException('Passport not confirm', HttpStatus.BAD_REQUEST);
    }
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    const createUser = {
      email,
      login,
      password: hashedPassword
    }
    console.log(createUser)
    return await this.userService.create(createUser)
  }


  async signIn(login: string, password: string) {

    const foundUser = await this.userService.findOne({ login })
    if (!foundUser) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST)
    }
    const compare = await bcrypt.compare(password, foundUser.password)
    if (!compare) {
      throw new HttpException('password is wrong', HttpStatus.UNAUTHORIZED)
    }
    const payload = {
      sub: foundUser.id,
      login: foundUser.login
    }
    return {
      accessToken: await this.jwtService.signAsync(payload)
    }

  }


}
