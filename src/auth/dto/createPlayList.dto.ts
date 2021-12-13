import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePlayListDto {


  @IsNotEmpty()
  playListName: string;
}
