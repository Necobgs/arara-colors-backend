import { Injectable } from '@nestjs/common';
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