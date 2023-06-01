import { Module } from '@nestjs/common';
import { BookServices } from './book.service';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from 'src/_schema/book.schema';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [
    PassportModule,
    AuthModule,
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])
    
  ],
  controllers: [BookController],
  providers: [BookServices],
})
export class BookModule {}
