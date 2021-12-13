import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Songs } from '../users/entities/songs.entity';
import { PlayListSongDto } from "./dto/PlayListSong.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto);

    const payload = {
      userId: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
    const { email, password } = authLoginDto;

    const user = await this.usersService.findByEmail(email);
    if (!(await user?.validatePassword(password))) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async listAllSongs() {
    return await this.usersService.listAllSongs();
  }

  async createPlayList(userId: number, playListName: string) {
    return await this.usersService.createPlayList(userId, playListName);
  }

  async searchSong(songName: string) {
    return await this.usersService.searchSong(songName);
  }

  async addSongInPlayList(payload: PlayListSongDto, userId: number) {
    return await this.usersService.addSongInPlayList(payload, userId);
  }

  async listPlayListSong(playListId: number, userId: number) {
    return await this.usersService.listPlayListSong(playListId, userId);
  }

  async shufflePlayListSongs(playListId: number, userId: number) {
    return await this.usersService.shufflePlayListSongs(playListId, userId);
  }
}
