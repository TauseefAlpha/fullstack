import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookServices } from './book.service';
import { BookDto } from './data/book.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('book')
export class BookController {
  constructor(private readonly bookservices: BookServices) {}

  //adding the book
  @UseGuards(AuthGuard())
  @Post('/add')
  addBook(@Body() book: BookDto, @Req() req) {
    console.log('book', book);
    return this.bookservices.addBook(book, req.user);
  }

  //getting all books
  @UseGuards(AuthGuard())
  @Get('findall')
  getAllBook(@Req() req): Promise<BookDto[]> {
    return this.bookservices.getAllBook(req.user);
  }

  //update book
  @UseGuards(AuthGuard())
  @Put(':id')
  updateBook(@Param('id') id: string, @Req() req, @Body() book: BookDto) {
    console.log('Updating book:', id, book);
    return this.bookservices.updateBook(id, book,req.user);
  }

  //soft deletes book
  @UseGuards(AuthGuard())
  @Post('softdelete/:bookid')
  async softDeleteBook(
    @Param('bookid') bookid: string,
    @Req() req,
  ) {
    return this.bookservices.softDeleteBook(bookid, req.user);
  }
}

// : Promise<Book | null>