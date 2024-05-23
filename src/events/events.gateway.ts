import { Request, UseGuards } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'
import { WsAuthGuard } from "../auth/ws-auth/ws-auth.guard";
import { WsMiddleware } from "../auth/ws-auth/ws.md";
import { MessageService } from "../message/message.service";
// import { MessageDto } from "src/message/dto/message.dto";
import { CreatedMessageType } from "../message/message.types";
type userReq = {
    sub: number,
    login: string,
    iat: number
}
type wsMessage = {
    text: string,
    chatId: number
}
@WebSocketGateway({
    cors: {
        origin: '*',
    }
})
@UseGuards(WsAuthGuard)
export class EventsGateway {
    constructor(private readonly messageService: MessageService) {

    }

    afterInit(client: Socket) {
        client.use(WsMiddleware() as any)
    }

    @WebSocketServer()
    server: Server;

    // @SubscribeMessage('join')
    // async joinRoomEvent(@MessageBody() data: wsMessage, @ConnectedSocket() socket: Socket) {
       
    //     const user: userReq = socket.data.user
    //     console.log(socket.data)
    //     // console.log('req')
    //     // console.log(req)
    //     const message: CreatedMessageType = await this.messageService.create({
    //         userId: user.sub,
    //         text: data.text,
    //         chatId: data.chatId
    //     })
    //     this.server.emit('onMessage', message)
    // }
    
    @SubscribeMessage('message')
    async handleEvent(@MessageBody() data: wsMessage, @ConnectedSocket() socket: Socket) {
       
        const user: userReq = socket.data.user
        console.log(socket.data)
        // console.log('req')
        // console.log(req)
        const message: CreatedMessageType = await this.messageService.create({
            userId: user.sub,
            text: data.text,
            chatId: data.chatId
        })
        this.server.emit('onMessage', message)
    }
}