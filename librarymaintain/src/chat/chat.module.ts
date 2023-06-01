import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { MongooseModule} from '@nestjs/mongoose';
import { Messages, MessageSchema } from 'src/_schema/message.schema';
 import { PassportModule } from '@nestjs/passport';
 import {AuthModule} from "../auth/auth.module"

@Module({
  imports: [
 
    PassportModule,
    AuthModule,
    MongooseModule.forFeature([{ name: Messages.name, schema: MessageSchema }]),
  ],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
