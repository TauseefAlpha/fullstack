import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type MessagesDocument = HydratedDocument<Messages>;
@Schema()
export class Messages {
//   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
//   sender: User;
  
  @Prop({ required: true })
  sender: string;

  @Prop({ required: true })
  text: string;
}

export const MessageSchema = SchemaFactory.createForClass(Messages);
