import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from './entities/customers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {

  constructor(
    @InjectRepository(Customers)
    private readonly repository:Repository<Customers>
  ){}

  create(dto: CreateCustomerDto) {
    const customer = this.repository.create(dto);
    return this.repository.save(customer);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(customer_id: number) {
    return this.repository.findOneBy({ customer_id });
  }

  async update(customer_id: number, dto: UpdateCustomerDto) {
    const customer = await this.repository.findOneBy({ customer_id });
    this.repository.merge(customer,dto)
    return this.repository.save(customer);
  }

  async remove(customer_id: number) {
    const customer = await this.repository.findOneBy({ customer_id });
    return this.repository.remove(customer);
  }
}