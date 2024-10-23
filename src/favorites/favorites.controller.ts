import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { CurrentUserDto } from 'src/auth/dto/current-user.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  create(@Body() createFavoriteDto: CreateFavoriteDto,@CurrentUser() user:CurrentUserDto) {
    return this.favoritesService.create(createFavoriteDto,user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentUser() user:CurrentUserDto) {
    return this.favoritesService.findAll(user.userId);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  remove(@CurrentUser() user:CurrentUserDto,@Body('product_id') product_id:string) {
    return this.favoritesService.remove(user.userId,+product_id);
  }
}
