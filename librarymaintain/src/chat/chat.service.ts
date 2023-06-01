import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Messages, MessagesDocument } from 'src/_schema/message.schema';
import { Model } from 'mongoose';
import { User } from 'src/_schema/user.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Messages.name) private messageModel: Model<MessagesDocument>,
  ) {}

  create(createChatDto: CreateChatDto) {
    const createdMessage = new this.messageModel(createChatDto);
    return createdMessage.save();
  }

  findAll(): Promise<Messages[]> {
    return this.messageModel.find().exec();
  }

  findOne(user: User) {
    console.log('user.id', user._id);
  }
}
