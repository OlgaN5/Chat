import { Request, UseGuards } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'
import { WsAuthGuard } from "../auth/ws-auth/ws-auth.guard";
import { WsMiddleware } from "../auth/ws-auth/ws.md";
import { MessageService } from "../message/message.service";
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

    @SubscribeMessage('join')
    async joinRoomEvent(@MessageBody() data, @ConnectedSocket() socket: Socket) {
        console.log(data)
        console.log(data.chatId)
        // data = JSON.parse(data)
        console.log(data)
        console.log(data.chatId)
        const room = data.chatId.toString();
        socket.join(room);
        console.log(`Socket ${socket.id} joined room ${room}`);

        // Optional: Notify the room about the new user
        this.server.to(room).emit('message', { message: `User ${socket.id} has joined the room ${room}` });
    }

    @SubscribeMessage('leave')
    async leaveRoomEvent(@MessageBody() data, @ConnectedSocket() socket: Socket) {
        console.log(data)
        console.log(data.chatId)
        // data = JSON.parse(data)
        console.log(data)
        console.log(data.chatId)
        const room = data.chatId.toString();

        socket.leave(room);
        console.log(`Socket ${socket.id} left room ${room}`);

        // Optional: Notify the room about the new user
        this.server.to(room).emit('message', { message: `User ${socket.id} has left the room ${room}` });
    }

    @SubscribeMessage('message')
    async handleEvent(@MessageBody() data, @ConnectedSocket() socket: Socket) {
        const room = data.chatId.toString();
        const user: userReq = socket.data.user
        console.log(socket.rooms)
        if (!socket.rooms.has(room)) {
            console.warn(`Socket ${socket.id} is not in room ${room}, ignoring message.`);
            return;
        }
        // console.log(req)
        const message: CreatedMessageType = await this.messageService.create({
            userId: user.sub,
            text: data.text,
            chatId: data.chatId
        })
        this.server.to(room).emit('onMessage', message)
    }
}