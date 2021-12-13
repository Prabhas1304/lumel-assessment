import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request as HttpRequest } from 'express';
import { AuthenticatedUser } from '../shared/decorators/authenticated-user.decorator';
import { PlayListSongDto } from './dto/PlayListSong.dto';
import { CreatePlayListDto } from "./dto/createPlayList.dto";
import { searchSongDto } from "./dto/searchSong.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    try {
      return this.authService.login(authLoginDto);
    } catch (e) {
      return { statusCode: 400, message: e };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async test(@AuthenticatedUser('userId') userId: string) {
    try {
      console.log(' userId', userId);
      return 'Success!' + userId;
    } catch (e) {
      return { statusCode: 400, message: e };
    }
  }

  @Get('/listAllSongs')
  @UseGuards(JwtAuthGuard)
  async listAllSongs() {
    try {
      return this.authService.listAllSongs();
    } catch (e) {
      return { statusCode: 400, message: e };
    }
  }

  @Post('/createPlayList')
  @UseGuards(JwtAuthGuard)
  async createPlayList(
    @AuthenticatedUser('userId') userId: number,
    @Body() playListName: CreatePlayListDto,
  ) {
    try {
      return this.authService.createPlayList(userId, playListName.playListName);
    } catch (e) {
      return { statusCode: 400, message: e };
    }
  }

  @Post('/searchSong')
  @UseGuards(JwtAuthGuard)
  async searchSong(
    @AuthenticatedUser('userId') userId: number,
    @Body() songName: searchSongDto,
  ) {
    try {
      return this.authService.searchSong(songName.songName);
    } catch (e) {
      return { statusCode: 400, message: e };
    }
  }

  @Post('/addSongInPlaylist')
  @UseGuards(JwtAuthGuard)
  async addSongInPlaylist(
    @AuthenticatedUser('userId') userId: number,
    @Body() payload: PlayListSongDto,
  ) {
    try {
      return this.authService.addSongInPlayList(payload, userId);
    } catch (e) {
      return { statusCode: 400, message: e };
    }
  }

  @Get('/listPlayListSongs')
  @UseGuards(JwtAuthGuard)
  async listPlayListSongs(
    @AuthenticatedUser('userId') userId: number,
    @Query('playListId') playListId: number,
  ) {
    try {
      return this.authService.listPlayListSong(playListId, userId);
    } catch (e) {
      return { statusCode: 400, message: e };
    }
  }

  @Get('/shufflePlayListSongs')
  @UseGuards(JwtAuthGuard)
  async shufflePlayListSongs(
    @AuthenticatedUser('userId') userId: number,
    @Query('playListId') playListId: number,
  ) {
    try {
      return this.authService.shufflePlayListSongs(playListId, userId);
    } catch (e) {
      return { statusCode: 400, message: e };
    }
  }
}
