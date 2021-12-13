import { IsEmail, IsNotEmpty } from 'class-validator';

export class searchSongDto {


  @IsNotEmpty()
  songName: string;
}
