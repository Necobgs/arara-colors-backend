import { Injectable } from '@nestjs/common';
import { CreateOrderStatusDto } from './dto/create-order_status.dto';
import { UpdateOrderStatusDto } from './dto/update-order_status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatus } from './entities/order_status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderStatusService {

  constructor(
    @InjectRepository(OrderStatus)
    private readonly repository:Repository<OrderStatus>
  ){}

  create(dto: CreateOrderStatusDto) {
    const orderStatus = this.repository.create(dto);
    return this.repository.save(orderStatus);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(status_id: number) {
    return this.repository.findOneBy({ status_id });
  }

  async update(status_id: number, dto: UpdateOrderStatusDto) {
    const orderStatus = await this.repository.findOneBy({ status_id });
    this.repository.merge(orderStatus,dto)
    return this.repository.save(orderStatus);
  }

  async remove(status_id: number) {
    const orderStatus = await this.repository.findOneBy({ status_id });
    return this.repository.remove(orderStatus);
  }
}
