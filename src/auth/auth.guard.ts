import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    try {
      console.log('1')
      const request = context.switchToHttp().getRequest()
      console.log(request)
      const token = this.extractToken(request)
      console.log(token)
      if (!token) {
        throw new UnauthorizedException
      }
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      request['user'] = payload

      return true;
    } catch {
      throw new UnauthorizedException
    }
  }

  private extractToken(request: Request) {
    console.log(request.headers)
    console.log(request.headers.authorization)
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    console.log(type,token)
    return type === 'Bearer' ? token : undefined;
  }
}
