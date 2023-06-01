import { IsNotEmpty } from 'class-validator';
import { User } from 'src/_schema/user.schema';

export class BookDto {
  @IsNotEmpty({message:"you can not pass id in body"})
  user: User;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: string;

  deleted: boolean;
}
