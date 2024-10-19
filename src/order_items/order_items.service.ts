import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './entities/order_item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemsService {

  constructor(
    @InjectRepository(OrderItem)
    private readonly repository:Repository<OrderItem>
  ){}

  create(dto: CreateOrderItemDto) {
    const orderItem = this.repository.create(dto);
    return this.repository.save(orderItem);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(order_item_id: number) {
    return this.repository.findOneBy({ order_item_id });
  }

  async update(order_item_id: number, dto: UpdateOrderItemDto) {
    const orderItem = await this.repository.findOneBy({ order_item_id })
    this.repository.merge(orderItem,dto);
    return this.repository.save(orderItem);
  }

  async remove(order_item_id: number) {
    const orderItem = await this.repository.findOneBy({ order_item_id });
    return this.repository.remove(orderItem);
  }
}
