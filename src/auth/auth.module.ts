import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { jwtConstants } from './auth.constants';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma.service';
import { ValidationPipe } from '../validation/validation.pipe';

@Module({
  imports: [UserModule, JwtModule.register({
    global: true,
    secret: jwtConstants.secret
  })],
  controllers: [AuthController],
  providers: [AuthService,UserService,PrismaService,ValidationPipe],
})
export class AuthModule { }
