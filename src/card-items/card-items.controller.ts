import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CardItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCardItemDto } from './dto/update-cart-item.dto';

@Controller('card-items')
export class CardItemsController {
  constructor(private readonly cardItemsService: CardItemsService) {}

  @Post()
  create(@Body() createCardItemDto: CreateCartItemDto) {
    return this.cardItemsService.create(createCardItemDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardItemDto: UpdateCardItemDto) {
    return this.cardItemsService.update(+id, updateCardItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardItemsService.remove(+id);
  }
}
