import { Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Songs } from './entities/songs.entity';
import { UserPlaylist } from './entities/userPlaylist.entity';
import { UserPlayListSongs } from './entities/userPlayListSongs.entity';
import { Like } from 'typeorm';
import { PlayListSongDto } from '../auth/dto/PlayListSong.dto';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const user = User.create(createUserDto);
    await user.save();

    delete user.password;
    return user;
  }

  async showById(id: number): Promise<User> {
    const user = await this.findById(id);

    delete user.password;
    return user;
  }

  async findById(id: number) {
    return await User.findOne(id);
  }

  async findByEmail(email: string) {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }

  async listAllSongs() {
    return await Songs.find();
  }

  async createPlayList(userId: number, playListName: string) {
    return await UserPlaylist.create({
      userId: userId,
      playListName: playListName,
    }).save();
  }

  async searchSong(songName: string) {
    return await Songs.find({ songName: Like(`%${songName}%`) });
  }

  async addSongInPlayList(payload: PlayListSongDto, userId: number) {
    return await UserPlayListSongs.create({
      userId: userId,
      ...payload,
    }).save();
  }

  async listPlayListSong(playListId: number, userId: number) {
    return await UserPlayListSongs.query(
      `SELECT p.*, s.songName FROM user_play_list_songs p JOIN songs s ON p.songsId = s.id WHERE p.playListId = ? AND p.userId = ?;`,
      [playListId, userId],
    );
  }

  async shufflePlayListSongs(playListId: number, userId: number) {
    return await UserPlayListSongs.query(
      `SELECT p.*, s.songName FROM user_play_list_songs p JOIN songs s ON p.songsId = s.id WHERE p.playListId = ? AND p.userId = ?  ORDER BY RAND()`,
      [playListId, userId],
    );
  }
}
