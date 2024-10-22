import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(Cart)
    private readonly repository:Repository<Cart>
  ){}

  create(dto: CreateCartDto) {
    const cart = this.repository.create(dto)
    return this.repository.save(cart);
  }

  findOne(customer_id: number) {
    return this.repository.find({ where:{customer_id},
    relations:['cartItems'] });
  }

  async update(customer_id: number, dto: UpdateCartDto) {
    const cart = await this.repository.findOneBy({ customer_id })
    return this.repository.save(cart);
  }

  async remove(customer_id: number) {
    const cart = await this.repository.findOneBy({ customer_id })
    return this.repository.remove(cart);
  }
}
