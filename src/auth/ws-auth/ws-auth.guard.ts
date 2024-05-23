import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Socket } from 'socket.io';
import { verify } from 'jsonwebtoken'
import { jwtConstants } from '../auth.constants';
export class WsAuthGuard implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<boolean> {

    if (context.getType() !== 'ws') {
      console.log('11')
      return false
    }
    console.log('canActivate')
    const client: Socket = context.switchToWs().getClient<Socket>()
    const payload = WsAuthGuard.validateToken(client)
    console.log('payload')
    console.log(payload)
    client['user'] = payload
    return true
  }

  static validateToken(client: Socket) {
    console.log('validateToken')
    const { authorization } = client.handshake.headers
    console.log(authorization)
    const token = authorization.split(' ')[1]
    console.log(token)
    const payload = verify(token, jwtConstants.secret)
    console.log(payload)
    return payload
  }
}
