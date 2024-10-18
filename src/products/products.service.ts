import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>
  ){}

  create(dto: CreateProductDto) {
    const product = this.repository.create(dto);
    return this.repository.save(product);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(product_id: number) {
    return this.repository.findOneBy({ product_id });
  }

  async update(product_id: number, dto: UpdateProductDto) {
    const product = await this.repository.findOneBy({ product_id });
    this.repository.merge(product,dto);
    return this.repository.save(product);
  }

  async remove(product_id: number) {
    const product = await this.repository.findOneBy({ product_id });
    return this.repository.remove(product);
  }
}
