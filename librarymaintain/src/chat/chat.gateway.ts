import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Req, UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(
  { cors: true }
)
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('createChat')
  async create(@MessageBody() createChatDto: CreateChatDto) {
    console.log('createChatDto', createChatDto);
    const message = await this.chatService.create(createChatDto);
    this.server.sockets.emit('message', message);
    return message;
  }

  @SubscribeMessage('FindAllchat')
  async findAllchat() {
    return this.chatService.findAll();
  }

  @SubscribeMessage('findOneChat')
  async findOne(@MessageBody() id: number, @Req() req) {
    console.log('id');
    return this.chatService.findOne(req.user);
  }

  @SubscribeMessage('userTyping')
  async handleUserTyping(
    @MessageBody() typingData: { sender: string; isTyping: boolean },
    @ConnectedSocket() client: Socket,
  ) {
    const { sender, isTyping } = typingData;
    client.broadcast.emit('userTyping', { sender, isTyping });
  }

  handleConnection(client: Socket) {
    console.log(client.id, 'Client connected');
    client.emit('connected', 'Welcome to the chat!');
    this.server.emit('connected', 'A new client has joined the chat.');
  }

  // handleDisconnect(client: Socket) {
  //   console.log(client.id, 'Client disconnected');
  // }
}
