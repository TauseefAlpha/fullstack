import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import {User} from "./user.schema"


export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ default: false })
  deleted: boolean;
}

export const BookSchema = SchemaFactory.createForClass(Book);
