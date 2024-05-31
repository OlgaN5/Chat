import { Socket } from "socket.io"
import { WsAuthGuard } from "./ws-auth.guard"

export type SocketMiddlewareType = {
    (client: Socket, next: (err?: Error) => void)
}

export const WsMiddleware = (): SocketMiddlewareType => {
    return (client, next) => {
        try {
            console.log('WsMiddleware')
            // console.log(client)
            WsAuthGuard.validateToken(client)
            next()
        } catch (e) {
            next(e)
        }
    }
}