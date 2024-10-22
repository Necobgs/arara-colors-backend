import { Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCardItemDto } from './dto/update-cart-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CardItemsService {

  constructor(
    @InjectRepository(CartItem)
    private readonly repository:Repository<CartItem>
  ){}

  create(dto: CreateCartItemDto) {
    const cartItem = this.repository.create(dto)
    return this.repository.save(cartItem);
  }

  async update(product_id: number, dto: UpdateCardItemDto) {
    const cartItem = await this.repository.findOneBy({ product_id })
    this.repository.merge(cartItem,dto)
    return this.repository.save(cartItem);
  }

  async remove(product_id: number) {
    const cartItem = await this.repository.findOneBy({ product_id })
    return this.repository.remove(cartItem);
  }
}
