import { IsEmail, IsNotEmpty } from 'class-validator';

export class PlayListSongDto {
  @IsNotEmpty()
  playListId: number;

  @IsNotEmpty()
  songsId: number;
}
