import { IsNotEmpty } from 'class-validator';
export class CreateChatDto {
  @IsNotEmpty({ message: 'you need to pass the name' })
  sender: string;

  @IsNotEmpty()
  text: string;
}
