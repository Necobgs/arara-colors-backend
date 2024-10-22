import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from './entities/customers.entity';
import { Repository } from 'typeorm';
import { SelectCustomerDto } from './dto/select-customer.dto';

@Injectable()
export class CustomersService {

  constructor(
    @InjectRepository(Customers)
    private readonly repository:Repository<Customers>
  ){}

  findAll() {
    return this.repository.find();
  }

  findOne(dto:SelectCustomerDto) {
    if(!(dto.customer_id || dto.email)) return new HttpException('need customer_id or email',HttpStatus.BAD_REQUEST);
    if(dto.customer_id) return this.repository.findOneBy({ customer_id:dto.customer_id });
    if(dto.email) return this.repository.findOneBy({ email:dto.email });
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