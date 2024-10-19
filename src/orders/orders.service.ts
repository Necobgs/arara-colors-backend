import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order)
    private readonly repository:Repository<Order>
  ){}

  create(dto: CreateOrderDto) {
    const order = this.repository.create(dto);
    return this.repository.save(order);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(order_id: number) {
    return this.repository.findOneBy({ order_id });
  }

  async update(order_id: number, dto: UpdateOrderDto) {
    const order = await this.repository.findOneBy({ order_id });
    this.repository.merge(order,dto);
    return this.repository.save(order);
  }

  async remove(order_id: number) {
    const order = await this.repository.findOneBy({ order_id });
    return this.repository.remove(order);
  }
}