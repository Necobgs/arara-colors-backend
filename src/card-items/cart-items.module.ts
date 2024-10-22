import { Module } from '@nestjs/common';
import { CardItemsService } from './cart-items.service';
import { CardItemsController } from './cart-items.controller';
import { CartItem } from './entities/cart-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([CartItem])],
  controllers: [CardItemsController],
  providers: [CardItemsService],
})
export class CardItemsModule {}
