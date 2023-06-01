import { Injectable } from '@nestjs/common';
import { BookDto } from './data/book.dto';
import { Book, BookDocument } from 'src/_schema/book.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/_schema/user.schema';

@Injectable()
export class BookServices {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}
  //add book
  async addBook(newbook: Book, user: User): Promise<Book> {
    const data = Object.assign(newbook, { user: user._id });

    console.log('user name', user.firstName, 'user Email', user.email);
    // console.log('user in create field', data);
    const book = new this.bookModel(data);
    await book.save();
    const populatedBook = await this.bookModel
      .findById(book._id)
      .populate({ path: 'user', select: '-password' })
      .exec();
    return populatedBook;
  }

  //getting all books
  async getAllBook(user: User): Promise<BookDto[]> {
   

    const booksToShow = await this.bookModel
      .find({ $or: [{ user: user._id, deleted: false }, { deleted: false }] })
      .populate({ path: 'user', select: '-password' })
      .exec();

      return booksToShow

  }

  // Update book
  async updateBook(id: string, updateBook: Book, user:User) {
    const userId = user._id;

    const bookupdate = await this.bookModel.findByIdAndUpdate(id, updateBook, {
      new: true,
    });

     const populatedupdatedBook = await this.bookModel
       .findById(bookupdate._id)
       .populate({ path: 'user', select: '-password' })
       .exec();
     return populatedupdatedBook;
  }


  //soft delete book
  async softDeleteBook(bookid: string, user: User) {
    const userdata = Object.assign({ user: user._id });
    if (!userdata) {
      return null;
    }
    const book = await this.bookModel.findById(bookid).exec();
    if (!book) {
      return null;
    }
    book.deleted = true;
    await book.save();

    const deletedbook = await this.bookModel
      .findById(book._id)
      .populate({
        path: 'user',
        select: '-password',
      })
      .exec();

    return deletedbook;
  }
}
